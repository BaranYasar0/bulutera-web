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
    dataGridColumnTypes
} from 'component/ui';

import {
    apiUrls,
    CorporationType,
    CountryCodes,
    moduleScopeKeys,
    RecordStatus
} from '../../constants';

import {
    IssuerDefinition
} from '../issuer-definition';

const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'u94caed2091',
    dialogSize: 'md'
};

const IssuerList = (props) => {
    const filterRef = React.useRef();
    const { showDialog } = useFormManagerContext();
    const { translate } = useTranslation();
    const { executeGet } = useFiProxy();

    const [dataSource, setDataSource] = useState([]);
    const [filter] = useState({
        Active: true,
    });

    useEffect(() => {
        getDataSource(filter);
    }, []);

    const getDataSource = (data, reset) => {
        if (reset) {
            setDataSource([]);
        }
        let filterDataParams = data ? data : filterRef.current.filter();
        let params = {
            ...filterDataParams
            
        }
        executeGet({ url: apiUrls.issuerListApi, params,setStateDelegate: setDataSource })
    }

    const columns = useMemo(
        () => [
            {
                name: 'Id',
                header: 'Id',
                visible: false
            },
            {
                name: 'CorporationCode',
                header: translate('Corporation code'),
                defaultFlex: 1,
            },
            {
                name: 'CorporationName',
                header: translate('Corporation name'),
                defaultFlex: 1,
            },
            {
                name: 'CorporationType',
                header: translate('Corporation type'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource: CorporationType,
                    enumName: 'CorporationType',
                    valuePath: 'Code',
                    labelPath: 'Name',
                },
            },
            {
                name: 'CountryCode',
                header: translate('Country code'),
                type: dataGridColumnTypes.enum,
                options: {
                    dataSource: CountryCodes,
                    enumName: 'CountryCodes',
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
                name: 'IsDomestic',
                header: translate('Is domestic'),
                defaultFlex: 1,
            },
            {
                name: 'UpdatingChannelCode',
                header: translate('Updating channel code'),
                defaultFlex: 1,
            },
            {
                name: 'UpdatingTranCode',
                header: translate('Updating tran code'),
                defaultFlex: 1,
            },
            {
                name: 'IssuerLimit',
                header: translate('Issuer limit'),
                defaultFlex: 1,
            },

        ],
        []
    );

    const addScreenNameClicked = useCallback(
        () => {
            showDialog({
                title: translate('Add'),
                content: (
                    < IssuerDefinition
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
                    < IssuerDefinition
                        uniqIssuerId={data.Id}
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
IssuerList.displayName = 'Issuer List';

export default withFormPage(IssuerList, { uiMetadata });
