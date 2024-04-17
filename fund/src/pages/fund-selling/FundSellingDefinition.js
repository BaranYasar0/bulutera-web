import React, { useEffect, useState, useMemo } from 'react';

import {
    useFiProxy,
    useTranslation,
    useTransactionContext,
    stringFormat,
    useSnackbar,


}
    from 'component/base';
import {
    BasePage,
    Card,
    Input,
    withFormPage,
    DataGrid,
    Select,
    Button

} from 'component/ui';

import {
    apiUrls,
    moduleScopeKeys,
} from '../../constants';

import AccountComponent from 'deposit/AccountComponent';
import CustomerComponent from 'customer/CustomerComponent';

const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'ud13f6fa834',
    dialogSize: 'md'
};


const FundSellingDefinition = (props) => {
    const { close, isBpm, uniqFundOrderId, ...rest } = props;

    const { translate } = useTranslation();
    const { transactionData } = useTransactionContext();
    const { executeGet, executePost, executePut } = useFiProxy();
    const { enqueueWarning } = useSnackbar();
    const { enqueueSnackbar } = useSnackbar();
    const [customerData, setCustomerData] = useState({});
    const [currentFundList, setCurrentFundList] = useState([]);
    const [selectedCustomerOrder, setSelectedCustomerOrder] = useState([]);
    const [customerPortfolio, setCustomerPortfolio] = useState([]);
    const [fundOrderId, editFundOrder] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState();
    const [selectedAccount, setSelectedAccount] = useState();

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
                var matchedFund = response.Value.find(x => x.Id === customerData.FundDefinitionId);
                matchedFund = { ...matchedFund, UnitPrice: matchedFund.SecurityPrices[0].UnitPrice };
                matchedFund = { ...matchedFund, Nominal: matchedFund.SecurityPrices[0].CurrentShare };
                setCurrentFundList([matchedFund]);
            }
        });
    };
    const customerDataOnValueChanged = (field, value) => {
        setCustomerData({ ...customerData, [field]: value });
        if (field == 'FundDefinitionId' && value != "") {
            var matchedFund = customerPortfolio.find(x => x.FundDefinitionId === value);
            setSelectedCustomerOrder([matchedFund]);
        }
    };
    const getFundOrder = () => {
        const apiUrl = apiUrls.customerPortfolioByAccountNumber + `?accountNumber=${customerData.AccountNumber}`;
        executeGet(
            {
                url: apiUrl,
            }
        ).then((response) => {
            if (response.Success) {
                setCustomerPortfolio(response.Value);
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

    const onActionClick = (action) => {
        if (action.commandName === 'Save') {
            var RequestBody = {};
            RequestBody = { ...customerData, ...fundOrderId, OrderType: 'Selling', ChannelCode: 'EOD' };
            if ((fundOrderId.Nominal == null || fundOrderId.Nominal == "") && (fundOrderId.Amount == null || fundOrderId.Amount == "")) {
                return enqueueWarning(translate('Amount or nominal is required'), { autoHideDuration: 3000 });
            }
            if (uniqFundOrderId > 0) {
                const apiUrl = stringFormat(apiUrls.fundBuyingCreateApi, uniqFundOrderId);
                executePut({
                    url: apiUrl,
                    data: {
                        ...fundOrderId
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
                        ...RequestBody
                    }
                }).then((response) => {
                    if (response.Success) {
                        close();
                    }
                })
            }
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
                name: 'CurrentNominal',
                header: translate('Nominal'),
                visible: true
            },
            {
                name: 'CurrentAmount',
                header: translate('Current amount'),
                visible: true
            },
        ]);
    const FundPriceColumns = useMemo(
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
    return (
        <BasePage
            {...rest}
            onActionClick={onActionClick}
            actionList={!isBpm ?
                [
                    { name: 'Cancel', variant: 'text', scopeKey: moduleScopeKeys.Create_Fund },
                    { name: 'Save', scopeKey: moduleScopeKeys.Create_Fund }
                ] : []}
        >
            <Card
                scopeKey={moduleScopeKeys.Create_Fund}
                xs={10}
            >
                <CustomerComponent
                    xs={3}
                    required
                    name="CustomerId"
                    label={translate('Customer')}
                    customerNumber={customerData?.CustomerId}
                    onSelectedCustomer={(customer) => {
                        setSelectedCustomer(customer);
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
                <Button
                    xs={2}
                    variant="outlined"
                    startIcon={translate('Get customer portfolio')}
                    onClick={() => {
                        if (customerData.AccountNumber) {
                            getFundOrder();
                        }
                        else {
                            return enqueueWarning(translate('Account number is required'), { autoHideDuration: 3000 });
                        }
                    }}
                ></Button>
                <Select
                    xs={6}
                    name="FundDefinitionId"
                    required
                    label={translate('Fund code')}
                    datasource={customerPortfolio}
                    columns={['FundCode']}
                    valuePath={'FundDefinitionId'}
                    onChange={(value) => customerDataOnValueChanged('FundDefinitionId', value)}
                    value={customerData.FundDefinitionId}
                />

            </Card>

            <Card
                name="Fund price Card"
                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
                xs={7}
            >
                <Button
                    name="CurrentFundList"
                    xs={4}
                    variant="outlined"
                    startIcon={translate('Daily fund prices')}
                    onClick={() => {
                        getCurrentFunds();
                    }}
                ></Button>
                <DataGrid
                    name="CurrentFundList"
                    dataSource={currentFundList}
                    title={translate('Daily fund prices')}
                    columns={FundPriceColumns}
                />
            </Card>

            <Card
                name="Fund price Card"
                title={translate('Customer portfolio')}
                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
                xs={7}
            >
                <DataGrid
                    name="OrderList"
                    dataSource={selectedCustomerOrder}
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
                    label={translate('Current amount')}
                    value={fundOrderId?.Amount}
                    onBlur={(e, value) => fundOrderIdOnValueChanged('Amount', value)}
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

export default withFormPage(FundSellingDefinition, { uiMetadata });
