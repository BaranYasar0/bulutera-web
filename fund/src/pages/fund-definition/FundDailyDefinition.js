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
    withFormPage,
} from 'component/ui';

import {
    moduleScopeKeys,
} from '../../constants';


/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'uc6c458f187',
    dialogSize: 'md'
};

const FundDailyDefinition = (props) => {
    const { close, isBpm, fundDefList, onFundCardChange, ...rest } = props;
    const { translate } = useTranslation();
    const { transactionData } = useTransactionContext();
    const [fundDetailsProperties, editFund] = useState({});

    const filledState = useCallback((dataContract) => {
        if (dataContract) {
            editFund(dataContract);
        }
    }, []);

    useEffect(() => {
        onFundCardChange(fundDetailsProperties);
    }, [fundDetailsProperties, onFundCardChange]);

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

    const fundDetailsPropertiesOnValueChanged = (field, value) => {
        editFund({ ...fundDetailsProperties, [field]: value });
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
                <Input
                    xs={6}
                    name="LowerLimit"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Lower limit')}
                    value={fundDefList?.LowerLimit || fundDetailsProperties?.LowerLimit}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("LowerLimit", value)}
                />

                <Input
                    xs={6}
                    name="TaxRate"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Tax rate')}
                    value={fundDefList?.TaxRate || fundDetailsProperties?.TaxRate}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("TaxRate", value)}
                />

                <Input
                    xs={6}
                    name="MaturityGrossAmount"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Maturity gross amount')}
                    value={fundDefList?.MaturityGrossAmount || fundDetailsProperties?.MaturityGrossAmount}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("MaturityGrossAmount", value)}
                />

                <Input
                    xs={6}
                    name="MaturityNetAmount"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Maturity net amount')}
                    value={fundDefList?.MaturityNetAmount || fundDetailsProperties?.MaturityNetAmount}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("MaturityNetAmount", value)}
                />

                <Input
                    xs={6}
                    name="UpdateProgCode"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Update prog code')}
                    value={fundDefList?.UpdateProgCode || fundDetailsProperties?.UpdateProgCode}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("UpdateProgCode", value)}
                />

                <Input
                    xs={6}
                    name="FundAccountBranchCode"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Fund account branch code')}
                    value={fundDefList?.FundAccountBranchCode || fundDetailsProperties?.FundAccountBranchCode}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("FundAccountBranchCode", value)}
                />

                <Input
                    xs={6}
                    name="BuyingValueDayCount"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Buying value day count')}
                    value={fundDefList?.BuyingValueDayCount || fundDetailsProperties?.BuyingValueDayCount}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("BuyingValueDayCount", value)}
                />

                <Input
                    xs={6}
                    name="SellingValueDayCount"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Selling value day count')}
                    value={fundDefList?.SellingValueDayCount || fundDetailsProperties?.SellingValueDayCount}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("SellingValueDayCount", value)}
                />

                <Input
                    xs={6}
                    name="EarlyOutCommissionRate"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Early out commission rate')}
                    value={fundDefList?.EarlyOutCommissionRate || fundDetailsProperties?.EarlyOutCommissionRate}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("EarlyOutCommissionRate", value)}
                />

                <Input
                    xs={6}
                    name="CustDailyPrcsCount"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Cust daily prcs count')}
                    value={fundDefList?.CustDailyPrcsCount || fundDetailsProperties?.CustDailyPrcsCount}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("CustDailyPrcsCount", value)}
                />

                <Input
                    xs={6}
                    name="BuyingPriceDayCount"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Buying price day count')}
                    value={fundDefList?.BuyingPriceDayCount || fundDetailsProperties?.BuyingPriceDayCount}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("BuyingPriceDayCount", value)}
                />

                <Input
                    xs={6}
                    name="SellingPriceDayCount"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Selling price day count')}
                    value={fundDefList?.SellingPriceDayCount || fundDetailsProperties?.SellingPriceDayCount}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("SellingPriceDayCount", value)}
                />

                <Input
                    xs={6}
                    name="MaxBuyCount"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Max buy count')}
                    value={fundDefList?.MaxBuyCount || fundDetailsProperties?.MaxBuyCount}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("MaxBuyCount", value)}
                />

                <Input
                    xs={6}
                    name="MaxSellCount"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Max sell count')}
                    value={fundDefList?.MaxSellCount || fundDetailsProperties?.MaxSellCount}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("MaxSellCount", value)}
                />

                <Input
                    xs={6}
                    name="InitialRequestShareLimit"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Initial request share limit')}
                    value={fundDefList?.InitialRequestShareLimit || fundDetailsProperties?.InitialRequestShareLimit}
                    onChange={(value) => fundDetailsPropertiesOnValueChanged("InitialRequestShareLimit", value)}
                />
            </Card>
        </BasePage >
    )
};

export default withFormPage(FundDailyDefinition, { uiMetadata });
