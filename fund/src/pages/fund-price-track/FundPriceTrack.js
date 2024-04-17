import React, { useCallback, useEffect, useState } from 'react';

import {
  colorUtils,
  dateUtils,
  getThemeSource,
  themes,
  useFiProxy,
  useTheme,
  useTranslation,
  useSnackbar,

} from 'component/base';
import { ChartWidget, withPage, BasePage, SelectEnum, Card, Select, Button } from 'component/ui';
import { apiUrls, moduleScopeKeys } from '../../constants';

const uiMetadata = {
  moduleName: 'fund',
  uiKey: 'ub57af0c498',
};

const FundPriceTrack = () => {
  const { executeGet } = useFiProxy();
  const { translate } = useTranslation();
  const { themeID, isDarkMode, isRTL } = useTheme();
  const [customerData, setCustomerData] = useState({});
  const [currentFundList, setcurrentFundList] = useState([]);
  const { enqueueWarning } = useSnackbar();
  const [dataLoaded, setDataLoaded] = useState(false);
  const theme = getThemeSource(themeID, themes, isDarkMode, isRTL);
  const [firstFundChartData, setFirstFundChartData] = useState({});
  const [secondFundChartData, setSecondFundChartData] = useState({});

  useEffect(() => {
    if (!currentFundList || currentFundList.length == 0) {
      getCurrentFunds();
    }
  }, []);
 
  const getCurrentFunds = () => {
    executeGet({ url: apiUrls.fundAndPriceListApi }).then((response) => {
      if (response.Success) {
        setcurrentFundList(response.Value);
      }
    });
  };

  const customerDataOnValueChanged = (field, value) => {
    setCustomerData({ ...customerData, [field]: value });
  };

  const getChartData = (params,setFetchData) =>{
    executeGet({
      url: apiUrls.fundSecurityPriceChartByDatePartApi, params
    }).then((response) => {
      if (response.Success) {
        const data = {
          labels: [],
          datasets: [],
        };
        const valueList = [];
        response.Value.forEach((countItem, index) => {
          data.labels.push(dateUtils.stringWithFormat(countItem.PriceDate, 'yyyy-MM-DD'));
          valueList.push(parseInt(countItem.UnitPrice));
        });

        data.datasets.push({
          fill: true,
          label: translate('Unit price history'),
          data: valueList,
          borderColor: theme.palette.chart.red,
          backgroundColor: colorUtils.alpha(theme.palette.chart.blue, 0.5),
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 10,
          cubicInterpolationMode: 'monotone',
        });
        setFetchData(data);
        setDataLoaded(true);
      }
    });
    
  };

  const getLoanChartData = () => {
    if (!customerData.FirstFundDefinitionId || !customerData.SecondFundDefinitionId || !customerData.DatePart) {
      return enqueueWarning(translate('DatePart or fund required'), { autoHideDuration: 3000 });
    }
    if(customerData.FirstFundDefinitionId == customerData.SecondFundDefinitionId){
      return enqueueWarning(translate('Selected funds cannot be same'), { autoHideDuration: 3000 });
    }
    let firstFundParams = {
      FundDefinitionId: customerData.FirstFundDefinitionId,
      DatePart: customerData.DatePart
    }
    
    let secondFundParams = {
      FundDefinitionId: customerData.SecondFundDefinitionId,
      DatePart: customerData.DatePart
    }

    getChartData(firstFundParams,setFirstFundChartData);
    getChartData(secondFundParams,setSecondFundChartData);
  };

  const FirstFundRenderChart = useCallback(() => {
    return (
      <ChartWidget
        chartType="line"
        title={translate('Prices by date')}
        titleStyle={{
          color: theme.palette.heading.red,
          fontWeight: 500,
        }}
        dataSource={firstFundChartData}
        scopeKey={moduleScopeKeys.View_Fund}
      />
    );
  }, [firstFundChartData]);

  const SecondFundRenderChart = useCallback(() => {
    return (
      <ChartWidget
        chartType="line"
        title={translate('Prices by date')}
        titleStyle={{
          color: theme.palette.heading.red,
          fontWeight: 500,
        }}
        dataSource={secondFundChartData}
        scopeKey={moduleScopeKeys.View_Fund}
      />
    );
  }, [secondFundChartData]);
 
  return <BasePage>
    <Card
        scopeKey={moduleScopeKeys.View_Fund}
    >
      <SelectEnum
        xs={3}
        enumName="DatePart"
        name="DatePart"
        required
        label={translate('Date part')}
        value={customerData?.DatePart}
        columns={['Name']}
        valuePath={'Code'}
        onChange={(value) => customerDataOnValueChanged('DatePart', value)}
      />

      <Select
        name="FirstFundDefinitionId"
        xs={3}
        required
        label={translate('First fund')}
        datasource={currentFundList}
        onChange={(value) => customerDataOnValueChanged('FirstFundDefinitionId', value)}
        columns={['FundCode']}
        valuePath={'Id'}
        value={customerData.FirstFundDefinitionId}
      />
      <Select
        name="SecondFundDefinitionId"
        xs={3}
        required
        label={translate('Second fund')}
        datasource={currentFundList}
        onChange={(value) => customerDataOnValueChanged('SecondFundDefinitionId', value)}
        columns={['FundCode']}
        valuePath={'Id'}
        value={customerData.SecondFundDefinitionId}
      />
      <Button
        name="FundPricesChart"
        xs={2}
        variant="outlined"
        startIcon={translate('Get fund prices')}
        onClick={() => {
          getLoanChartData();
        }}
      ></Button>
    </Card>

    {dataLoaded && (
  <>
    <FirstFundRenderChart />
    <SecondFundRenderChart />
  </>
)}
  </BasePage>
};

FundPriceTrack.displayName = 'FundPriceTrackChart';

export default withPage(FundPriceTrack, { uiMetadata });
