import React, { useEffect, useMemo, useState, useCallback } from 'react';

import {
    useFiProxy,
    useFormManagerContext,
    useTranslation,
} from 'component/base';


import {
    BasePage,
    Filter,
    Card,
    DataGrid,
    withFormPage,
    dataGridColumnTypes,
    SelectEnum,
    Input,
    Button
} from 'component/ui';

import { FundDefinition } from '../fund-definition';

import {
    BasisGroup,
    CurrencyCodes,
    FundType,
    RecordStatus,
    apiUrls,
    moduleScopeKeys ,
    KindOfFund
} from '../../constants';

const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'u3aaa4a4492',
    dialogSize: 'md'
};

const FundList = (props) => {
    const filterRef = React.useRef();
    const { showDialog } = useFormManagerContext();
    const { translate } = useTranslation();
    const { executeGet, executeDelete } = useFiProxy();
    const [customerData, setCustomerData] = useState({});
    const [dataSource, setDataSource] = useState([]);
    const [filter] = useState({
        Active: true,
    }
    );

    const getDataSource = (data, reset) => {
        if (reset) {
            setDataSource([]);
        }
        let filterDataParams = data ? data : filterRef.current.filter();
        let params = {
            ...filterDataParams,
        }
        if(customerData){
            params.CurrencyCode = customerData.CurrencyCode !== undefined ? customerData.CurrencyCode : null;
            params.FundType = customerData.FundType !== undefined ? customerData.FundType : null;
            params.FundName = customerData.FundName !== undefined ? customerData.FundName : null;
            params.FundCode = customerData.FundCode !== undefined ? customerData.FundCode : null;
            params.IssuerCorporationName = customerData.IssuerCorporationName !== undefined ? customerData.IssuerCorporationName : null;
        }

        executeGet({ url: apiUrls.fundListByParameters, params, setStateDelegate: setDataSource })
    }
    const transformedData = dataSource.map(item => {
        const { IssuerCorporation, ...rest } = item;
        if (IssuerCorporation) {
            rest.IssuerCorporationName = IssuerCorporation.CorporationName || '';
            rest.IssuerCorporationType = IssuerCorporation.CorporationType || '';
        } else {
            rest.IssuerCorporationName = '';
            rest.IssuerCorporationType = '';
        }

        return rest;
    });
    const customerDataOnValueChanged = (field, value) => {
        setCustomerData({ ...customerData, [field]: value });
    };
    const deleteData = (id) => {
        if (id) {
            const apiUrl = apiUrls.fundDeleteApi + '/' + id;
            executeDelete({ url: apiUrl }).then((response) => {
                if (response.Success && response.Value) {
                    getDataSource();
                }
            });
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
                defaultFlex: 1,
            },
            {
                name: 'FundType',
                header: translate('Fund type'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource: FundType,
                    enumName: 'FundType',
                    valuePath: 'Code',
                    labelPath: 'Name',
                },
            },
            {
                name: 'IssuerCorporationName',
                header: translate('Corporation name'),
                defaultFlex: 1,
            },
            {
                name: 'IssuerCorporationType',
                header: translate('Corporation type'),
                defaultFlex: 1,
            },
            {
                name: 'CurrencyCode',
                header: translate('Currency code'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource: CurrencyCodes,
                    enumName: 'CurrencyCodes',
                    valuePath: 'Code',
                    labelPath: 'Name',
                },
            },
            {
                name: 'KindOfFund',
                header: translate('Kind of fund'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource:KindOfFund ,
                    enumName: 'KindOfFund',
                    valuePath: 'Code',
                    labelPath: 'Name',
                },
            },
            {
                name: 'BasisGroup',
                header: translate('Basis group'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource: BasisGroup,
                    enumName: 'BasisGroup',
                    valuePath: 'Code',
                    labelPath: 'Name',
                },
            },
            {
                name: 'RecordStatus',
                header: translate('Record status'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource: RecordStatus,
                    enumName: 'RecordStatus',
                    valuePath: 'Code',
                    labelPath: 'Name',
                },
            },
            {
                name: 'FundCode',
                header: translate('Fund code'),
                defaultFlex: 1,
            },
            {
                name: 'IMKBCode',
                header: translate('IMKB code'),
                defaultFlex: 1,
            },
            {
                name: 'IsLiquidFund',
                header: translate('Is liquid fund'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'Isin',
                header: translate('Isin'),
                defaultFlex: 1,
            },
            {
                name: 'IsPbFund',
                header: translate('Is pb fund'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'IsAffluentFund',
                header: translate('Is affluent fund'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'IsDepositFund',
                header: translate('Is deposit fund'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'IsMemberOfTefas',
                header: translate('Is member of tefas'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'IsNemaFund',
                header: translate('Is nema fund'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'ParentFundCode',
                header: translate('Parent fund code'),
                defaultFlex: 1,
            },
            {
                name: 'Maturity',
                header: translate('Maturity'),
                defaultFlex: 1,
            },
            {
                name: 'MarginRate',
                header: translate('Margin rate'),
                defaultFlex: 1,
            },

            {
                name: 'CommissionRate',
                header: translate('Commission rate'),
                defaultFlex: 1,
            },
            {
                name: 'IssueDate',
                header: translate('Issue date'),
                defaultFlex: 1,
            },
            {
                name: 'RemizCompany',
                header: translate('Remiz company'),
                defaultFlex: 1,
            },
            {
                name: 'TotalShare',
                header: translate('Total share'),
                defaultFlex: 1,
            },
            {
                name: 'MinShare',
                header: translate('Min share'),
                defaultFlex: 1,
            },
            {
                name: 'LowerLimit',
                header: translate('Lower limit'),
                defaultFlex: 1,
            },
            {
                name: 'IsTaxRateChanged',
                header: translate('Is tax rate changed'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'TaxRate',
                header: translate('Tax rate'),
                defaultFlex: 1,
            },
            {
                name: 'MaturityGrossAmount',
                header: translate('Maturity gross amount'),
                defaultFlex: 1,
            },
            {
                name: 'MaturityNetAmount',
                header: translate('Maturity net amount'),
                defaultFlex: 1,
            },
            {
                name: 'UpdateProgCode',
                header: translate('Update prog code'),
                defaultFlex: 1,
            },
            {
                name: 'RequestBeginDate',
                header: translate('Request begin date'),
                defaultFlex: 1,
            },
            {
                name: 'RequestEndDate',
                header: translate('Request end date'),
                defaultFlex: 1,
            },
            {
                name: 'CouponStartDate',
                header: translate('Coupon start date'),
                defaultFlex: 1,
            },

            {
                name: 'FundAccountBranchCode',
                header: translate('Fund account branch code'),
                defaultFlex: 1,
            },
            {
                name: 'FundAccountNumber',
                header: translate('Fund account number'),
                defaultFlex: 1,
            },
            {
                name: 'BuyingValueDayCount',
                header: translate('Buying value day count'),
                defaultFlex: 1,
            },
            {
                name: 'SellingValueDayCount',
                header: translate('Selling value day count'),
                defaultFlex: 1,
            },
            {
                name: 'EarlyOutCommissionRate',
                header: translate('Early out commission rate'),
                defaultFlex: 1,
            },
            {
                name: 'IsForeignExport',
                header: translate('Is foreign export'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'IsClosed',
                header: translate('Is closed'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'CustDailyPrcsCount',
                header: translate('Cust daily prcs count'),
                defaultFlex: 1,
            },
            {
                name: 'IsEnabledForAdk',
                header: translate('Is enabled for adk'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'BuyingPriceDayCount',
                header: translate('Buying price day count'),
                defaultFlex: 1,
            },
            {
                name: 'SellingPriceDayCount',
                header: translate('Selling price day count'),
                defaultFlex: 1,
            },
            {
                name: 'IsTefasFund',
                header: translate('Is tefas fund'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'MaxBuyCount',
                header: translate('Max buy count'),
                defaultFlex: 1,
            },
            {
                name: 'MaxSellCount',
                header: translate('Max sell count'),
                defaultFlex: 1,
            },
            {
                name: 'IsHedgeFund',
                header: translate('Is hedge fund'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'IsQualifiedInvestorFund',
                header: translate('Is qualified investor fund'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'InitialRequestShareLimit',
                header: translate('Initial request share limit'),
                defaultFlex: 1,
            },
            {
                name: 'HedgeFundSellingValueChangeWeekDay',
                header: translate('Hedge fund selling value change week day'),
                defaultFlex: 1,
            },
            {
                name: 'HedgeFundBuyingValueChangeWeekDay',
                header: translate('Hedge fund buying value change week day'),
                defaultFlex: 1,
            },
            {
                name: 'HedgeFundSellingPriceWeekDay',
                header: translate('Hedge fund selling price week day'),
                defaultFlex: 1,
            },

            {
                name: 'HedgeFundBuyingPriceWeekDay',
                header: translate('Hedge fund buying price week day'),
                defaultFlex: 1,
            },
            {
                name: 'HedgeFundSellingValueWeekDay',
                header: translate('Hedge fund selling value week day'),
                defaultFlex: 1,
            },
            {
                name: 'HedgeFundBuyingValueWeekDay',
                header: translate('Hedge fund buying value week day'),
                defaultFlex: 1,
            },
            {
                name: 'IsNemaEnabled',
                header: translate('Is nema enabled'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'IsHalfDayValuationSkipped',
                header: translate('Is half day valuation skipped'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'IsPeriodicFund',
                header: translate('Is periodic fund'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'ShareRate',
                header: translate('Share rate'),
                defaultFlex: 1,
            },
            {
                name: 'IsStoppageEnabledForShareRate',
                header: translate('Is stoppage enabled for share rate'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'ScoreCardCommissionRate',
                header: translate('Score card commission rate'),
                defaultFlex: 1,
            },
            {
                name: 'InternalRatio',
                header: translate('Internal ratio'),
                defaultFlex: 1,
            },
            {
                name: 'PortfolioRatio',
                header: translate('Portfolio ratio'),
                defaultFlex: 1,
            },
            {
                name: 'IsWithCoupon',
                header: translate('Is with coupon'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'CouponCountPerYear',
                header: translate('Coupon count per year'),
                defaultFlex: 1,
            },
            {
                name: 'CouponCount',
                header: translate('Coupon count'),
                defaultFlex: 1,
            },
            {
                name: 'FirstCouponRate',
                header: translate('First coupon rate'),
                defaultFlex: 1,
            },
            {
                name: 'AnnualInterestCoupons',
                header: translate('Annual interest coupons'),
                defaultFlex: 1,
            },
            {
                name: 'BrokenInterestCoupons',
                header: translate('Broken interest coupons'),
                defaultFlex: 1,
            },
            {
                name: 'SpkCodeType',
                header: translate('Spk code type'),
                defaultFlex: 1,
            },
            {
                name: 'IsForeignHoliday',
                header: translate('Is foreign holiday'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'IsPrivateFund',
                header: translate('Is private fund'),
                defaultFlex: 1,
                type: 'bool'
            },
            {
                name: 'IsWatchPriceOnChannel',
                header: translate('Is watch price on channel'),
                defaultFlex: 1,
                type: 'bool'
            }

        ],
        []
    );

    const onRowActionVisible = (row, action) => {
        switch (action) {
            case 'edit':
                return true
            case 'delete':
                return true
            default:
                return true;
        }
    };

    const addScreenNameClicked = useCallback(
        () => {
            showDialog({
                title: translate('Fund definition'),
                content: (
                    < FundDefinition
                    />
                ),
                callback: () => {
                    getDataSource();
                }
            });
        }, []);

    const editScreenNameClicked = useCallback(
        (id, data) => {
            data && showDialog({
                title: translate('Fund Definition'),
                content: (
                    < FundDefinition
                        uniqFundModel={data}
                    />
                ),
                callback: () => {
                    getDataSource();
                }
            });
        },
        [],
    );

    const deleteScreenNameClicked = useCallback(
        (id, data) => {
            data && deleteData(data.Id);
        },
        [],
    );

    const gridActionList = useMemo(
        () => [
            {
                name: 'delete',
                onClick: deleteScreenNameClicked,
                scopeKey: moduleScopeKeys.Delete_Fund,
            },
            {
                name: 'edit',
                onClick: editScreenNameClicked,
                scopeKey: moduleScopeKeys.Update_Fund,

            }
        ],
        [deleteScreenNameClicked, editScreenNameClicked]
    );

    const cardActionList = useMemo(
        () => [
            {
                name: 'Add',
                icon: 'add',
                onClick: addScreenNameClicked,
                scopeKey: moduleScopeKeys.Create_Fund,
            },
        ],
        [addScreenNameClicked]
    );

    return (
        <BasePage
            {...props}

        >
            
                
            <Card
                name="Fund List Card"
                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
                actionList={cardActionList}
            >
                <SelectEnum
                    xs={2}
                    enumName="ISOCurrencyCodes"
                    name="CurrencyCode"
                    label={translate('ISO currency codes')}
                    value={customerData?.CurrencyCode}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => customerDataOnValueChanged('CurrencyCode', value)}
                />
                <SelectEnum
                    xs={2}
                    enumName="FundType"
                    name="FundType"
                    label={translate('Fund type')}
                    value={customerData?.FundType}
                    columns={['Name']}
                    valuePath={'Code'}
                    onChange={(value) => customerDataOnValueChanged('FundType', value)}
                />
                <Input
                        xs={2}
                        name="FundName"
                        inputProps={{ maxLength: 30 }}
                        label={translate('Fund name')}
                        onChange={(value) => customerDataOnValueChanged("FundName", value)}
                        value={customerData?.FundName}
                />
                <Input
                        xs={1}
                        name="FundCode"
                        inputProps={{ maxLength: 15 }}
                        label={translate('Fund code')}
                        onChange={(value) => customerDataOnValueChanged("FundCode", value)}
                        value={customerData?.FundCode}
                />
                <Input
                        xs={2}
                        name="IssuerCorporationName"
                        inputProps={{ maxLength: 30 }}
                        label={translate('Corporation name')}
                        onChange={(value) => customerDataOnValueChanged("IssuerCorporationName", value)}
                        value={customerData?.IssuerCorporationName}
                />
                <Button
                    name="GetFunds"
                    xs={2}
                    variant="outlined"
                    startIcon={translate('Get funds')}
                    onClick={() => {
                        getDataSource(filter);
                    }}
                ></Button>
                <DataGrid
                    name="Fund List Grid"
                    dataSource={transformedData}
                    columns={columns}
                    actionList={gridActionList}
                    onRowActionVisible={onRowActionVisible}
                />
            </Card>
        </BasePage >
    );
};
FundList.displayName = 'Fund List Screen';

export default withFormPage(FundList, { uiMetadata });
