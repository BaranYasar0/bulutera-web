import React, { useEffect, useState, useCallback } from 'react';

import {
    useTranslation,
    useTransactionContext,
    dateUtils,
}
    from 'component/base';
import {
    BasePage,
    Card,
    Input,
    withFormPage,
    DatePicker
} from 'component/ui';

import {
    moduleScopeKeys,
} from '../../constants';


/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'u8e4a865511',
    dialogSize: 'md'
};


const FundShareDefinition = (props) => {
    const { close, isBpm, fundDefList, onFundCardChange, ...rest } = props;

    const { translate } = useTranslation();
    const { transactionData } = useTransactionContext();
    const [fundShareProperties, editFund] = useState({});

    const filledState = useCallback((dataContract) => {
        if (dataContract) {
            editFund(dataContract);
        }
    }, []);

    useEffect(() => {
        onFundCardChange(fundShareProperties);
    }, [fundShareProperties, onFundCardChange]);

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

    const fundSharePropertiesOnValueChanged = (field, value) => {
        editFund({ ...fundShareProperties, [field]: value });
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
                    name="HedgeFundSellingValueChangeWeekDay"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Hedge fund selling value change week day')}
                    value={fundShareProperties?.HedgeFundSellingValueChangeWeekDay}
                    onChange={(value) => fundSharePropertiesOnValueChanged("HedgeFundSellingValueChangeWeekDay", value)}
                />

                <Input
                    xs={6}
                    name="HedgeFundBuyingValueChangeWeekDay"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Hedge fund buying value change week day')}
                    value={fundShareProperties?.HedgeFundBuyingValueChangeWeekDay}
                    onChange={(value) => fundSharePropertiesOnValueChanged("HedgeFundBuyingValueChangeWeekDay", value)}
                />

                <Input
                    xs={6}
                    name="HedgeFundSellingPriceWeekDay"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Hedge fund selling price week day')}
                    value={fundShareProperties?.HedgeFundSellingPriceWeekDay}
                    onChange={(value) => fundSharePropertiesOnValueChanged("HedgeFundSellingPriceWeekDay", value)}
                />

                <Input
                    xs={6}
                    name="HedgeFundBuyingPriceWeekDay"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Hedge fund buying price week day')}
                    value={fundShareProperties?.HedgeFundBuyingPriceWeekDay}
                    onChange={(value) => fundSharePropertiesOnValueChanged("HedgeFundBuyingPriceWeekDay", value)}
                />

                <Input
                    xs={6}
                    name="HedgeFundSellingValueWeekDay"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Hedge fund selling value week day')}
                    value={fundShareProperties?.HedgeFundSellingValueWeekDay}
                    onChange={(value) => fundSharePropertiesOnValueChanged("HedgeFundSellingValueWeekDay", value)}
                />

                <Input
                    xs={6}
                    name="HedgeFundBuyingValueWeekDay"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Hedge fund buying value week day')}
                    value={fundShareProperties?.HedgeFundBuyingValueWeekDay}
                    onChange={(value) => fundSharePropertiesOnValueChanged("HedgeFundBuyingValueWeekDay", value)}
                />


                <Input
                    xs={6}
                    name="ShareRate"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Share rate')}
                    value={fundShareProperties?.ShareRate}
                    onChange={(value) => fundSharePropertiesOnValueChanged("ShareRate", value)}
                />

                <Input
                    xs={6}
                    name="ScoreCardCommissionRate"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Score card commission rate')}
                    value={fundShareProperties?.ScoreCardCommissionRate}
                    onChange={(value) => fundSharePropertiesOnValueChanged("ScoreCardCommissionRate", value)}
                />

                <Input
                    xs={6}
                    name="InternalRatio"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Internal ratio')}
                    value={fundShareProperties?.InternalRatio}
                    onChange={(value) => fundSharePropertiesOnValueChanged("InternalRatio", value)}
                />

                <Input
                    xs={6}
                    name="PortfolioRatio"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Portfolio ratio')}
                    value={fundShareProperties?.PortfolioRatio}
                    onChange={(value) => fundSharePropertiesOnValueChanged("PortfolioRatio", value)}
                />

                <Input
                    xs={6}
                    name="InterestType"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Interest type')}
                    value={fundShareProperties?.InterestType !== undefined ? fundShareProperties?.InterestType : "1"}
                    onChange={(value) => fundSharePropertiesOnValueChanged("InterestType", value)}
                />

                <Input
                    xs={6}
                    name="CouponCountPerYear"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Coupon count per year')}
                    value={fundShareProperties?.CouponCountPerYear}
                    onChange={(value) => fundSharePropertiesOnValueChanged("CouponCountPerYear", value)}
                />
                <Input
                    xs={6}
                    name="CouponCount"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Coupon count')}
                    value={fundShareProperties?.CouponCount}
                    onChange={(value) => fundSharePropertiesOnValueChanged("CouponCount", value)}
                />

                <Input
                    xs={6}
                    name="FirstCouponRate"
                    inputProps={{ maxLength: 10 }}
                    label={translate('First coupon rate')}
                    value={fundShareProperties?.FirstCouponRate}
                    onChange={(value) => fundSharePropertiesOnValueChanged("FirstCouponRate", value)}
                />

                <Input
                    xs={6}
                    name="AnnualInterestCoupons"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Annual interest coupons')}
                    value={fundShareProperties?.AnnualInterestCoupons}
                    onChange={(value) => fundSharePropertiesOnValueChanged("AnnualInterestCoupons", value)}
                />

                <Input
                    xs={6}
                    name="BrokenInterestCoupons"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Broken interest coupons')}
                    value={fundShareProperties?.BrokenInterestCoupons}
                    onChange={(value) => fundSharePropertiesOnValueChanged("BrokenInterestCoupons", value)}
                />

                <Input
                    xs={6}
                    name="SpkCodeType"
                    inputProps={{ maxLength: 10 }}
                    label={translate('Spk code type')}
                    value={fundShareProperties?.SpkCodeType}
                    onChange={(value) => fundSharePropertiesOnValueChanged("SpkCodeType", value)}
                />
                <DatePicker
                    name="Maturity"
                    xs={3}
                    label={translate('Maturity')}
                    views={['year', 'month', 'day']}
                    value={fundShareProperties?.Maturity}
                    onChange={(value) => fundSharePropertiesOnValueChanged('Maturity', dateUtils.stringWithFormat(value, 'yyyy-MM-DDTHH:mm:ssZ'))}
                    required
                />

                <DatePicker
                    name="IssueDate"
                    xs={3}
                    label={translate('Issue date')}
                    views={['year', 'month', 'day']}
                    value={fundShareProperties?.IssueDate}
                    onChange={(value) => fundSharePropertiesOnValueChanged('IssueDate', dateUtils.stringWithFormat(value, 'yyyy-MM-DDTHH:mm:ssZ'))}
                    required
                />
            </Card>
        </BasePage >
    )
};

export default withFormPage(FundShareDefinition, { uiMetadata });
