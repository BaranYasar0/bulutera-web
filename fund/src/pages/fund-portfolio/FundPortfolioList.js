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
} from 'component/ui';

import {
    apiUrls,
    moduleScopeKeys,
} from '../../constants';

const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'ubf3f063b7e',
    dialogSize: 'md'
};

const FundPortfolioList = (props) => {
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
            FundAccountNumber : customerData.FundAccountNumber
        }
        executeGet({ url: apiUrls.fundPortfolioListApi, params, setStateDelegate: setDataSource })
    }
     
    const columns = useMemo(
        () => [
            {
                name: 'Id',
                header: 'Id',
                visible: false
            },
            {
                name: 'FundAccountNumber',
                header: translate('Fund account number'),
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
            {
                name: 'UnitPrice',
                header: translate('Unit price'),
                defaultFlex: 1,
            },
            {
                name: 'CustomerAccountNumber',
                header: translate('Customer account number'),
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
                name="Fund portfolio Card"
                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
            >
                <Input
                        xs={4}
                        name="FundAccountNumber"
                        required
                        inputProps={{ maxLength: 15 }}
                        label={translate('Fund account number')}
                        onChange={(value) => customerDataOnValueChanged("FundAccountNumber", value)}
                        onBlur ={(event,value) => getDataSource(filter)}
                        value={customerData?.FundAccountNumber}
                    />
                <DataGrid
                    name="Fund portfolio Grid"
                    dataSource={dataSource}
                    columns={columns}
                />
            </Card>
        </BasePage>
    );
};
FundPortfolioList.displayName = 'Fund portfolio List';

export default withFormPage(FundPortfolioList, { uiMetadata });
