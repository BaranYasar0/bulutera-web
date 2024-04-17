export const SampleEnum = [
  { Id: 0, Code: 'Code0', Name: 'Code 0' },
  { Id: 1, Code: 'Code1', Name: 'Code 1' },
  { Id: 2, Code: 'Code2', Name: 'Code 2' },
  { Id: 3, Code: 'Code3', Name: 'Code 3' },
  { Id: 4, Code: 'Code4', Name: 'Code 4' },
];

export const RecordStatus = [
  {
    Value: 1,
    Name: 'Aktif',
    Code: 'Active',
  },
  {
    Code: 'Passive',
    Value: 0,
    Name: 'Passive',
  }
];

export const OrderStatus = [
  {
    Code: 'Completed',
    Value: 1,
    Name: 'Completed',
  },
  {
    Code: 'AccoutingDate',
    Value: 2,
    Name: 'Pending for accounting',
  },
  {
    Code: 'PendingForValueDate',
    Value: 3,
    Name: 'Pending for value date',
  },
  {
    Code: 'ProcessDate',
    Value: 4,
    Name: 'Pending for process date',
  },
  {
    Code: 'CompletedWithError',
    Value: 5,
    Name: 'Completed with error',
  },
  {
    Code: 'Tefas',
    Value: 6,
    Name: 'Pending for tefas',
  },
  {
    Code: 'Cancelled',
    Value: 7,
    Name: 'Cancelled',
  },
];

export const OrderType = [
  {
    Code: 'Buying',
    Value: 1,
    Name: 'Fund buying',
  },
  {
    Code: 'Selling',
    Value: 2,
    Name: 'Fund selling',
  },
  {
    Code: 'BuyingIntoBankStock',
    Value: 3,
    Name: 'Fund buying into bank stock',
  },
  {
    Code: 'SellingFromBankStock',
    Value: 4,
    Name: 'Fund selling from bank stock',
  },
  {
    Code: 'ExchangeBuying',
    Value: 5,
    Name: 'Fund exchange buying',
  },
  {
    Code: 'ExchangeSelling',
    Value: 6,
    Name: 'Fund exchange selling',
  },
  {
    Code: 'ExchangeSignature',
    Value: 7,
    Name: 'Fund exchange signature',
  },
  {
    Code: 'PublicOffering',
    Value: 8,
    Name: 'Public offering',
  },
  {
    Code: 'PublicOfferEarlyBuying',
    Value: 9,
    Name: 'Public offer early buying',
  },
  {
    Code: 'PublicOfferRedemption',
    Value: 10,
    Name: 'Public offer redemption',
  },
  {
    Code: 'TrustFundBuying',
    Value: 10,
    Name: 'Trust fund buying',
  },
  {
    Code: 'TrustFundSelling',
    Value: 10,
    Name: 'Trust fund selling',
  },
  {
    Code: 'TefasFundBuying',
    Value: 10,
    Name: 'Tefas fund buying',
  },
  {
    Code: 'TefasFundSelling',
    Value: 10,
    Name: 'Tefas fund selling',
  },
];

export const ChannelType = [
  { Code: 'EOD', Value: 1, Name: 'EOD' },
  { Code: 'Branch', Value: 2, Name: 'Branch' },
  { Code: 'HeadQuarter', Value: 3, Name: 'Head quarter' },
  { Code: 'Internet', Value: 4, Name: 'Internet' },
  { Code: 'Mobile', Value: 5, Name: 'Mobile' },
  { Code: 'IVR', Value: 6, Name: 'IVR' },
  { Code: 'CallCenter', Value: 7, Name: 'Call center' },
  { Code: 'POS', Value: 8, Name: 'POS' },
  { Code: 'ATM', Value: 9, Name: 'ATM' },
  { Code: 'InternetSite', Value: 10, Name: 'Internet site' },
  { Code: 'Tablet', Value: 11, Name: 'Tablet' },
  { Code: 'DirectApiForTesting', Value: 12, Name: 'Direct api for testing' },
];

export const CorporationType = [
  { Code: 'BNK', Value: 1, Name: 'Banks' },
  { Code: 'Treasury', Value: 2, Name: 'Treasury' },
  { Code: 'PrivateSector', Value: 3, Name: 'PrivateSector' },

];

export const FundType = [
  { Code: 'A', Value: 1, Name: 'A' },
  { Code: 'B', Value: 2, Name: 'B' },
];

export const KindOfFund = [
  { Code: 'DebtFund', Value: 1, Name: 'Debt Instruments Umbrella Fund' },
  { Code: 'VariableFund', Value: 2, Name: 'Variable Fund' },
  { Code: 'MoneyMarket', Value: 3, Name: 'Money Market Umbrella Fund' },
  { Code: 'StockFund', Value: 4, Name: 'Stock Umbrella Fund' },
];

export const BasisGroup = [
  { Code: 'Fund', Value: 1, Name: 'Fund Group' },
  { Code: 'Interest', Value: 1, Name: 'Interest Group' },
];

export const CurrencyCodes = [
  { Id: 949, Code: 'TRY', Name: 'Turkish lira', Symbol: '₺' },
  { Id: 826, Code: 'GBP', Name: 'İngiliz Sterlini', Symbol: '£' },
  { Id: 840, Code: 'USD', Name: 'Amerikan Doları', Symbol: '$' },
  { Id: 978, Code: 'EUR', Name: 'Avrupa Birliği', Symbol: '€' },
];

export const CountryCodes = [
  { Id: 792, Code: 'TUR', Name: 'Turkey' },
  { Id: 826, Code: 'GBR', Name: 'United Kingdom' },
  { Id: 840, Code: 'USA', Name: 'United States of America' },
];
