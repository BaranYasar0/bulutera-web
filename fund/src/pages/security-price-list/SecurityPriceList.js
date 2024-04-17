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
    Input,
    DatePicker,
    Button
} from 'component/ui';

import {
    apiUrls,
    ChannelType,
    moduleScopeKeys,
    RecordStatus
} from '../../constants';


import { SecurityPriceDefinition } from '../security-price-definition';

const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'u4ab03f0dce',
    dialogSize: 'md'
};

const SecurityPriceList = (props) => {
    const filterRef = React.useRef();
    const { showDialog } = useFormManagerContext();
    const { translate } = useTranslation();
    const { executeGet } = useFiProxy();
    const [dataSource, setDataSource] = useState([]);
    const [fundList, setFundList] = useState([]);
    const [fundId, setFundId] = useState({});
    const [filter] = useState({
        Active: true,
    });

    useEffect(() => {
        if (dataSource.length == 0) {
            getDataSource(filter);
        }
    }, []);
    useEffect(() => {
        if (fundList.length == 0) {
            getfundList();
        }
    }, [fundList]);
    const getDataSource = (data, reset) => {
        if (reset) {
            setDataSource([]);
        }
        let filterDataParams = data ? data : filterRef.current.filter();
        let params = {
            ...filterDataParams,
        }
        if (fundId.FundDefinitionId) {
            executeGet({ url: apiUrls.fundSecurityPriceById + fundId.FundDefinitionId, params, setStateDelegate: setDataSource })
        }
    }
    const getfundList = (data, reset) => {
        if (reset) {
            setDataSource([]);
        }
        let filterDataParams = data ? data : filterRef.current.filter();
        let params = {
            ...filterDataParams,
        }

        executeGet({ url: apiUrls.fundAndPriceListApi, params, setStateDelegate: setFundList })
    }

    const getSecPriceList = () => {
        if (fundId.FundCode) {
            executeGet({ url: apiUrls.fundPriceByParameters + `?FundCode=${fundId.FundCode}`, setStateDelegate: setDataSource })
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
                name: 'PriceDate',
                header: translate('Price date'),
                defaultFlex: 1,
                type: dataGridColumnTypes.date,
            },
            {
                name: 'UnitPrice',
                header: translate('Unit price'),
                defaultFlex: 1,
            },
            {
                name: 'ChannelCode',
                header: translate('Channel code'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource: ChannelType,
                    enumName: 'ChannelType',
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
                name: 'InterestRate',
                header: translate('Interest rate'),
                defaultFlex: 1,
            },
            {
                name: 'CurrentShare',
                header: translate('Current share'),
                defaultFlex: 1,
            },
            {
                name: 'TotalShare',
                header: translate('Total share'),
                defaultFlex: 1,
            },
            {
                name: 'ApproveDate',
                header: translate('Approve date'),
                defaultFlex: 1,
                type: dataGridColumnTypes.date,
            },
        ],
        []
    );


    const addScreenNameClicked = useCallback(
        () => {
            showDialog({
                title: translate('Add'),
                content: (
                    < SecurityPriceDefinition
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
                title: translate('Edit'),
                content: (
                    < SecurityPriceDefinition
                        UniqIssuerId={data.Id}
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
                scopeKey: moduleScopeKeys.Update_Fund
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
    const SecPriceInputOnValueChanged = (field, value) => {
        setFundId({ ...fundId, [field]: value });
    }
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
                name="Issuer Card"
                scopeKey={moduleScopeKeys.List_Fund}
                showHeader={true}
                actionList={cardActionList}
            >
                <Input
                    xs={4}
                    name="FundCode"
                    required
                    inputProps={{ maxLength: 10 }}
                    label={translate('Fund code')}
                    value={fundId?.FundCode}
                    onChange={(value) => SecPriceInputOnValueChanged("FundCode", value)}
                />
                <DatePicker
                    name="FromDate"
                    xs={3}
                    label={translate('Start date')}
                    views={['year', 'month', 'day']}
                    value={fundId?.FromDate}
                    onChange={(value) => SecPriceInputOnValueChanged('FromDate', dateUtils.stringWithFormat(value, 'yyyy-MM-DDTHH:mm:ssZ'))}
                />
                <DatePicker
                    name="EndDate"
                    xs={3}
                    label={translate('End date')}
                    views={['year', 'month', 'day']}
                    value={fundId?.ToDate}
                    onChange={(value) => SecPriceInputOnValueChanged('EndDate', dateUtils.stringWithFormat(value, 'yyyy-MM-DDTHH:mm:ssZ'))}
                />
                <Button
                    xs={2}
                    variant="outlined"
                    startIcon={translate('Get prices')}
                    onClick={() => {
                        if (fundId.FundCode) {
                            getSecPriceList();
                        }
                        else {
                            return enqueueWarning(translate('Fund code is required'), { autoHideDuration: 3000 });
                        }
                    }}
                ></Button>
                <DataGrid
                    name="Issuer Grid"
                    dataSource={dataSource}
                    columns={columns}
                    actionList={gridActionList}
                />
            </Card>
        </BasePage>
    );
};

SecurityPriceList.displayName = 'Security Price List';

export default withFormPage(SecurityPriceList, { uiMetadata });
