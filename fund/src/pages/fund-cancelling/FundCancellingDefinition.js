import React, { useEffect, useState, useMemo } from 'react';
import {
    useFiProxy,
    useTranslation,
    useTransactionContext,
    useSnackbar,
} from 'component/base';
import {
    BasePage,
    Card,
    Input,
    withFormPage,
    DataGrid,
    Button,
    Select,
    DatePicker,
    dataGridColumnTypes,
} from 'component/ui';
import {
    OrderStatus,
    apiUrls,
    moduleScopeKeys,
} from '../../constants';
const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'u53567119af',
    dialogSize: 'md'
};
const FundCancellingDefinition = (props) => {
    const filterRef = React.useRef();
    const { close, isBpm, uniqFundOrderId, ...rest } = props;
    const { translate } = useTranslation();
    const { transactionData } = useTransactionContext();
    const { executeGet, executePut } = useFiProxy();
    const { enqueueWarning } = useSnackbar();
    const [customerData, setCustomerData] = useState({});
    const [fundOrderList, setFundOrderList] = useState([]);
    const [currentFundList, setCurrentFundList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);


    const filledState = (dataContract) => {
        if (dataContract) {
            editFundOrder(dataContract);
        }
    };
    useEffect(() => {
        uniqFundOrderId && getFundOrder(uniqFundOrderId);
        if (!currentFundList || currentFundList.length == 0) {
            getCurrentFunds();
        }
    }, []);
    useEffect(() => {
        if (transactionData && transactionData.payload) {
            filledState(transactionData.payload);
        }
        else if (transactionData &&
            !transactionData.payload &&
            transactionData.actionArguments &&
            transactionData.actionArguments.Id > 0) {
            getFundOrder(transactionData.actionArguments.Id);
        }
    }, [transactionData]);
    const getCurrentFunds = (reset, data) => {
        if (reset) {
            setCurrentFundList([]);
        }
        let params = {
            accountNumber: customerData.AccountNumber,
        }
        if (customerData.AccountNumber !== undefined && customerData.AccountNumber !== null) {
            params.accountNumber = customerData.AccountNumber;
        }
        executeGet({ url: apiUrls.customerPortfolioByAccountNumber + "?=", params: params }).then((response) => {
            if (response.Success) {
                setCurrentFundList(response.Value);
            }
        });

    };
    const customerDataOnValueChanged = (field, value) => {
        setCustomerData({ ...customerData, [field]: value });
    };

    const getFundOrderList = (data, reset) => {
        if (reset) {
            setFundOrderList([]);
        }
        let filterDataParams = data ? data : filterRef.current.filter();
        let params = {
            ...filterDataParams,
            accountNumber: customerData.AccountNumber,
            fundDefinitionId: customerData.FundDefinitionId,
            processDate: customerData.ProcessDate,
            orderStatus: OrderStatus.find(x => x.Name == 'Pending for value date').Code,
        }
        if (customerData.FundDefinitionId) {
            params.fundDefinitionId = customerData.FundDefinitionId;
        }

        if (customerData.ProcessDate) {
            params.processDate = customerData.ProcessDate;
        }

        executeGet({
            url: apiUrls.fundOrderListByAccountNumber,
            params: params,
        }).then((response) => {
            console.log(response);
            if (response.Success) {
                setFundOrderList(response.Value);
                setDataLoaded(true);
            }
        });
    }

    const editFundOrderStatus = (selectedRowData) => {
        if (selectedRowData !== null && selectedRowData !== undefined) {
            const processDate = new Date(selectedRowData.ProcessDate);

            if (processDate.getHours() < 14) {
                const apiUrl = apiUrls.fundOrderCancellingApi + selectedRowData.Id;

                executePut({
                    url: apiUrl,
                }).then((response) => {
                    if (response.Success) {
                        if (customerData.AccountNumber) {
                            getFundOrderList(customerData.AccountNumber, customerData.FundDefinitionId, customerData.ProcessDate);
                        } else {
                            enqueueWarning(translate('Failed to cancel fund order'), { autoHideDuration: 3000 });
                        }
                    }
                });
            } else {
                enqueueWarning(translate('Process date should be earlier than 14:00 for fund order cancellation'), { autoHideDuration: 3000 });
            }
        } else {
            enqueueWarning(translate('Select a fund order'), { autoHideDuration: 3000 });
        }
    };

    const onActionClick = (action) => {
        if (action.commandName === 'Save') {

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
                name: 'OrderStatus',
                header: translate('Order status'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource: OrderStatus,
                    enumName: 'OrderStatus',
                    valuePath: 'Code',
                    labelPath: 'Name',
                },
                visible: true
            },
            {
                name: 'ValueDate',
                header: translate('Value date'),
                type: dataGridColumnTypes.date,
                visible: true
            },
            {
                name: 'ProcessDate',
                header: translate('Process date'),
                type: dataGridColumnTypes.date,
                visible: true
            },
            {
                name: 'OrderDescription',
                header: translate('Order description'),
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
            >
                {(
                    <Input
                        xs={4}
                        name="AccountNumber"
                        required
                        inputProps={{ maxLength: 10 }}
                        label={translate('Account number')}
                        onChange={(value) => customerDataOnValueChanged('AccountNumber', value)}
                        onBlur={(a, value) => getCurrentFunds(value)}
                        value={customerData?.AccountNumber}
                    />)}
                <Select
                    name="FundDefinitionId"
                    xs={3}
                    required
                    label={translate('Fund code')}
                    datasource={currentFundList}
                    onChange={(value) => {
                        customerDataOnValueChanged('FundDefinitionId', value);
                    }}
                    columns={['FundCode']}
                    valuePath={'FundDefinitionId'}
                    value={customerData.FundDefinitionId}
                />
                <DatePicker
                    name="ProcessDate"
                    xs={3}
                    label={translate('Process date')}
                    views={['year', 'month', 'day']}
                    value={customerData?.ProcessDate}
                    onChange={(value) => {
                        if (value != undefined && !isNaN(value)) {
                            customerDataOnValueChanged('ProcessDate', value);
                        }
                    }}
                    required
                />
                <Button
                    name="FundOrders"
                    xs={2}
                    variant="outlined"
                    startIcon={translate('Fund orders list')}
                    onClick={() => {
                        if (customerData.AccountNumber) {
                            getFundOrderList(customerData.AccountNumber, customerData.FundDefinitionId, customerData.ProcessDate);
                        } else {
                            enqueueWarning(translate('Account number is required'), { autoHideDuration: 3000 });
                        }
                    }}
                ></Button>

            </Card>
            <Card
                name="Fund orders list card"
                title={'Fund orders list'}
                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
                xs={20}
            >
                <DataGrid
                    name="CurrentOrderList"
                    dataSource={fundOrderList}
                    columns={columns}
                    onRowClick={(selectedRow) => customerDataOnValueChanged('selectedRowData', selectedRow.data)}
                />
            </Card>

            {dataLoaded && (
                <Button
                    name="OrderStatus"
                    xs={3}
                    variant="outlined"
                    startIcon={translate('Fund order cancellation')}
                    onClick={() => editFundOrderStatus(customerData?.selectedRowData)}
                >
                </Button>
            )}
        </BasePage >
    )
};

export default withFormPage(FundCancellingDefinition, { uiMetadata });
