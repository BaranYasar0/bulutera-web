import React, { useEffect, useState } from 'react';

import {
    useFiProxy,
    useTranslation,
    useTransactionContext,
    stringFormat,
    dateUtils,
}
    from 'component/base';
import {
    BasePage,
    Card,
    Input,
    Checkbox,
    withFormPage,
    DatePicker,
    Select
} from 'component/ui';

import {
    apiUrls,
    moduleScopeKeys,
} from '../../constants';

const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'uc317b7e65b',
    dialogSize: 'md'
};


const SecurityPriceDefinition = (props) => {
    const { close, isBpm, uniqsecPriceInput, ...rest } = props;
    const { translate } = useTranslation();
    const { transactionData } = useTransactionContext();
    const { executeGet, executePost, executePut } = useFiProxy();
    const [fundList, editFundList] = useState([]);
    const [secPriceInput, editSecPriceInput] = useState({
    });

    useEffect(() => {
        if (fundList.length == 0) {
            getfundList();
        }
    }, [fundList]);

    useEffect(() => {
        if (transactionData && transactionData.payload) {
            filledState(transactionData.payload);
        }
        else if (transactionData &&
            !transactionData.payload &&
            transactionData.actionArguments &&
            transactionData.actionArguments.Id > 0) {
            getIssuer(transactionData.actionArguments.Id);
        }
    }, [transactionData]);

    const filledState = (dataContract) => {
        if (dataContract) {
            editSecPriceInput(dataContract);
        }
    }

    const getfundList = () => {
        executeGet({ url: apiUrls.fundAndPriceListApi }).then((response) => {
            if (response.Success) {
                editFundList(response.Value);
            }
        });

    }

    const secPriceInputOnValueChanged = (field, value) => {
        editSecPriceInput({ ...secPriceInput, [field]: value });
        if(field === 'FundDefinitionId' && value){
            getLastSecPrice(value);
        }
    }

    const getLastSecPrice = (value) => {
        var params = {FundDefinitionId : value}
        executeGet({ url: apiUrls.fundGetLastSecPrice,params,setStateDelegate : editSecPriceInput })
        editSecPriceInput({...secPriceInput,UnitPrice : null})
    }

    const onActionClick = (action) => {
        if (action.commandName === 'Save') {
            const apiUrl = stringFormat(apiUrls.issuerCreateApi, uniqsecPriceInput);
            var requestBody = {...secPriceInput,RecordStatus:'Active',PriceDate:dateUtils.stringWithFormat(Date(Date.now()),'yyyy-MM-DD')}
            if (uniqsecPriceInput > 0) {
                executePut({
                    url: apiUrl,
                    data: {
                        ...requestBody,
                    }
                }).then((response) => {
                    if (response.Success) {
                        close();
                    }
                })
            }
            else {
                executePost({
                    url: apiUrls.createSecPrice,
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
        else if (action.commandName == 'Cancel') {
            close && close();
        }
    }

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
                scopeKey={moduleScopeKeys.Create_Fund}>
                <Select
                    xs={6}
                    name="FundDefinitionId"
                    required
                    label={translate('Fund codes')}
                    datasource={fundList}
                    onChange={(value) => secPriceInputOnValueChanged('FundDefinitionId', value)}
                    columns={['FundName']}
                    valuePath={'Id'}
                    value={secPriceInput.FundDefinitionId}
                />
                <Input
                    xs={6}
                    name="UnitPrice"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Unit price')}
                    onChange={(value) => secPriceInputOnValueChanged('UnitPrice', value)}
                />
                <Checkbox
                    xs={6}
                    name="IsSellingPrice"
                    label={translate('Is selling price')}
                    value={secPriceInput.IsSellingPrice}
                    onChange={(value) => secPriceInputOnValueChanged('IsSellingPrice', value)}
                />
                <Input
                    xs={6}
                    name="InterestRate"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Interest rate')}
                    value={secPriceInput?.InterestRate}
                    onChange={(value) => secPriceInputOnValueChanged('InterestRate', value)}
                />
                <Input
                    xs={6}
                    name="TotalShare"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Total share')}
                    value={secPriceInput?.TotalShare}
                    onChange={(value) => secPriceInputOnValueChanged('TotalShare', value)}
                />
                <Input
                    xs={6}
                    name="MinLimit"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Min limit')}
                    value={secPriceInput?.MinLimit}
                    onChange={(value) => secPriceInputOnValueChanged('MinLimit', value)}
                />
                <Input
                    xs={6}
                    name="MaxLimit"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Max limit')}
                    value={secPriceInput?.MaxLimit}
                    onChange={(value) => secPriceInputOnValueChanged('MaxLimit', value)}
                />
            </Card>
        </BasePage >
    )
};

export default withFormPage(SecurityPriceDefinition, { uiMetadata });
