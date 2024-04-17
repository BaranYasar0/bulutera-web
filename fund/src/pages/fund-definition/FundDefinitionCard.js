import React, { useEffect, useState, useCallback } from 'react';

import {
    useTranslation,
    useTransactionContext,
}
    from 'component/base';
import {
    BasePage,
    Card,
    Input,
    SelectEnum,
    withFormPage,
    Select,
} from 'component/ui';

import {
    moduleScopeKeys,
} from '../../constants';


/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'u9c5d4665d2',
    dialogSize: 'md'
};


const FundDefinitionCard = (props) => {
    const { close, isBpm, fundDefList, onFundCardChange, issuerCorpList, ...rest } = props;
    const { translate } = useTranslation();
    const { transactionData } = useTransactionContext();
    const [FundCard, editFund] = useState({});

    const filledState = useCallback((dataContract) => {
        if (dataContract) {
            editFund(dataContract);
        }
    }, []);

    useEffect(() => {
        onFundCardChange(FundCard);
    }, [FundCard, onFundCardChange]);

    useEffect(() => {
        if (fundDefList) {
            filledState(fundDefList);
        }
    }, [fundDefList, filledState]);

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

    const FundCardOnValueChanged = (field, value) => {
        editFund({ ...FundCard, [field]: value });
    }
    const onActionClick = (action) => {
        if (action.commandName === 'Save') {
            close && close();
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
                scopeKey={moduleScopeKeys.Create_Fund}

            >
                <Select
                    name="IssuerCorporationId"
                    xs={6}
                    required
                    label={translate('Corporation name')}
                    datasource={issuerCorpList}
                    onChange={(value) => { FundCardOnValueChanged('IssuerCorporationId', value) }}
                    columns={['CorporationName']}
                    valuePath={'Id'}
                    value={FundCard?.IssuerCorporationId}
                />

                <SelectEnum
                    xs={3}
                    enumName="ISOCurrencyCodes"
                    name="CurrencyCode"
                    label={translate('ISO currency codes')}
                    value={FundCard?.CurrencyCode}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => FundCardOnValueChanged('CurrencyCode', value)}
                />
                <SelectEnum
                    xs={3}
                    enumName="ISOCountryCodes"
                    name="CountryCode"
                    label={translate('ISO country codes')}
                    value={FundCard.CountryCode !== undefined ? FundCard.CountryCode : "TUR"}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => FundCardOnValueChanged('CountryCode', value)}
                />
                <SelectEnum
                    xs={3}
                    enumName="FundType"
                    name="FundType"
                    label={translate('Fund type')}
                    value={FundCard?.FundType}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => FundCardOnValueChanged('FundType', value)}
                />
                <SelectEnum
                    xs={3}
                    enumName="RecordStatus"
                    name="RecordStatus"
                    label={translate('Record status')}
                    value={FundCard?.RecordStatus}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => FundCardOnValueChanged('RecordStatus', value)}
                />
                <SelectEnum
                    xs={3}
                    enumName="KindOfFund"
                    name="KindOfFund"
                    label={translate('Kind of fund')}
                    value={FundCard?.KindOfFund}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => FundCardOnValueChanged('KindOfFund', value)}
                />
                <SelectEnum
                    xs={3}
                    enumName="BasisGroup"
                    name="BasisGroup"
                    label={translate('Basis group')}
                    value={FundCard?.BasisGroup}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => FundCardOnValueChanged('BasisGroup', value)}
                />
                <Input
                    xs={6}
                    name="FundCode"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Fund code')}
                    value={FundCard?.FundCode}
                    onChange={(value) => FundCardOnValueChanged("FundCode", value)}
                />
                <Input
                    xs={6}
                    name="FundName"
                    required
                    inputProps={{ maxLength: 40 }}
                    label={translate('Fund name')}
                    value={FundCard?.FundName}
                    onChange={(value) => FundCardOnValueChanged("FundName", value)}
                />
                <Input
                    xs={6}
                    name="FundAccountNumber"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Fund account number')}
                    value={FundCard?.FundAccountNumber}
                    onChange={(value) => FundCardOnValueChanged("FundAccountNumber", value)}
                />
                <Input
                    xs={6}
                    name="IMKBCode"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('IMKB code')}
                    value={FundCard?.IMKBCode}
                    onChange={(value) => FundCardOnValueChanged("IMKBCode", value)}
                />
                <Input
                    xs={6}
                    name="ParentFundCode"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Parent fund code')}
                    value={FundCard?.ParentFundCode}
                    onChange={(value) => FundCardOnValueChanged("ParentFundCode", value)}
                />
                <Input
                    xs={6}
                    name="Isin"
                    required
                    inputProps={{ maxLength: 15 }}
                    label={translate('Isin')}
                    value={FundCard?.Isin}
                    onChange={(value) => FundCardOnValueChanged("Isin", value)}
                />
                <Input
                    xs={6}
                    name="MarginRate"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Margin rate')}
                    value={FundCard?.MarginRate}
                    onChange={(value) => FundCardOnValueChanged("MarginRate", value)}
                />
                <Input
                    xs={6}
                    name="CommissionRate"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Commission rate')}
                    value={FundCard?.CommissionRate}
                    onChange={(value) => FundCardOnValueChanged("CommissionRate", value)}
                />
                <Input
                    xs={6}
                    name="RemizCompany"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Remiz company')}
                    value={FundCard?.RemizCompany}
                    onChange={(value) => FundCardOnValueChanged("RemizCompany", value)}
                />
                <Input
                    xs={6}
                    name="TotalShare"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Total share')}
                    value={FundCard?.TotalShare}
                    onChange={(value) => FundCardOnValueChanged("TotalShare", value)}
                />
                <Input
                    xs={6}
                    name="MinShare"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Min share')}
                    value={FundCard?.MinShare}
                    onChange={(value) => FundCardOnValueChanged("MinShare", value)}
                />
            </Card>
        </BasePage >
    )
};

export default withFormPage(FundDefinitionCard, { uiMetadata });
