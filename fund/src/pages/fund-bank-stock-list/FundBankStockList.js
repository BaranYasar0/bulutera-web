import React, { useMemo, useState } from 'react';

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
    Input,
    dataGridColumnTypes
} from 'component/ui';

import {
    CurrencyCodes,
    apiUrls,
    moduleScopeKeys,
} from '../../constants';

const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'ud3a49d4e84',
    dialogSize: 'md'
};

const FundBankStockList = (props) => {
    const filterRef = React.useRef();
    const { translate } = useTranslation();
    const { executeGet } = useFiProxy();
    const [customerData,setCustomerData] = useState({});
    const [dataSource, setDataSource] = useState([]);
    const [filter] = useState({
        Active: true,
    });

    const getDataSource = (data, reset) => {
        if (reset) {
            setDataSource([]);
        }
        let filterDataParams = data ? data : filterRef.current.filter();
        let params = {
            ...filterDataParams,
            WorkGroupId : customerData.WorkGroupId
        }
        executeGet({ url: apiUrls.fundSecurityListByWorkGroup, params, setStateDelegate: setDataSource })
    }
     
    const columns = useMemo(
        () => [
            {
                name: 'Id',
                header: 'Id',
                visible: false
            },
            {
                name: 'FundCode',
                header: translate('Fund code'),
                defaultFlex: 1,
            },
            {
                name: 'FundName',
                header: translate('Fund name'),
                defaultFlex: 1,
            },
            {
                name: 'CurrencyCode',
                header: translate('Currency code'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource:CurrencyCodes ,
                    enumName: 'CurrencyCodes',
                    valuePath: 'Code',
                    labelPath: 'Name',
                },
              },
              {
                name: 'Nominal',
                header: translate('Nominal'),
                defaultFlex: 1,
              },
              {
                name: 'Amount',
                header: translate('Amount'),
                defaultFlex: 1,
            },
            {
                name: 'BlockedNominal',
                header: translate('Blocked nominal'),
                defaultFlex: 1,
            },
            {
                name: 'CustomerCount',
                header: translate('Total customer count'),
                defaultFlex: 1,
            },
        ],
        []
    );
    
    const customerDataOnValueChanged = (field, value) => {
        setCustomerData({ ...customerData, [field]: value });
    };
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
                name="Fund bank stock Card"
                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
            >
                <Input
                        xs={4}
                        name="WorkGroupId"
                        required
                        inputProps={{ maxLength: 15 }}
                        label={translate('Branch code')}
                        onChange={(value) => customerDataOnValueChanged("WorkGroupId", value)}
                        onBlur ={(event,value) => getDataSource(filter)}
                        value={customerData?.FundAccountNumber}
                    />
                <DataGrid
                    name="Fund bank stock Grid"
                    dataSource={dataSource}
                    columns={columns}
                />
            </Card>
        </BasePage>
    );
};
FundBankStockList.displayName = 'Fund bank stock List';

export default withFormPage(FundBankStockList, { uiMetadata });
