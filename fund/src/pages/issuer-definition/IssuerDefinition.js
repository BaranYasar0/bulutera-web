import React, { useEffect, useState } from 'react';

import {
    useFiProxy,
    useTranslation,
    useTransactionContext,
    stringFormat,
}
    from 'component/base';
import {
    BasePage,
    Card,
    Input,
    SelectEnum,
    withFormPage,
} from 'component/ui';

import {
    apiUrls,
    moduleScopeKeys,
} from '../../constants';

const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'u4c2b37214d',
    dialogSize: 'md'
};


const IssuerDefinition = (props) => {
    const { close, isBpm, uniqIssuerId, ...rest } = props;
    const nameMLRef = React.createRef();

    const { translate } = useTranslation();
    const { transactionData } = useTransactionContext();
    const { executeGet, executePost, executePut } = useFiProxy();

    const [IssuerId, editIssuer] = useState({
        NameML: [],
    });

    useEffect(() => {
        uniqIssuerId && getIssuer(uniqIssuerId);
    }, []);

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
            editIssuer(dataContract);
        }
    }

    const getIssuer = (uniqIssuerId) => {
        const apiUrl = apiUrls.issuerCreateApi + '/' + uniqIssuerId;
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

    const IssuerIdOnValueChanged = (field, value) => {
        editIssuer({ ...IssuerId, [field]: value });
    }

    const onActionClick = (action) => {
        if (action.commandName === 'Save') {
            const nameML = nameMLRef?.current?.value;
            if (uniqIssuerId > 0) {
                const apiUrl = stringFormat(apiUrls.issuerCreateApi, uniqIssuerId);
                executePut({
                    url: apiUrl,
                    data: {
                        ...IssuerId,
                        NameML: nameML,
                    }
                }).then((response) => {
                    if (response.Success) {
                        close();
                    }
                })
            }
            else {
                executePost({
                    url: apiUrls.issuerCreateApi,
                    data: {
                        ...IssuerId,
                        NameML: nameML,
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
                <SelectEnum
                    xs={3}
                    enumName="RecordStatus"
                    name="RecordStatus"
                    label={translate('Record status')}
                    value={IssuerId?.CorporationType}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => IssuerIdOnValueChanged('RecordStatus', value)}
                />
                <SelectEnum
                    xs={3}
                    enumName="CorporationType"
                    name="CorporationType"
                    label={translate('Corporation type')}
                    value={IssuerId?.CorporationType}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => IssuerIdOnValueChanged('CorporationType', value)}
                />
                <SelectEnum
                    xs={3}
                    enumName="ISOCountryCodes"
                    name="CountryCode"
                    label={translate('ISO country codes')}
                    value={IssuerId?.CountryCode}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => IssuerIdOnValueChanged('CountryCode', value)}
                />
                <Input
                    xs={6}
                    name="CorporationName"
                    required
                    inputProps={{ maxLength: 100 }}
                    label={translate('Corporation name')}
                    value={IssuerId?.CorporationName}
                    onChange={(value) => IssuerIdOnValueChanged('CorporationName', value)}
                />
                <Input
                    xs={6}
                    name="CorporationCode"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Corporation code')}
                    value={IssuerId?.CorporationCode}
                    onChange={(value) => IssuerIdOnValueChanged('CorporationCode', value)}
                />
                <Input
                    xs={6}
                    name="IsDomestic"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is domestic')}
                    value={IssuerId?.IsDomestic}
                    onChange={(value) => IssuerIdOnValueChanged('IsDomestic', value)}
                />
                <Input
                    xs={6}
                    name="UpdatingChannelCode"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Updating channel code')}
                    value={IssuerId?.UpdatingChannelCode}
                    onChange={(value) => IssuerIdOnValueChanged('UpdatingChannelCode', value)}
                />
                <Input
                    xs={6}
                    name="UpdatingTranCode"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Updating tran code')}
                    value={IssuerId?.UpdatingTranCode}
                    onChange={(value) => IssuerIdOnValueChanged('UpdatingTranCode', value)}
                />
                <Input
                    xs={6}
                    name="IssuerLimit"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Issuer limit')}
                    value={IssuerId?.UpdatingTranCode}
                    onChange={(value) => IssuerIdOnValueChanged('IssuerLimit', value)}
                />
                <Input
                    xs={6}
                    name="CustomerNumber"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Customer number')}
                    value={IssuerId?.CustomerNumber}
                    onChange={(value) => IssuerIdOnValueChanged('CustomerNumber', value)}
                />
            </Card>
        </BasePage >
    )
};

export default withFormPage(IssuerDefinition, { uiMetadata });
