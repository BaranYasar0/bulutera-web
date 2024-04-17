import React, { useEffect, useMemo, useState, useCallback } from 'react';

import {
    useFiProxy,
    useTranslation,
} from 'component/base';
import {
    BasePage,
    Filter,
    Card,
    DataGrid,
    withFormPage,
    dataGridColumnTypes,
    Select
} from 'component/ui';

import {
    apiUrls,
    CurrencyCodes,
    moduleScopeKeys,
} from '../../constants';

const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'u9d48efe554',
    dialogSize: 'md'
};

const FundPendingOrderList = (props) => {
    const filterRef = React.useRef();
    const [currentFundList, setcurrentFundList] = useState([]);
    const { translate } = useTranslation();
    const { executeGet } = useFiProxy();
    const [customerData, setCustomerData] = useState({});
    const [dataSource, setDataSource] = useState([]);
    const [filter] = useState({
        Active: true,
    });

    useEffect(() => {
        if (!currentFundList || currentFundList.length == 0) {
            getCurrentFunds();
        }
    }, []);
    const getCurrentFunds = () => {
        executeGet({ url: apiUrls.fundAndPriceListApi }).then((response) => {
            if (response.Success) {
                setcurrentFundList(response.Value);
            }
        });
    };
    const getDataSource = (data, reset) => {
        if (reset) {
            setDataSource([]);
        }
        let filterDataParams = data ? data : filterRef.current.filter();
        let params = {
            ...filterDataParams,
            fundDefinitionId:customerData.FundDefinitionId,
            orderStatus:'PendingForValueDate',
        }
        executeGet({ url: apiUrls.fundOrderListByParameters, params, setStateDelegate: setDataSource })
    }
    
    const customerDataOnValueChanged = (field, value) => {
        setCustomerData({ ...customerData, [field]: value });
    };
    
    const columns = useMemo(
        () => [
            {
                name: 'Id',
                header: 'Id',
                visible: false
            },
            {
                name: 'CurrencyCode',
                header: translate('Currency code'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource: CurrencyCodes,
                    enumName: 'CountryCodes',
                    valuePath: 'Code',
                    labelPath: 'Name',
                },
            },
            {
                name: 'ValueDate',
                header: translate('Value date'),
                type: dataGridColumnTypes.date,
                defaultFlex: 1,
            },
            {
                name: 'ProcessDate',
                header: translate('Process date'),
                type: dataGridColumnTypes.date,
                defaultFlex: 1,
            },
            {
                name: 'Amount',
                header: translate('Amount'),
                defaultFlex: 1,
            },
            {
                name: 'Nominal',
                header: translate('Nominal'),
                defaultFlex: 1,
            },

        ],
        []
    );

    return (
        <BasePage
            {...props}
        >
            <Filter
                ref={filterRef}
                onFilter={(data) => {
                    getDataSource(data);
                }}
                onFilterReset={(data, reset) =>
                    getDataSource(data, true)
                }
            >
            </Filter>
            <Card
                name="Issuer Card"
                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
            >
                <Select
                    name="FundDefinitionId"
                    xs={3}
                    required
                    label={translate('Fund code')}
                    datasource={currentFundList}
                    onChange={(value) => customerDataOnValueChanged('FundDefinitionId', value)}
                    onBlur = {(event,value) => getDataSource(filter)}
                    columns={['FundCode']}
                    valuePath={'Id'}
                    value={customerData.FundDefinitionId}
                />
                <DataGrid
                    name="Issuer Grid"
                    dataSource={dataSource}
                    columns={columns}
                />
            </Card>
        </BasePage>
    );
};
FundPendingOrderList.displayName = 'Fund pending order List';

export default withFormPage(FundPendingOrderList, { uiMetadata });
