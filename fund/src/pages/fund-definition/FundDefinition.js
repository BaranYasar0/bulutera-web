import React, { useEffect, useState, useCallback } from 'react';

import {
    useFiProxy,
    useTranslation,
    useTransactionContext,
    useFormManagerContext,
}
    from 'component/base';

import {
    BasePage,
    Card,
    withFormPage,
    Button,
} from 'component/ui';

import {
    apiUrls,
    moduleScopeKeys,
} from '../../constants';

import FundDefinitionCard from './FundDefinitionCard';
import FundDailyDefinition from './FundDailyDefinition';
import FundShareDefinition from './FundShareDefinition';
import FundDetailDefinition from './FundDetailDefinition';

const uiMetadata = {
    moduleName: 'fund',
    uiKey: 'udc683e0c45',
    dialogSize: 'md'
};

const FundDefinition = (props) => {
    const { close, isBpm, uniqFundModel, ...rest } = props;
    const nameMLRef = React.createRef();

    const { translate } = useTranslation();
    const { transactionData } = useTransactionContext();
    const { executeGet, executePost, executePut } = useFiProxy();
    const [IssuerCorpList, setIssuerCorpList] = useState([]);
    const { showDialog } = useFormManagerContext();

    const [fundDefProperties, setScreenName] = useState({});
    const [fundDefCardProps, setFundCard] = useState({});
    const [fundDailyProps, setFundDaily] = useState({});
    const [fundShareProps, setFundShare] = useState({});
    const [fundDetailProps, setFundDetail] = useState({});



    useEffect(() => {
        uniqFundModel && getScreenName(uniqFundModel);
        if (!IssuerCorpList || IssuerCorpList.length == 0) {
            getIssuerCorpList();
        }
    }, []);

    useEffect(() => {
        if (transactionData && transactionData.payload) {
            filledState(transactionData.payload);
        }
        else if (transactionData &&
            !transactionData.payload &&
            transactionData.actionArguments &&
            transactionData.actionArguments.Id > 0) {
            getScreenName(transactionData.actionArguments.Id);
        }
    }, [transactionData]);

    const filledState = (dataContract) => {
        if (dataContract) {
            setScreenName(dataContract);
        }
    }
    const filledFundCardState = (dataContract) => {
        if (dataContract) {
            setFundCard(dataContract);
        }
    }
    const getIssuerCorpList = () => {
        executeGet({ url: apiUrls.issuerListApi }).then((response) => {
            if (response.Success) {
                setIssuerCorpList(response.Value);
            }
        });
    };
    const getScreenName = (uniqFundModel) => {
        const apiUrl = apiUrls.fundGetById + uniqFundModel.Id;
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

    const onActionClick = (action) => {
        if (action.commandName === 'Save') {
            const tempObj = { ...fundDefCardProps, ...fundDailyProps, ...fundShareProps, ...fundDetailProps };
            setScreenName(tempObj);
            const nameML = nameMLRef?.current?.value;

            if (uniqFundModel) {
                const apiUrl = apiUrls.fundUpdateApi + uniqFundModel.Id
                executePut({
                    url: apiUrl,
                    data: {
                        ...tempObj,
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
                    url: apiUrls.fundCreateApi,
                    data: {
                        ...tempObj,
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
    const fundDefCard = useCallback(() => {

        showDialog({
            title: `${translate('Fund definition')}`,
            content: (
                <FundDefinitionCard
                    fundDefList={uniqFundModel || fundDefCardProps}
                    issuerCorpList={IssuerCorpList}
                    onFundCardChange={(newfundDefProperties) => {
                        filledFundCardState(newfundDefProperties);
                    }}
                />
            )
            ,
            callback: () => {
            },
        });
    })

    const FundDailyCard = useCallback(() => {
        showDialog({
            title: `${translate('Fund daily definition')}`,
            content: (
                <FundDailyDefinition
                    fundDefList={uniqFundModel || fundDailyProps}
                    onFundCardChange={(newfundDefProperties) => {
                        setFundDaily(newfundDefProperties);
                    }}
                />
            )
        });
    })

    const fundShareDef = useCallback(() => {
        showDialog({
            title: `${translate('Fund share definition')}`,
            content: (
                <FundShareDefinition
                    fundDefList={uniqFundModel || fundShareProps}
                    onFundCardChange={(newfundDefProperties) => {
                        setFundShare(newfundDefProperties);
                    }}
                />

            )
        });
    })

    const fundDetailDef = useCallback(() => {
        showDialog({
            title: `${translate('Fund detail definition')}`,
            content: (
                <FundDetailDefinition
                    fundDefList={uniqFundModel || fundDetailProps}
                    onFundCardChange={(newfundDefProperties) => {
                        setFundDetail(newfundDefProperties);
                    }}
                />
            )
        });
    })


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
                showHeader
                xs={12}
                scopeKey={moduleScopeKeys.Create_Fund}
            >
                <Button
                    name="Fund Definition"
                    xs={3}
                    variant="outlined"
                    startIcon={translate('Fund definition')}
                    onClick={() => {
                        fundDefCard();
                    }}
                ></Button>

                <Button
                    name="Fund Daily Definition"
                    xs={3}
                    variant="outlined"
                    startIcon={translate('Fund daily definition')}
                    onClick={() => {
                        FundDailyCard();
                    }}
                ></Button>
                <Button
                    name="Fund Share Definition"
                    xs={3}
                    variant="outlined"
                    startIcon={translate('Fund share definition')}
                    onClick={() => {
                        fundShareDef();
                    }}
                ></Button>
                <Button
                    name="Fund Detail Definition"
                    xs={3}
                    variant="outlined"
                    startIcon={translate('Fund detail definition')}
                    onClick={() => {
                        fundDetailDef();
                    }}
                ></Button>

            </Card>

        </BasePage >
    )

};

export default withFormPage(FundDefinition, { uiMetadata });
