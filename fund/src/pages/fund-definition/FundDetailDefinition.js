import React, { useEffect, useState, useCallback } from 'react';

import {
    useTranslation,
    useTransactionContext,
    dateUtils
}
    from 'component/base';
import {
    BasePage,
    Card,
    withFormPage,
    DatePicker,
    Checkbox
} from 'component/ui';

import {
    moduleScopeKeys,
} from '../../constants';


/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'u1ee718dc3d',
    dialogSize: 'md'
};


const FundDetailDefinition = (props) => {
    const { close, isBpm, fundDefList, onFundCardChange, ...rest } = props;

    const { translate } = useTranslation();
    const { transactionData } = useTransactionContext();
    const [fundProps, editFund] = useState({});

    const filledState = useCallback((dataContract) => {
        if (dataContract) {
            editFund(dataContract);
        }
    }, []);

    useEffect(() => {
        onFundCardChange(fundProps);
    }, [fundProps, onFundCardChange]);

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

    const FundPropsOnValueChanged = (field, value) => {
        editFund({ ...fundProps, [field]: value });
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
                <DatePicker
                    name="RequestBeginDate"
                    xs={3}
                    label={translate('Request begin date')}
                    views={['year', 'month', 'day']}
                    value={fundProps?.Maturity}
                    onChange={(value) => FundPropsOnValueChanged('RequestBeginDate', dateUtils.stringWithFormat(value, 'yyyy-MM-DDTHH:mm:ssZ'))}
                    required
                />
                <DatePicker
                    name="RequestEndDate"
                    xs={3}
                    label={translate('Request end date')}
                    views={['year', 'month', 'day']}
                    value={fundProps?.Maturity}
                    onChange={(value) => FundPropsOnValueChanged('RequestEndDate', dateUtils.stringWithFormat(value, 'yyyy-MM-DDTHH:mm:ssZ'))}
                    required
                />

                <DatePicker
                    name="CouponStartDate"
                    xs={3}
                    label={translate('Coupon start date')}
                    views={['year', 'month', 'day']}
                    value={fundProps?.Maturity}
                    onChange={(value) => FundPropsOnValueChanged('CouponStartDate', dateUtils.stringWithFormat(value, 'yyyy-MM-DDTHH:mm:ssZ'))}
                    required
                />

                <Checkbox
                    xs={6}
                    name="IsLiquidFund"
                    label={translate('Is liquid fund')}
                    value={fundProps.IsActive}
                    onChange={(value) => FundPropsOnValueChanged('IsActive', value)}
                />

                <Checkbox
                    xs={6}
                    name="IsPbFund"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is pb fund')}
                    value={fundProps?.IsPbFund}
                    onChange={(value) => FundPropsOnValueChanged("IsPbFund", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsAffluentFund"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is affluent fund')}
                    value={fundProps?.IsAffluentFund}
                    onChange={(value) => FundPropsOnValueChanged("IsAffluentFund", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsDepositFund"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is deposit fund')}
                    value={fundProps?.IsDepositFund}
                    onChange={(value) => FundPropsOnValueChanged("IsDepositFund", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsMemberOfTefas"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is member of tefas')}
                    value={fundProps?.IsMemberOfTefas}
                    onChange={(value) => FundPropsOnValueChanged("IsMemberOfTefas", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsNemaFund"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is nema fund')}
                    value={fundProps?.IsNemaFund}
                    onChange={(value) => FundPropsOnValueChanged("IsNemaFund", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsTaxRateChanged"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is tax rate changed')}
                    value={fundProps?.IsTaxRateChanged}
                    onChange={(value) => FundPropsOnValueChanged("IsTaxRateChanged", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsForeignExport"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is foreign export')}
                    value={fundProps?.IsForeignExport}
                    onChange={(value) => FundPropsOnValueChanged("IsForeignExport", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsClosed"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is closed')}
                    value={fundProps?.IsClosed}
                    onChange={(value) => FundPropsOnValueChanged("IsClosed", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsEnabledForAdk"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is enabled for adk')}
                    value={fundProps?.IsEnabledForAdk}
                    onChange={(value) => FundPropsOnValueChanged("IsEnabledForAdk", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsTefasFund"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is tefas fund')}
                    value={fundProps?.IsTefasFund}
                    onChange={(value) => FundPropsOnValueChanged("IsTefasFund", value)}
                />


                <Checkbox
                    xs={6}
                    name="IsHedgeFund"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is hedge fund')}
                    value={fundProps?.IsHedgeFund}
                    onChange={(value) => FundPropsOnValueChanged("IsHedgeFund", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsQualifiedInvestorFund"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is qualified investor fund')}
                    value={fundProps?.IsQualifiedInvestorFund}
                    onChange={(value) => FundPropsOnValueChanged("IsQualifiedInvestorFund", value)}
                />


                <Checkbox
                    xs={6}
                    name="IsNemaEnabled"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is nema enabled')}
                    value={fundProps?.IsNemaEnabled}
                    onChange={(value) => FundPropsOnValueChanged("IsNemaEnabled", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsHalfDayValuationSkipped"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is half day valuation skipped')}
                    value={fundProps?.IsHalfDayValuationSkipped}
                    onChange={(value) => FundPropsOnValueChanged("IsHalfDayValuationSkipped", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsPeriodicFund"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is periodic fund')}
                    value={fundProps?.IsPeriodicFund}
                    onChange={(value) => FundPropsOnValueChanged("IsPeriodicFund", value)}
                />
                <Checkbox
                    xs={6}
                    name="IsStoppageEnabledForShareRate"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is stoppage enabled for share rate')}
                    value={fundProps?.IsStoppageEnabledForShareRate}
                    onChange={(value) => FundPropsOnValueChanged("IsStoppageEnabledForShareRate", value)}
                />
                <Checkbox
                    xs={6}
                    name="IsWithCoupon"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is with coupon')}
                    value={fundProps?.IsWithCoupon}
                    onChange={(value) => FundPropsOnValueChanged("IsWithCoupon", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsForeignHoliday"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is foreign holiday')}
                    value={fundProps?.IsForeignHoliday}
                    onChange={(value) => FundPropsOnValueChanged("IsForeignHoliday", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsPrivateFund"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is private fund')}
                    value={fundProps?.IsPrivateFund}
                    onChange={(value) => FundPropsOnValueChanged("IsPrivateFund", value)}
                />

                <Checkbox
                    xs={6}
                    name="IsWatchPriceOnChannel"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Is watch price on channel')}
                    value={fundProps?.IsWatchPriceOnChannel}
                    onChange={(value) => FundPropsOnValueChanged("IsWatchPriceOnChannel", value)}
                />
            </Card>

        </BasePage >
    )
};

export default withFormPage(FundDetailDefinition, { uiMetadata });
