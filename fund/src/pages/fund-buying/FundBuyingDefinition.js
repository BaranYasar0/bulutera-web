import React, { useEffect, useState, useMemo } from 'react';

import {
    useFiProxy,
    useTranslation,
    useTransactionContext,
    stringFormat,
    useSnackbar,
    useFormManagerContext,
    generateUUID,
}
    from 'component/base';
import {
    BasePage,
    Card,
    Input,
    SelectEnum,
    withFormPage,
    DataGrid,
    Button,
    Select,
} from 'component/ui';

import AccountComponent from 'deposit/AccountComponent';
import CustomerComponent from 'customer/CustomerComponent';
import {
    apiUrls,
    moduleScopeKeys,
} from '../../constants';


/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'ube44b9e2c8',
    dialogSize: 'md'
};


const FundBuyingDefinition = (props) => {
    const { close, isBpm, uniqFundOrderId, ...rest } = props;

    const { translate } = useTranslation();
    const { transactionData } = useTransactionContext();
    const { executeGet, executePost, executePut } = useFiProxy();
    const { enqueueWarning } = useSnackbar();
    const { enqueueSnackbar } = useSnackbar();
    const [customerData, setCustomerData] = useState({});
    const [fundList, setfundList] = useState([]);
    const [currentFundList, setcurrentFundList] = useState([]);
    const [fundOrderId, editFundOrder] = useState({});
    const { showDialog } = useFormManagerContext();
    const [selectedCustomer, setSelectedCustomer] = useState();
    const [selectedAccount, setSelectedAccount] = useState();
    const { showDocumentsDialog } = useFormManagerContext();

    useEffect(() => {
        uniqFundOrderId && getFundOrder(uniqFundOrderId);
        if (!currentFundList || currentFundList.length == 0) {
            getCurrentFunds();
        }
    }, []);

    useEffect(() => {
        if (transactionData && transactionData.payload) {
            filledState(transactionData.payload);
            setCustomerData(transactionData.payload);
        }
        else if (transactionData &&
            !transactionData.payload &&
            transactionData.actionArguments &&
            transactionData.actionArguments.Id > 0) {
            getFundOrder(transactionData.actionArguments.Id);
        }
    }, [transactionData]);

    const filledState = (dataContract) => {
        if (dataContract) {
            editFundOrder(dataContract);
        }
    }
    const getCurrentFunds = () => {
        executeGet({ url: apiUrls.fundAndPriceListApi }).then((response) => {
            if (response.Success) {
                setcurrentFundList(response.Value);
            }
        });
    };
    const customerDataOnValueChanged = (field, value) => {
        setCustomerData({ ...customerData, [field]: value });
    };
    const getFundOrder = (uniqFundOrderId) => {
        const apiUrl = stringFormat(apiUrls.fundOrderGetById, uniqFundOrderId);
        executeGet(
            {
                url: apiUrl,
            }
        ).then((response) => {
            if (response.Success) {
                filledState(response.Value);
            }
        })
    }

    const fundOrderIdOnValueChanged = (field, value) => {
        if (field === 'Nominal' && value != "") {
            var unitPrice = parseFloat(fundList[0].SecurityPrices[0].UnitPrice)
            var tempAmount = parseFloat(value) * unitPrice;
            editFundOrder({ ...fundOrderId, Amount: tempAmount, Nominal: value });
        }
        else if (field === 'Amount' && value != "") {
            var tempNominal = (parseFloat(value) / parseFloat(fundList[0].SecurityPrices[0].UnitPrice));
            var calculatedNominal = tempNominal - Math.trunc(tempNominal);
            if (calculatedNominal > 0) {
                enqueueSnackbar(translate('Amount is calculated for nominal'));
            }
            var amount = parseFloat(value) - (calculatedNominal * parseFloat(fundList[0].SecurityPrices[0].UnitPrice))
            editFundOrder({ ...fundOrderId, Amount: amount, Nominal: Math.trunc(tempNominal) });
        }
        else if (value === undefined || value === null || value == "") {
            editFundOrder({ ...fundOrderId, Amount: 0, Nominal: 0 });
        }
        else {
            editFundOrder({ ...fundOrderId, [field]: value });
        }
    }
    const fundPricesCard = () => {

        executeGet(
            {
                url: apiUrls.fundAndPriceListApi,
            }
        ).then((response) => {
            if (response.Success) {
                var matchedFund = response.Value.find(x => x.Id === customerData.FundDefinitionId);
                matchedFund = { ...matchedFund, UnitPrice: matchedFund.SecurityPrices[0].UnitPrice };
                matchedFund = { ...matchedFund, Nominal: matchedFund.SecurityPrices[0].CurrentShare };
                setfundList([matchedFund]);
            }
        })
    }
    const onActionClick = (action) => {
        if (action.commandName === 'Save') {
            var requestBody = {};
            if (fundOrderId.Nominal == null && fundOrderId.Amount == null) {
                return enqueueWarning(translate('Amount or nominal is required'), { autoHideDuration: 3000 });
            }
            requestBody = { ...customerData, ...fundOrderId, OrderType: 'Buying' };
            if (uniqFundOrderId > 0) {
                const apiUrl = stringFormat(apiUrls.fundBuyingCreateApi, uniqFundOrderId);
                executePut({
                    url: apiUrl,
                    data: {
                        ...fundOrderId,
                    }
                }).then((response) => {
                    if (response.Success) {
                        close();
                    }
                })
            }
            else {
                executePost({
                    url: apiUrls.fundOrderCreateApi,
                    data: {
                        ...requestBody,
                    }
                }).then((response) => {
                    if (response.Success) {
                        close();
                    }
                })
            }
        }
        else if (action.commandName === 'Document') {
            const docViewerProps = {
                groupGuid: generateUUID(),
                processCode: 'CreateFundOrder',
                payload: customerData,
            };
            if (transactionData) {
                docViewerProps.transactionData = transactionData;
            }
            showDocumentsDialog({
                props: {
                    ...docViewerProps,
                }
            });

        }
        else if (action.commandName == 'Cancel') {
            close && close();
        }
    }
    const columns = useMemo(
        () => [
            {
                name: 'Id',
                header: 'Id',
                visible: false
            },
            {
                name: 'FundName',
                header: translate('Fund name'),
                visible: true
            },
            {
                name: 'FundCode',
                header: translate('Fund code'),
                visible: true
            },
            {
                name: 'UnitPrice',
                header: translate('Unit price'),
                visible: true
            },
            {
                name: 'Nominal',
                header: translate('Nominal'),
                visible: true
            },
        ]);

    const checkAgreementForProcess = (customerId) => {
        const dataModel = {
            CustomerId: customerId,
            IsReadOnly: true,
            ProcessCodes: ['CreateIndividualCustomer',
                'UpdateIndividualCustomer',
                'CreateCorporateCustomer',
                'UpdateCorporateCustomer']
        };
        executePost({
            url: apiUrls.checkProcessDocuments,
            data: {
                ...dataModel,
            }
        }).then((response) => {
            if (response.Success && response.Value) {
                const document = response.Value.find(doc => doc.DocumentType.Id === 6925)
                if (!document) {
                    enqueueWarning(translate('Aggreement is required'), { autoHideDuration: 3000 });
                }
            }
        })
    };

    return (
        <BasePage
            {...rest}
            onActionClick={onActionClick}
            actionList={!isBpm ?
                [
                    { name: 'Cancel', variant: 'text', scopeKey: moduleScopeKeys.Create_Fund },
                    { name: 'Document', variant: 'outlined', scopeKey: 'Public' },
                    { name: 'Save', scopeKey: moduleScopeKeys.Create_Fund }
                ] : []}
        >
            <Card
                scopeKey={moduleScopeKeys.Create_Fund}
            >
                <CustomerComponent
                    xs={3}
                    required
                    name="CustomerId"
                    label={translate('Customer')}
                    customerNumber={customerData?.CustomerId}
                    onSelectedCustomer={(customer) => {
                        setSelectedCustomer(customer);
                        checkAgreementForProcess(customer.CustomerId);
                    }}
                />
                <AccountComponent
                    required
                    name="AccountNumber"
                    xs={4}
                    informationMode={AccountComponent.informationModeType.info}
                    label={translate('Customer accounts')}
                    customerNumber={selectedCustomer?.CustomerId}
                    onChange={(selectedAccountNumber, selectedAccount) => {
                        setSelectedAccount(selectedAccount);
                        customerDataOnValueChanged('AccountNumber', selectedAccount?.AccountNumber);
                    }}
                    selectedAccountNumber={customerData?.AccountNumber}
                />
                <SelectEnum
                    xs={3}
                    enumName="ISOCurrencyCodes"
                    name="CurrencyCode"
                    required
                    label={translate('ISO currency codes')}
                    value={customerData?.CurrencyCode}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => customerDataOnValueChanged('CurrencyCode', value)}
                />
                <Select
                    name="FundDefinitionId"
                    xs={3}
                    required
                    label={translate('Fund code')}
                    datasource={currentFundList}
                    onChange={(value) => customerDataOnValueChanged('FundDefinitionId', value)}
                    columns={['FundCode']}
                    valuePath={'Id'}
                    value={customerData.FundDefinitionId}
                />
                <Button
                    name="DailyFundPrices"
                    xs={2}
                    variant="outlined"
                    startIcon={translate('Daily fund prices')}
                    onClick={() => {
                        if (customerData.FundDefinitionId) {
                            fundPricesCard();
                        }
                        else {
                            return enqueueWarning(translate('Fund code selection is required'), { autoHideDuration: 3000 });
                        }
                    }}
                ></Button>
            </Card>

            <Card
                name="Fund price Card"
                title={translate('Daily fund prices')}

                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
                xs={7}
            >
                <DataGrid
                    name="CurrentFundList"
                    dataSource={fundList}
                    columns={columns}
                />
            </Card>



            <Card
                scopeKey={moduleScopeKeys.Create_Fund}>

                <Input
                    xs={6}
                    name="Nominal"
                    type='long'
                    label={translate('Nominal')}
                    value={fundOrderId?.Nominal}
                    onChange={(value) => fundOrderIdOnValueChanged('Nominal', value)}
                />
                <Input
                    xs={6}
                    name="Amount"
                    type='decimal'
                    label={translate('Amount')}
                    onBlur={(e, value) => fundOrderIdOnValueChanged('Amount', value)}
                    value={fundOrderId?.Amount}
                />
                <Input
                    xs={6}
                    name="OrderDescription"
                    label={translate('Order description')}
                    value={fundOrderId?.OrderDescription}
                    onChange={(value) => fundOrderIdOnValueChanged('OrderDescription', value)}
                />
            </Card>

        </BasePage >
    )
};

export default withFormPage(FundBuyingDefinition, { uiMetadata });
