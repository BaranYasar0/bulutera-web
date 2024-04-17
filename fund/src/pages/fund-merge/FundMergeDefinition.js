import React, { useEffect, useState, useCallback, useMemo } from 'react';

import {
    useFiProxy,
    useTranslation,
    useSnackbar,
    dateUtils,
}
    from 'component/base';
import {
    BasePage,
    Card,
    Input,
    withFormPage,
    DataGrid,
    Select,
    DatePicker

} from 'component/ui';

import {
    apiUrls,
    moduleScopeKeys,
} from '../../constants';


/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'u982f302611',
    dialogSize: 'md'
};


const FundMergeDefinition = (props) => {
    const { close, isBpm, fundMergeId, ...rest } = props;

    const { translate } = useTranslation();
    const { executeGet, executePost, executePut } = useFiProxy();
    const { enqueueWarning } = useSnackbar();
    const [customerData, setCustomerData] = useState({});
    const [constantFundList, setConstantFundList] = useState([]);
    const [mergedFundList, setMergedFundList] = useState([]);
    const [currentFundList, setcurrentFundList] = useState([]);

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
    const customerDataOnValueChanged = (field, value) => {
        if(field === 'FundDefinitionId' && customerData.FundDefinitionIdToMerge === value){
            return enqueueWarning(translate('You cant merge same funds'), { autoHideDuration: 3000 });
        }
        else if(field === 'FundDefinitionIdToMerge' && customerData.FundDefinitionId === value){
            return enqueueWarning(translate('You cant merge same funds'), { autoHideDuration: 3000 });
        }
        if(field === 'FundDefinitionId' && value){
            var matchedFund = currentFundList.find(x => x.Id === value);
            matchedFund ={...matchedFund,UnitPrice : matchedFund.SecurityPrices[0].UnitPrice};
            matchedFund = { ...matchedFund, Nominal: matchedFund.SecurityPrices[0].CurrentShare };
            setConstantFundList([matchedFund]);
        }
        else if(field === 'FundDefinitionIdToMerge' && value){
            var matchedFund = currentFundList.find(x => x.Id === value);
            matchedFund ={...matchedFund,UnitPrice : matchedFund.SecurityPrices[0].UnitPrice};
            matchedFund = { ...matchedFund, Nominal: matchedFund.SecurityPrices[0].CurrentShare };
            setMergedFundList([matchedFund]);
        }
        setCustomerData({ ...customerData, [field]: value });
    };

    const onActionClick = (action) => {
        if (action.commandName === 'Save') {
            
            if (fundMergeId > 0) {
                const apiUrl = apiUrls.fundMergeApi+'/'+fundMergeId;
                executePut({
                    url: apiUrl,
                    data: {
                        ...customerData,
                    }
                }).then((response) => {
                    if (response.Success) {
                        close();
                    }
                })
            }
            else {
                executePost({
                    url: apiUrls.fundMergeApi,
                    data: {
                        ...customerData,
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
            >
                <Select
                    name="FundDefinitionId"
                    xs={5}
                    required
                    label={translate('Constant fund')}
                    datasource={currentFundList}
                    onChange={(value) => customerDataOnValueChanged('FundDefinitionId', value)}
                    columns={['FundName']}
                    valuePath={'Id'}
                    value={customerData.FundDefinitionId}
                />
                <Select
                    name="FundDefinitionIdToMerge"
                    xs={5}
                    required
                    label={translate('Merged fund')}
                    datasource={currentFundList}
                    onChange={(value) => customerDataOnValueChanged('FundDefinitionIdToMerge', value)}
                    columns={['FundName']}
                    valuePath={'Id'}
                    value={customerData.FundDefinitionIdToMerge}
                />
                
                <Input
                    xs={2}
                    required
                    name="Amount"
                    type='decimal'
                    label={translate('Merge rate')}
                    onChange={(value) => customerDataOnValueChanged('Amount', value)}
                    value={customerData?.MergeRate}
                />
                <DatePicker
                    name="MergeDate"
                    xs={3}
                    label={translate('Merge date')}
                    views={['year', 'month', 'day']}
                    value={customerData?.MergeDate}
                    onChange={(value) => customerDataOnValueChanged('MergeDate', dateUtils.stringWithFormat(value, 'yyyy-MM-DD'))}
                    required
                />
            </Card>

            <Card
                name="Constant fund card"
                title={translate('Constant fund')}

                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
                xs={7}
            >
                <DataGrid
                    name="CurrentFundList"
                    dataSource={constantFundList}
                    columns={columns}
                />
                
            </Card>
            
            <Card
                name="Merged fund Card"
                title={translate('Merged fund')}

                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
                xs={7}
            >
                <DataGrid
                    name="CurrentFundList"
                    dataSource={mergedFundList}
                    columns={columns}
                />
            </Card>


        </BasePage >
    )
};

export default withFormPage(FundMergeDefinition, { uiMetadata });
