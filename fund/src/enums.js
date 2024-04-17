const enums = {
    BasisGroup: {
        Fund: {
            Code: 'Fund',
            Value: 1,
            Name: 'Fund Group',
        },
        Interest: {
            Code: 'Interest',
            Value: 2,
            Name: 'Interest Group',
        }
    },
    CorporationType: {
        Bank: {
            Code: 'BNK',
            Value: 1,
            Name: 'Banks'
        },
        Treasury: {
            Code: 'HZN',
            Value: 2,
            Name: 'Treasure'
        },
        PrivateSector: {
            Code: 'OZS',
            Value: 3,
            Name: 'Private Sector'
        }
    },
    KindOfFund: {
        DebtFund: {
            Code: 'DebtFund',
            Value: 1,
            Name: 'Debt Securities Umbrella Fund'
        },
        DF: {
            Code: 'VariableFund',
            Value: 2,
            Name: 'Variable Fund'
        },
        PPSF: {
            Code: 'MoneyMarket',
            Value: 3,
            Name: 'Money Market Umbrella Fund'
        },
        HSSF: {
            Code: 'StockFund',
            Value: 4,
            Name: 'Equity Umbrella Fund'
        }
    },
    FundType: {
        A: {
            Code: 'A',
            Value: 1,
            Name: 'A',
        },
        B: {
            Code: 'B',
            Value: 2,
            Name: 'B',
        }
    },
    DatePart: {
        Day: {
            Code: 'Day',
            Value: 1,
            Name: 'Day',
        },
        Month: {
            Code: 'Month',
            Value: 2,
            Name: 'Month',
        },
        Year: {
            Code: 'Year',
            Value: 3,
            Name: 'Year',
        },
        Week: {
            Code: 'Week',
            Value: 4,
            Name: 'Week',
        }
    },
    RecordStatus: {
        ACTIVE: {
            Code: 'Active',
            Value: 1,
            Name: 'Active',
        },
        PASSIVE: {
            Code: 'Passive',
            Value: 2,
            Name: 'Passive',
        }
    },
    OrderStatus: {
        OK: {
            Code: 'Completed',
            Value: 1,
            Name: 'Completed',
        },
        MB: {
            Code: 'AccoutingDate',
            Value: 2,
            Name: 'Pending for accounting',
        },
        VTB: {
            Code: 'ValueDate',
            Value: 3,
            Name: 'Pending for value data',
        },
        ITB: {
            Code: 'ProcessDate',
            Value: 4,
            Name: 'Pending for process date',
        },
        HATA: {
            Code: 'CompletedWithError',
            Value: 5,
            Name: 'Completed with error',
        },
        TSB: {
            Code: 'Tefas',
            Value: 6,
            Name: 'Pending for tefas',
        },
        IPT: {
            Code: 'Cancelled',
            Value: 7,
            Name: 'Cancelled',
        },
    },
    OrderType: {
        FA: {
            Code: 'FA',
            Value: 1,
            Name: 'Fund buying',
        },
        FS: {
            Code: 'FS',
            Value: 2,
            Name: 'Fund selling',
        },
        BSA: {
            Code: 'BSA',
            Value: 3,
            Name: 'Fund buying into bank stock',
        },
        BSS: {
            Code: 'BSS',
            Value: 4,
            Name: 'Fund selling from bank stock',
        },
    },
    ISOCountryCodes: {
        AFG: {
            Code: 'AFG',
            Value: 4,
            Name: 'Afghanistan',
        },
        ALB: {
            Code: 'ALB',
            Value: 8,
            Name: 'Albania',
        },
        ATA: {
            Code: 'ATA',
            Value: 10,
            Name: 'Antarctica',
        },
        DZA: {
            Code: 'DZA',
            Value: 12,
            Name: 'Algeria',
        },
        ASM: {
            Code: 'ASM',
            Value: 16,
            Name: 'American Samoa',
        },
        AND: {
            Code: 'AND',
            Value: 20,
            Name: 'Andorra',
        },
        AGO: {
            Code: 'AGO',
            Value: 24,
            Name: 'Angola',
        },
        ATG: {
            Code: 'ATG',
            Value: 28,
            Name: 'Antigua and Barbuda',
        },
        AZE: {
            Code: 'AZE',
            Value: 31,
            Name: 'Azerbaijan',
        },
        ARG: {
            Code: 'ARG',
            Value: 32,
            Name: 'Argentina',
        },
        AUS: {
            Code: 'AUS',
            Value: 36,
            Name: 'Australia',
        },
        AUT: {
            Code: 'AUT',
            Value: 40,
            Name: 'Austria',
        },
        BHS: {
            Code: 'BHS',
            Value: 44,
            Name: 'Bahamas (the)',
        },
        BHR: {
            Code: 'BHR',
            Value: 48,
            Name: 'Bahrain',
        },
        BGD: {
            Code: 'BGD',
            Value: 50,
            Name: 'Bangladesh',
        },
        ARM: {
            Code: 'ARM',
            Value: 51,
            Name: 'Armenia',
        },
        BRB: {
            Code: 'BRB',
            Value: 52,
            Name: 'Barbados',
        },
        BEL: {
            Code: 'BEL',
            Value: 56,
            Name: 'Belgium',
        },
        BMU: {
            Code: 'BMU',
            Value: 60,
            Name: 'Bermuda',
        },
        BTN: {
            Code: 'BTN',
            Value: 64,
            Name: 'Bhutan',
        },
        BOL: {
            Code: 'BOL',
            Value: 68,
            Name: 'Bolivia (Plurinational State of)',
        },
        BIH: {
            Code: 'BIH',
            Value: 70,
            Name: 'Bosnia and Herzegovina',
        },
        BWA: {
            Code: 'BWA',
            Value: 72,
            Name: 'Botswana',
        },
        BVT: {
            Code: 'BVT',
            Value: 74,
            Name: 'Bouvet Island',
        },
        BRA: {
            Code: 'BRA',
            Value: 76,
            Name: 'Brazil',
        },
        BLZ: {
            Code: 'BLZ',
            Value: 84,
            Name: 'Belize',
        },
        IOT: {
            Code: 'IOT',
            Value: 86,
            Name: 'British Indian Ocean Territory (the)',
        },
        SLB: {
            Code: 'SLB',
            Value: 90,
            Name: 'Solomon Islands',
        },
        VGB: {
            Code: 'VGB',
            Value: 92,
            Name: 'Virgin Islands (British)',
        },
        BRN: {
            Code: 'BRN',
            Value: 96,
            Name: 'Brunei Darussalam',
        },
        BGR: {
            Code: 'BGR',
            Value: 100,
            Name: 'Bulgaria',
        },
        MMR: {
            Code: 'MMR',
            Value: 104,
            Name: 'Myanmar',
        },
        BDI: {
            Code: 'BDI',
            Value: 108,
            Name: 'Burundi',
        },
        BLR: {
            Code: 'BLR',
            Value: 112,
            Name: 'Belarus',
        },
        KHM: {
            Code: 'KHM',
            Value: 116,
            Name: 'Cambodia',
        },
        CMR: {
            Code: 'CMR',
            Value: 120,
            Name: 'Cameroon',
        },
        CAN: {
            Code: 'CAN',
            Value: 124,
            Name: 'Canada',
        },
        CPV: {
            Code: 'CPV',
            Value: 132,
            Name: 'Cabo Verde',
        },
        CYM: {
            Code: 'CYM',
            Value: 136,
            Name: 'Cayman Islands (the)',
        },
        CAF: {
            Code: 'CAF',
            Value: 140,
            Name: 'Central African Republic (the)',
        },
        LKA: {
            Code: 'LKA',
            Value: 144,
            Name: 'Sri Lanka',
        },
        TCD: {
            Code: 'TCD',
            Value: 148,
            Name: 'Chad',
        },
        CHL: {
            Code: 'CHL',
            Value: 152,
            Name: 'Chile',
        },
        CHN: {
            Code: 'CHN',
            Value: 156,
            Name: 'China',
        },
        TWN: {
            Code: 'TWN',
            Value: 158,
            Name: 'Taiwan (Province of China)',
        },
        CXR: {
            Code: 'CXR',
            Value: 162,
            Name: 'Christmas Island',
        },
        CCK: {
            Code: 'CCK',
            Value: 166,
            Name: 'Cocos (Keeling) Islands (the)',
        },
        COL: {
            Code: 'COL',
            Value: 170,
            Name: 'Colombia',
        },
        COM: {
            Code: 'COM',
            Value: 174,
            Name: 'Comoros (the)',
        },
        MYT: {
            Code: 'MYT',
            Value: 175,
            Name: 'Mayotte',
        },
        COG: {
            Code: 'COG',
            Value: 178,
            Name: 'Congo (the)',
        },
        COD: {
            Code: 'COD',
            Value: 180,
            Name: 'Congo (the Democratic Republic of the)',
        },
        COK: {
            Code: 'COK',
            Value: 184,
            Name: 'Cook Islands (the)',
        },
        CRI: {
            Code: 'CRI',
            Value: 188,
            Name: 'Costa Rica',
        },
        HRV: {
            Code: 'HRV',
            Value: 191,
            Name: 'Croatia',
        },
        CUB: {
            Code: 'CUB',
            Value: 192,
            Name: 'Cuba',
        },
        CYP: {
            Code: 'CYP',
            Value: 196,
            Name: 'Cyprus',
        },
        CZE: {
            Code: 'CZE',
            Value: 203,
            Name: 'Czechia',
        },
        BEN: {
            Code: 'BEN',
            Value: 204,
            Name: 'Benin',
        },
        DNK: {
            Code: 'DNK',
            Value: 208,
            Name: 'Denmark',
        },
        DMA: {
            Code: 'DMA',
            Value: 212,
            Name: 'Dominica',
        },
        DOM: {
            Code: 'DOM',
            Value: 214,
            Name: 'Dominican Republic (the)',
        },
        ECU: {
            Code: 'ECU',
            Value: 218,
            Name: 'Ecuador',
        },
        SLV: {
            Code: 'SLV',
            Value: 222,
            Name: 'El Salvador',
        },
        GNQ: {
            Code: 'GNQ',
            Value: 226,
            Name: 'Equatorial Guinea',
        },
        ETH: {
            Code: 'ETH',
            Value: 231,
            Name: 'Ethiopia',
        },
        ERI: {
            Code: 'ERI',
            Value: 232,
            Name: 'Eritrea',
        },
        EST: {
            Code: 'EST',
            Value: 233,
            Name: 'Estonia',
        },
        FRO: {
            Code: 'FRO',
            Value: 234,
            Name: 'Faroe Islands (the)',
        },
        FLK: {
            Code: 'FLK',
            Value: 238,
            Name: 'Falkland Islands (the) [Malvinas]',
        },
        SGS: {
            Code: 'SGS',
            Value: 239,
            Name: 'South Georgia and the South Sandwich Islands',
        },
        FJI: {
            Code: 'FJI',
            Value: 242,
            Name: 'Fiji',
        },
        FIN: {
            Code: 'FIN',
            Value: 246,
            Name: 'Finland',
        },
        ALA: {
            Code: 'ALA',
            Value: 248,
            Name: 'Åland Islands',
        },
        FRA: {
            Code: 'FRA',
            Value: 250,
            Name: 'France',
        },
        GUF: {
            Code: 'GUF',
            Value: 254,
            Name: 'French Guiana',
        },
        PYF: {
            Code: 'PYF',
            Value: 258,
            Name: 'French Polynesia',
        },
        ATF: {
            Code: 'ATF',
            Value: 260,
            Name: 'French Southern Territories (the)',
        },
        DJI: {
            Code: 'DJI',
            Value: 262,
            Name: 'Djibouti',
        },
        GAB: {
            Code: 'GAB',
            Value: 266,
            Name: 'Gabon',
        },
        GEO: {
            Code: 'GEO',
            Value: 268,
            Name: 'Georgia',
        },
        GMB: {
            Code: 'GMB',
            Value: 270,
            Name: 'Gambia (the)',
        },
        PSE: {
            Code: 'PSE',
            Value: 275,
            Name: 'Palestine, State of',
        },
        DEU: {
            Code: 'DEU',
            Value: 276,
            Name: 'Germany',
        },
        GHA: {
            Code: 'GHA',
            Value: 288,
            Name: 'Ghana',
        },
        GIB: {
            Code: 'GIB',
            Value: 292,
            Name: 'Gibraltar',
        },
        KIR: {
            Code: 'KIR',
            Value: 296,
            Name: 'Kiribati',
        },
        GRC: {
            Code: 'GRC',
            Value: 300,
            Name: 'Greece',
        },
        GRL: {
            Code: 'GRL',
            Value: 304,
            Name: 'Greenland',
        },
        GRD: {
            Code: 'GRD',
            Value: 308,
            Name: 'Grenada',
        },
        GLP: {
            Code: 'GLP',
            Value: 312,
            Name: 'Guadeloupe',
        },
        GUM: {
            Code: 'GUM',
            Value: 316,
            Name: 'Guam',
        },
        GTM: {
            Code: 'GTM',
            Value: 320,
            Name: 'Guatemala',
        },
        GIN: {
            Code: 'GIN',
            Value: 324,
            Name: 'Guinea',
        },
        GUY: {
            Code: 'GUY',
            Value: 328,
            Name: 'Guyana',
        },
        HTI: {
            Code: 'HTI',
            Value: 332,
            Name: 'Haiti',
        },
        HMD: {
            Code: 'HMD',
            Value: 334,
            Name: 'Heard Island and McDonald Islands',
        },
        VAT: {
            Code: 'VAT',
            Value: 336,
            Name: 'Holy See (the)',
        },
        HND: {
            Code: 'HND',
            Value: 340,
            Name: 'Honduras',
        },
        HKG: {
            Code: 'HKG',
            Value: 344,
            Name: 'Hong Kong',
        },
        HUN: {
            Code: 'HUN',
            Value: 348,
            Name: 'Hungary',
        },
        ISL: {
            Code: 'ISL',
            Value: 352,
            Name: 'Iceland',
        },
        IND: {
            Code: 'IND',
            Value: 356,
            Name: 'India',
        },
        IDN: {
            Code: 'IDN',
            Value: 360,
            Name: 'Indonesia',
        },
        IRN: {
            Code: 'IRN',
            Value: 364,
            Name: 'Iran (Islamic Republic of)',
        },
        IRQ: {
            Code: 'IRQ',
            Value: 368,
            Name: 'Iraq',
        },
        IRL: {
            Code: 'IRL',
            Value: 372,
            Name: 'Ireland',
        },
        ISR: {
            Code: 'ISR',
            Value: 376,
            Name: 'Israel',
        },
        ITA: {
            Code: 'ITA',
            Value: 380,
            Name: 'Italy',
        },
        CIV: {
            Code: 'CIV',
            Value: 384,
            Name: "Côte d'Ivoire",
        },
        JAM: {
            Code: 'JAM',
            Value: 388,
            Name: 'Jamaica',
        },
        JPN: {
            Code: 'JPN',
            Value: 392,
            Name: 'Japan',
        },
        KAZ: {
            Code: 'KAZ',
            Value: 398,
            Name: 'Kazakhstan',
        },
        JOR: {
            Code: 'JOR',
            Value: 400,
            Name: 'Jordan',
        },
        KEN: {
            Code: 'KEN',
            Value: 404,
            Name: 'Kenya',
        },
        PRK: {
            Code: 'PRK',
            Value: 408,
            Name: "Korea (the Democratic People's Republic of)",
        },
        KOR: {
            Code: 'KOR',
            Value: 410,
            Name: 'Korea (the Republic of)',
        },
        KWT: {
            Code: 'KWT',
            Value: 414,
            Name: 'Kuwait',
        },
        KGZ: {
            Code: 'KGZ',
            Value: 417,
            Name: 'Kyrgyzstan',
        },
        LAO: {
            Code: 'LAO',
            Value: 418,
            Name: "Lao People's Democratic Republic (the)",
        },
        LBN: {
            Code: 'LBN',
            Value: 422,
            Name: 'Lebanon',
        },
        LSO: {
            Code: 'LSO',
            Value: 426,
            Name: 'Lesotho',
        },
        LVA: {
            Code: 'LVA',
            Value: 428,
            Name: 'Latvia',
        },
        LBR: {
            Code: 'LBR',
            Value: 430,
            Name: 'Liberia',
        },
        LBY: {
            Code: 'LBY',
            Value: 434,
            Name: 'Libya',
        },
        LIE: {
            Code: 'LIE',
            Value: 438,
            Name: 'Liechtenstein',
        },
        LTU: {
            Code: 'LTU',
            Value: 440,
            Name: 'Lithuania',
        },
        LUX: {
            Code: 'LUX',
            Value: 442,
            Name: 'Luxembourg',
        },
        MAC: {
            Code: 'MAC',
            Value: 446,
            Name: 'Macao',
        },
        MDG: {
            Code: 'MDG',
            Value: 450,
            Name: 'Madagascar',
        },
        MWI: {
            Code: 'MWI',
            Value: 454,
            Name: 'Malawi',
        },
        MYS: {
            Code: 'MYS',
            Value: 458,
            Name: 'Malaysia',
        },
        MDV: {
            Code: 'MDV',
            Value: 462,
            Name: 'Maldives',
        },
        MLI: {
            Code: 'MLI',
            Value: 466,
            Name: 'Mali',
        },
        MLT: {
            Code: 'MLT',
            Value: 470,
            Name: 'Malta',
        },
        MTQ: {
            Code: 'MTQ',
            Value: 474,
            Name: 'Martinique',
        },
        MRT: {
            Code: 'MRT',
            Value: 478,
            Name: 'Mauritania',
        },
        MUS: {
            Code: 'MUS',
            Value: 480,
            Name: 'Mauritius',
        },
        MEX: {
            Code: 'MEX',
            Value: 484,
            Name: 'Mexico',
        },
        MCO: {
            Code: 'MCO',
            Value: 492,
            Name: 'Monaco',
        },
        MNG: {
            Code: 'MNG',
            Value: 496,
            Name: 'Mongolia',
        },
        MDA: {
            Code: 'MDA',
            Value: 498,
            Name: 'Moldova (the Republic of)',
        },
        MNE: {
            Code: 'MNE',
            Value: 499,
            Name: 'Montenegro',
        },
        MSR: {
            Code: 'MSR',
            Value: 500,
            Name: 'Montserrat',
        },
        MAR: {
            Code: 'MAR',
            Value: 504,
            Name: 'Morocco',
        },
        MOZ: {
            Code: 'MOZ',
            Value: 508,
            Name: 'Mozambique',
        },
        OMN: {
            Code: 'OMN',
            Value: 512,
            Name: 'Oman',
        },
        NAM: {
            Code: 'NAM',
            Value: 516,
            Name: 'Namibia',
        },
        NRU: {
            Code: 'NRU',
            Value: 520,
            Name: 'Nauru',
        },
        NPL: {
            Code: 'NPL',
            Value: 524,
            Name: 'Nepal',
        },
        NLD: {
            Code: 'NLD',
            Value: 528,
            Name: 'Netherlands (the)',
        },
        CUW: {
            Code: 'CUW',
            Value: 531,
            Name: 'Curaçao',
        },
        ABW: {
            Code: 'ABW',
            Value: 533,
            Name: 'Aruba',
        },
        SXM: {
            Code: 'SXM',
            Value: 534,
            Name: 'Sint Maarten (Dutch part)',
        },
        BES: {
            Code: 'BES',
            Value: 535,
            Name: 'Bonaire Sint Eustatius Saba',
        },
        NCL: {
            Code: 'NCL',
            Value: 540,
            Name: 'New Caledonia',
        },
        VUT: {
            Code: 'VUT',
            Value: 548,
            Name: 'Vanuatu',
        },
        NZL: {
            Code: 'NZL',
            Value: 554,
            Name: 'New Zealand',
        },
        NIC: {
            Code: 'NIC',
            Value: 558,
            Name: 'Nicaragua',
        },
        NER: {
            Code: 'NER',
            Value: 562,
            Name: 'Niger (the)',
        },
        NGA: {
            Code: 'NGA',
            Value: 566,
            Name: 'Nigeria',
        },
        NIU: {
            Code: 'NIU',
            Value: 570,
            Name: 'Niue',
        },
        NFK: {
            Code: 'NFK',
            Value: 574,
            Name: 'Norfolk Island',
        },
        NOR: {
            Code: 'NOR',
            Value: 578,
            Name: 'Norway',
        },
        MNP: {
            Code: 'MNP',
            Value: 580,
            Name: 'Northern Mariana Islands (the)',
        },
        UMI: {
            Code: 'UMI',
            Value: 581,
            Name: 'United States Minor Outlying Islands (the)',
        },
        FSM: {
            Code: 'FSM',
            Value: 583,
            Name: 'Micronesia (Federated States of)',
        },
        MHL: {
            Code: 'MHL',
            Value: 584,
            Name: 'Marshall Islands (the)',
        },
        PLW: {
            Code: 'PLW',
            Value: 585,
            Name: 'Palau',
        },
        PAK: {
            Code: 'PAK',
            Value: 586,
            Name: 'Pakistan',
        },
        PAN: {
            Code: 'PAN',
            Value: 591,
            Name: 'Panama',
        },
        PNG: {
            Code: 'PNG',
            Value: 598,
            Name: 'Papua New Guinea',
        },
        PRY: {
            Code: 'PRY',
            Value: 600,
            Name: 'Paraguay',
        },
        PER: {
            Code: 'PER',
            Value: 604,
            Name: 'Peru',
        },
        PHL: {
            Code: 'PHL',
            Value: 608,
            Name: 'Philippines (the)',
        },
        PCN: {
            Code: 'PCN',
            Value: 612,
            Name: 'Pitcairn',
        },
        POL: {
            Code: 'POL',
            Value: 616,
            Name: 'Poland',
        },
        PRT: {
            Code: 'PRT',
            Value: 620,
            Name: 'Portugal',
        },
        GNB: {
            Code: 'GNB',
            Value: 624,
            Name: 'Guinea-Bissau',
        },
        TLS: {
            Code: 'TLS',
            Value: 626,
            Name: 'Timor-Leste',
        },
        PRI: {
            Code: 'PRI',
            Value: 630,
            Name: 'Puerto Rico',
        },
        QAT: {
            Code: 'QAT',
            Value: 634,
            Name: 'Qatar',
        },
        REU: {
            Code: 'REU',
            Value: 638,
            Name: 'Réunion',
        },
        ROU: {
            Code: 'ROU',
            Value: 642,
            Name: 'Romania',
        },
        RUS: {
            Code: 'RUS',
            Value: 643,
            Name: 'Russian Federation (the)',
        },
        RWA: {
            Code: 'RWA',
            Value: 646,
            Name: 'Rwanda',
        },
        BLM: {
            Code: 'BLM',
            Value: 652,
            Name: 'Saint Barthélemy',
        },
        SHN: {
            Code: 'SHN',
            Value: 654,
            Name: 'Saint Helena Ascension Island Tristan da Cunha',
        },
        KNA: {
            Code: 'KNA',
            Value: 659,
            Name: 'Saint Kitts and Nevis',
        },
        AIA: {
            Code: 'AIA',
            Value: 660,
            Name: 'Anguilla',
        },
        LCA: {
            Code: 'LCA',
            Value: 662,
            Name: 'Saint Lucia',
        },
        MAF: {
            Code: 'MAF',
            Value: 663,
            Name: 'Saint Martin (French part)',
        },
        SPM: {
            Code: 'SPM',
            Value: 666,
            Name: 'Saint Pierre and Miquelon',
        },
        VCT: {
            Code: 'VCT',
            Value: 670,
            Name: 'Saint Vincent and the Grenadines',
        },
        SMR: {
            Code: 'SMR',
            Value: 674,
            Name: 'San Marino',
        },
        STP: {
            Code: 'STP',
            Value: 678,
            Name: 'Sao Tome and Principe',
        },
        SAU: {
            Code: 'SAU',
            Value: 682,
            Name: 'Saudi Arabia',
        },
        SEN: {
            Code: 'SEN',
            Value: 686,
            Name: 'Senegal',
        },
        SRB: {
            Code: 'SRB',
            Value: 688,
            Name: 'Serbia',
        },
        SYC: {
            Code: 'SYC',
            Value: 690,
            Name: 'Seychelles',
        },
        SLE: {
            Code: 'SLE',
            Value: 694,
            Name: 'Sierra Leone',
        },
        SGP: {
            Code: 'SGP',
            Value: 702,
            Name: 'Singapore',
        },
        SVK: {
            Code: 'SVK',
            Value: 703,
            Name: 'Slovakia',
        },
        VNM: {
            Code: 'VNM',
            Value: 704,
            Name: 'Viet Nam',
        },
        SVN: {
            Code: 'SVN',
            Value: 705,
            Name: 'Slovenia',
        },
        SOM: {
            Code: 'SOM',
            Value: 706,
            Name: 'Somalia',
        },
        ZAF: {
            Code: 'ZAF',
            Value: 710,
            Name: 'South Africa',
        },
        ZWE: {
            Code: 'ZWE',
            Value: 716,
            Name: 'Zimbabwe',
        },
        ESP: {
            Code: 'ESP',
            Value: 724,
            Name: 'Spain',
        },
        SSD: {
            Code: 'SSD',
            Value: 728,
            Name: 'South Sudan',
        },
        SDN: {
            Code: 'SDN',
            Value: 729,
            Name: 'Sudan (the)',
        },
        ESH: {
            Code: 'ESH',
            Value: 732,
            Name: 'Western Sahara',
        },
        SUR: {
            Code: 'SUR',
            Value: 740,
            Name: 'Suriname',
        },
        SJM: {
            Code: 'SJM',
            Value: 744,
            Name: 'Svalbard Jan Mayen',
        },
        SWZ: {
            Code: 'SWZ',
            Value: 748,
            Name: 'Eswatini',
        },
        SWE: {
            Code: 'SWE',
            Value: 752,
            Name: 'Sweden',
        },
        CHE: {
            Code: 'CHE',
            Value: 756,
            Name: 'Switzerland',
        },
        SYR: {
            Code: 'SYR',
            Value: 760,
            Name: 'Syrian Arab Republic (the)',
        },
        TJK: {
            Code: 'TJK',
            Value: 762,
            Name: 'Tajikistan',
        },
        THA: {
            Code: 'THA',
            Value: 764,
            Name: 'Thailand',
        },
        TGO: {
            Code: 'TGO',
            Value: 768,
            Name: 'Togo',
        },
        TKL: {
            Code: 'TKL',
            Value: 772,
            Name: 'Tokelau',
        },
        TON: {
            Code: 'TON',
            Value: 776,
            Name: 'Tonga',
        },
        TTO: {
            Code: 'TTO',
            Value: 780,
            Name: 'Trinidad and Tobago',
        },
        ARE: {
            Code: 'ARE',
            Value: 784,
            Name: 'United Arab Emirates (the)',
        },
        TUN: {
            Code: 'TUN',
            Value: 788,
            Name: 'Tunisia',
        },
        TUR: {
            Code: 'TUR',
            Value: 792,
            Name: 'Türkiye',
        },
        TKM: {
            Code: 'TKM',
            Value: 795,
            Name: 'Turkmenistan',
        },
        TCA: {
            Code: 'TCA',
            Value: 796,
            Name: 'Turks and Caicos Islands (the)',
        },
        TUV: {
            Code: 'TUV',
            Value: 798,
            Name: 'Tuvalu',
        },
        UGA: {
            Code: 'UGA',
            Value: 800,
            Name: 'Uganda',
        },
        UKR: {
            Code: 'UKR',
            Value: 804,
            Name: 'Ukraine',
        },
        MKD: {
            Code: 'MKD',
            Value: 807,
            Name: 'North Macedonia',
        },
        EGY: {
            Code: 'EGY',
            Value: 818,
            Name: 'Egypt',
        },
        GBR: {
            Code: 'GBR',
            Value: 826,
            Name: 'United Kingdom of Great Britain and Northern Ireland (the)',
        },
        GGY: {
            Code: 'GGY',
            Value: 831,
            Name: 'Guernsey',
        },
        JEY: {
            Code: 'JEY',
            Value: 832,
            Name: 'Jersey',
        },
        IMN: {
            Code: 'IMN',
            Value: 833,
            Name: 'Isle of Man',
        },
        TZA: {
            Code: 'TZA',
            Value: 834,
            Name: 'Tanzania, the United Republic of',
        },
        USA: {
            Code: 'USA',
            Value: 840,
            Name: 'United States of America (the)',
        },
        VIR: {
            Code: 'VIR',
            Value: 850,
            Name: 'Virgin Islands (U.S.)',
        },
        BFA: {
            Code: 'BFA',
            Value: 854,
            Name: 'Burkina Faso',
        },
        URY: {
            Code: 'URY',
            Value: 858,
            Name: 'Uruguay',
        },
        UZB: {
            Code: 'UZB',
            Value: 860,
            Name: 'Uzbekistan',
        },
        VEN: {
            Code: 'VEN',
            Value: 862,
            Name: 'Venezuela (Bolivarian Republic of)',
        },
        WLF: {
            Code: 'WLF',
            Value: 876,
            Name: 'Wallis and Futuna',
        },
        WSM: {
            Code: 'WSM',
            Value: 882,
            Name: 'Samoa',
        },
        YEM: {
            Code: 'YEM',
            Value: 887,
            Name: 'Yemen',
        },
        ZMB: {
            Code: 'ZMB',
            Value: 894,
            Name: 'Zambia',
        },
    },
    ISOCurrencyCodes: {
        ALL: {
            Code: 'ALL',
            Value: 8,
            Name: 'Albanian lek',
        },
        DZD: {
            Code: 'DZD',
            Value: 12,
            Name: 'Algerian dinar',
        },
        ARS: {
            Code: 'ARS',
            Value: 32,
            Name: 'Argentine peso',
        },
        AUD: {
            Code: 'AUD',
            Value: 36,
            Name: 'Australian dollar',
        },
        BSD: {
            Code: 'BSD',
            Value: 44,
            Name: 'Bahamian dollar',
        },
        BHD: {
            Code: 'BHD',
            Value: 48,
            Name: 'Bahraini dinar',
        },
        BDT: {
            Code: 'BDT',
            Value: 50,
            Name: 'Bangladeshi taka',
        },
        AMD: {
            Code: 'AMD',
            Value: 51,
            Name: 'Armenian dram',
        },
        BBD: {
            Code: 'BBD',
            Value: 52,
            Name: 'Barbados dollar',
        },
        BMD: {
            Code: 'BMD',
            Value: 60,
            Name: 'Bermudian dollar',
        },
        BTN: {
            Code: 'BTN',
            Value: 64,
            Name: 'Bhutanese ngultrum',
        },
        BOB: {
            Code: 'BOB',
            Value: 68,
            Name: 'Boliviano',
        },
        BWP: {
            Code: 'BWP',
            Value: 72,
            Name: 'Botswana pula',
        },
        BZD: {
            Code: 'BZD',
            Value: 84,
            Name: 'Belize dollar',
        },
        SBD: {
            Code: 'SBD',
            Value: 90,
            Name: 'Solomon Islands dollar',
        },
        BND: {
            Code: 'BND',
            Value: 96,
            Name: 'Brunei dollar',
        },
        MMK: {
            Code: 'MMK',
            Value: 104,
            Name: 'Myanmar kyat',
        },
        BIF: {
            Code: 'BIF',
            Value: 108,
            Name: 'Burundian franc',
        },
        KHR: {
            Code: 'KHR',
            Value: 116,
            Name: 'Cambodian riel',
        },
        CAD: {
            Code: 'CAD',
            Value: 124,
            Name: 'Canadian dollar',
        },
        CVE: {
            Code: 'CVE',
            Value: 132,
            Name: 'Cape Verdean escudo',
        },
        KYD: {
            Code: 'KYD',
            Value: 136,
            Name: 'Cayman Islands dollar',
        },
        LKR: {
            Code: 'LKR',
            Value: 144,
            Name: 'Sri Lankan rupee',
        },
        CLP: {
            Code: 'CLP',
            Value: 152,
            Name: 'Chilean peso',
        },
        CNY: {
            Code: 'CNY',
            Value: 156,
            Name: 'Renminbi',
        },
        COP: {
            Code: 'COP',
            Value: 170,
            Name: 'Colombian peso',
        },
        KMF: {
            Code: 'KMF',
            Value: 174,
            Name: 'Comoro franc',
        },
        CRC: {
            Code: 'CRC',
            Value: 188,
            Name: 'Costa Rican colon',
        },
        HRK: {
            Code: 'HRK',
            Value: 191,
            Name: 'Croatian kuna',
        },
        CUP: {
            Code: 'CUP',
            Value: 192,
            Name: 'Cuban peso',
        },
        CZK: {
            Code: 'CZK',
            Value: 203,
            Name: 'Czech koruna',
        },
        DKK: {
            Code: 'DKK',
            Value: 208,
            Name: 'Danish krone',
        },
        DOP: {
            Code: 'DOP',
            Value: 214,
            Name: 'Dominican peso',
        },
        SVC: {
            Code: 'SVC',
            Value: 222,
            Name: 'Salvadoran colón',
        },
        ETB: {
            Code: 'ETB',
            Value: 230,
            Name: 'Ethiopian birr',
        },
        ERN: {
            Code: 'ERN',
            Value: 232,
            Name: 'Eritrean nakfa',
        },
        FKP: {
            Code: 'FKP',
            Value: 238,
            Name: 'Falkland Islands pound',
        },
        FJD: {
            Code: 'FJD',
            Value: 242,
            Name: 'Fiji dollar',
        },
        DJF: {
            Code: 'DJF',
            Value: 262,
            Name: 'Djiboutian franc',
        },
        GMD: {
            Code: 'GMD',
            Value: 270,
            Name: 'Gambian dalasi',
        },
        GIP: {
            Code: 'GIP',
            Value: 292,
            Name: 'Gibraltar pound',
        },
        GTQ: {
            Code: 'GTQ',
            Value: 320,
            Name: 'Guatemalan quetzal',
        },
        GNF: {
            Code: 'GNF',
            Value: 324,
            Name: 'Guinean franc',
        },
        GYD: {
            Code: 'GYD',
            Value: 328,
            Name: 'Guyanese dollar',
        },
        HTG: {
            Code: 'HTG',
            Value: 332,
            Name: 'Haitian gourde',
        },
        HNL: {
            Code: 'HNL',
            Value: 340,
            Name: 'Honduran lempira',
        },
        HKD: {
            Code: 'HKD',
            Value: 344,
            Name: 'Hong Kong dollar',
        },
        HUF: {
            Code: 'HUF',
            Value: 348,
            Name: 'Hungarian forint',
        },
        ISK: {
            Code: 'ISK',
            Value: 352,
            Name: 'Icelandic króna',
        },
        INR: {
            Code: 'INR',
            Value: 356,
            Name: 'Indian rupee',
        },
        IDR: {
            Code: 'IDR',
            Value: 360,
            Name: 'Indonesian rupiah',
        },
        IRR: {
            Code: 'IRR',
            Value: 364,
            Name: 'Iranian rial',
        },
        IQD: {
            Code: 'IQD',
            Value: 368,
            Name: 'Iraqi dinar',
        },
        ILS: {
            Code: 'ILS',
            Value: 376,
            Name: 'Israeli new shekel',
        },
        JMD: {
            Code: 'JMD',
            Value: 388,
            Name: 'Jamaican dollar',
        },
        JPY: {
            Code: 'JPY',
            Value: 392,
            Name: 'Japanese yen',
        },
        KZT: {
            Code: 'KZT',
            Value: 398,
            Name: 'Kazakhstani tenge',
        },
        JOD: {
            Code: 'JOD',
            Value: 400,
            Name: 'Jordanian dinar',
        },
        KES: {
            Code: 'KES',
            Value: 404,
            Name: 'Kenyan shilling',
        },
        KPW: {
            Code: 'KPW',
            Value: 408,
            Name: 'North Korean won',
        },
        KRW: {
            Code: 'KRW',
            Value: 410,
            Name: 'South Korean won',
        },
        KWD: {
            Code: 'KWD',
            Value: 414,
            Name: 'Kuwaiti dinar',
        },
        KGS: {
            Code: 'KGS',
            Value: 417,
            Name: 'Kyrgyzstani som',
        },
        LAK: {
            Code: 'LAK',
            Value: 418,
            Name: 'Lao kip',
        },
        LBP: {
            Code: 'LBP',
            Value: 422,
            Name: 'Lebanese pound',
        },
        LSL: {
            Code: 'LSL',
            Value: 426,
            Name: 'Lesotho loti',
        },
        LRD: {
            Code: 'LRD',
            Value: 430,
            Name: 'Liberian dollar',
        },
        LYD: {
            Code: 'LYD',
            Value: 434,
            Name: 'Libyan dinar',
        },
        MOP: {
            Code: 'MOP',
            Value: 446,
            Name: 'Macanese pataca',
        },
        MWK: {
            Code: 'MWK',
            Value: 454,
            Name: 'Malawian kwacha',
        },
        MYR: {
            Code: 'MYR',
            Value: 458,
            Name: 'Malaysian ringgit',
        },
        MVR: {
            Code: 'MVR',
            Value: 462,
            Name: 'Maldivian rufiyaa',
        },
        MUR: {
            Code: 'MUR',
            Value: 480,
            Name: 'Mauritian rupee',
        },
        MXN: {
            Code: 'MXN',
            Value: 484,
            Name: 'Mexican peso',
        },
        MNT: {
            Code: 'MNT',
            Value: 496,
            Name: 'Mongolian tögrög',
        },
        MDL: {
            Code: 'MDL',
            Value: 498,
            Name: 'Moldovan leu',
        },
        MAD: {
            Code: 'MAD',
            Value: 504,
            Name: 'Moroccan dirham',
        },
        OMR: {
            Code: 'OMR',
            Value: 512,
            Name: 'Omani rial',
        },
        NAD: {
            Code: 'NAD',
            Value: 516,
            Name: 'Namibian dollar',
        },
        NPR: {
            Code: 'NPR',
            Value: 524,
            Name: 'Nepalese rupee',
        },
        ANG: {
            Code: 'ANG',
            Value: 532,
            Name: 'Netherlands Antillean guilder',
        },
        AWG: {
            Code: 'AWG',
            Value: 533,
            Name: 'Aruban florin',
        },
        VUV: {
            Code: 'VUV',
            Value: 548,
            Name: 'Vanuatu vatu',
        },
        NZD: {
            Code: 'NZD',
            Value: 554,
            Name: 'New Zealand dollar',
        },
        NIO: {
            Code: 'NIO',
            Value: 558,
            Name: 'Nicaraguan córdoba',
        },
        NGN: {
            Code: 'NGN',
            Value: 566,
            Name: 'Nigerian naira',
        },
        NOK: {
            Code: 'NOK',
            Value: 578,
            Name: 'Norwegian krone',
        },
        PKR: {
            Code: 'PKR',
            Value: 586,
            Name: 'Pakistani rupee',
        },
        PAB: {
            Code: 'PAB',
            Value: 590,
            Name: 'Panamanian balboa',
        },
        PGK: {
            Code: 'PGK',
            Value: 598,
            Name: 'Papua New Guinean kina',
        },
        PYG: {
            Code: 'PYG',
            Value: 600,
            Name: 'Paraguayan guaraní',
        },
        PEN: {
            Code: 'PEN',
            Value: 604,
            Name: 'Peruvian sol',
        },
        PHP: {
            Code: 'PHP',
            Value: 608,
            Name: 'Philippine peso',
        },
        QAR: {
            Code: 'QAR',
            Value: 634,
            Name: 'Qatari riyal',
        },
        RUB: {
            Code: 'RUB',
            Value: 643,
            Name: 'Russian ruble',
        },
        RWF: {
            Code: 'RWF',
            Value: 646,
            Name: 'Rwandan franc',
        },
        SHP: {
            Code: 'SHP',
            Value: 654,
            Name: 'Saint Helena pound',
        },
        SAR: {
            Code: 'SAR',
            Value: 682,
            Name: 'Saudi riyal',
        },
        SCR: {
            Code: 'SCR',
            Value: 690,
            Name: 'Seychelles rupee',
        },
        SGD: {
            Code: 'SGD',
            Value: 702,
            Name: 'Singapore dollar',
        },
        VND: {
            Code: 'VND',
            Value: 704,
            Name: 'Vietnamese đồng',
        },
        SOS: {
            Code: 'SOS',
            Value: 706,
            Name: 'Somali shilling',
        },
        ZAR: {
            Code: 'ZAR',
            Value: 710,
            Name: 'South African rand',
        },
        SSP: {
            Code: 'SSP',
            Value: 728,
            Name: 'South Sudanese pound',
        },
        SZL: {
            Code: 'SZL',
            Value: 748,
            Name: 'Swazi lilangeni',
        },
        SEK: {
            Code: 'SEK',
            Value: 752,
            Name: 'Swedish krona',
        },
        CHF: {
            Code: 'CHF',
            Value: 756,
            Name: 'Swiss franc',
        },
        SYP: {
            Code: 'SYP',
            Value: 760,
            Name: 'Syrian pound',
        },
        THB: {
            Code: 'THB',
            Value: 764,
            Name: 'Thai baht',
        },
        TOP: {
            Code: 'TOP',
            Value: 776,
            Name: 'Tongan paʻanga',
        },
        TTD: {
            Code: 'TTD',
            Value: 780,
            Name: 'Trinidad and Tobago dollar',
        },
        AED: {
            Code: 'AED',
            Value: 784,
            Name: 'United Arab Emirates dirham',
        },
        TND: {
            Code: 'TND',
            Value: 788,
            Name: 'Tunisian dinar',
        },
        UGX: {
            Code: 'UGX',
            Value: 800,
            Name: 'Ugandan shilling',
        },
        MKD: {
            Code: 'MKD',
            Value: 807,
            Name: 'Macedonian denar',
        },
        EGP: {
            Code: 'EGP',
            Value: 818,
            Name: 'Egyptian pound',
        },
        GBP: {
            Code: 'GBP',
            Value: 826,
            Name: 'Pound sterling',
        },
        TZS: {
            Code: 'TZS',
            Value: 834,
            Name: 'Tanzanian shilling',
        },
        USD: {
            Code: 'USD',
            Value: 840,
            Name: 'United States dollar',
        },
        UYU: {
            Code: 'UYU',
            Value: 858,
            Name: 'Uruguayan peso',
        },
        UZS: {
            Code: 'UZS',
            Value: 860,
            Name: 'Uzbekistan som',
        },
        WST: {
            Code: 'WST',
            Value: 882,
            Name: 'Samoan tala',
        },
        YER: {
            Code: 'YER',
            Value: 886,
            Name: 'Yemeni rial',
        },
        TWD: {
            Code: 'TWD',
            Value: 901,
            Name: 'New Taiwan dollar',
        },
        VED: {
            Code: 'VED',
            Value: 926,
            Name: 'Venezuelan bolívar digital',
        },
        UYW: {
            Code: 'UYW',
            Value: 927,
            Name: 'Unidad previsional[16]',
        },
        VES: {
            Code: 'VES',
            Value: 928,
            Name: 'Venezuelan bolívar soberano',
        },
        MRU: {
            Code: 'MRU',
            Value: 929,
            Name: 'Mauritanian ouguiya',
        },
        STN: {
            Code: 'STN',
            Value: 930,
            Name: 'São Tomé and Príncipe dobra',
        },
        CUC: {
            Code: 'CUC',
            Value: 931,
            Name: 'Cuban convertible peso',
        },
        ZWL: {
            Code: 'ZWL',
            Value: 932,
            Name: 'Zimbabwean dollar',
        },
        BYN: {
            Code: 'BYN',
            Value: 933,
            Name: 'Belarusian ruble',
        },
        TMT: {
            Code: 'TMT',
            Value: 934,
            Name: 'Turkmenistan manat',
        },
        GHS: {
            Code: 'GHS',
            Value: 936,
            Name: 'Ghanaian cedi',
        },
        SDG: {
            Code: 'SDG',
            Value: 938,
            Name: 'Sudanese pound',
        },
        UYI: {
            Code: 'UYI',
            Value: 940,
            Name: 'Uruguay Peso en Unidades Indexadas (URUIURUI) (funds code)',
        },
        RSD: {
            Code: 'RSD',
            Value: 941,
            Name: 'Serbian dinar',
        },
        MZN: {
            Code: 'MZN',
            Value: 943,
            Name: 'Mozambican metical',
        },
        AZN: {
            Code: 'AZN',
            Value: 944,
            Name: 'Azerbaijani manat',
        },
        RON: {
            Code: 'RON',
            Value: 946,
            Name: 'Romanian leu',
        },
        CHE: {
            Code: 'CHE',
            Value: 947,
            Name: 'WIR euro (complementary currency)',
        },
        CHW: {
            Code: 'CHW',
            Value: 948,
            Name: 'WIR franc (complementary currency)',
        },
        TRY: {
            Code: 'TRY',
            Value: 949,
            Name: 'Turkish lira',
        },
        XAF: {
            Code: 'XAF',
            Value: 950,
            Name: 'CFA franc BEAC',
        },
        XCD: {
            Code: 'XCD',
            Value: 951,
            Name: 'East Caribbean dollar',
        },
        XOF: {
            Code: 'XOF',
            Value: 952,
            Name: 'CFA franc BCEAO',
        },
        XPF: {
            Code: 'XPF',
            Value: 953,
            Name: 'CFP franc (franc Pacifique)',
        },
        XBA: {
            Code: 'XBA',
            Value: 955,
            Name: 'European Composite Unit (EURCO) (bond market unit)',
        },
        XBB: {
            Code: 'XBB',
            Value: 956,
            Name: 'European Monetary Unit (E.M.U.-6) (bond market unit)',
        },
        XBC: {
            Code: 'XBC',
            Value: 957,
            Name: 'European Unit of Account 9 (E.U.A.-9) (bond market unit)',
        },
        XBD: {
            Code: 'XBD',
            Value: 958,
            Name: 'European Unit of Account 17 (E.U.A.-17) (bond market unit)',
        },
        XAU: {
            Code: 'XAU',
            Value: 959,
            Name: 'Gold',
        },
        XDR: {
            Code: 'XDR',
            Value: 960,
            Name: 'Special drawing rights',
        },
        XAG: {
            Code: 'XAG',
            Value: 961,
            Name: 'Silver',
        },
        XPT: {
            Code: 'XPT',
            Value: 962,
            Name: 'Platinum',
        },
        XTS: {
            Code: 'XTS',
            Value: 963,
            Name: 'Code reserved for testing',
        },
        XPD: {
            Code: 'XPD',
            Value: 964,
            Name: 'Palladium',
        },
        XUA: {
            Code: 'XUA',
            Value: 965,
            Name: 'ADB Unit of Account',
        },
        ZMW: {
            Code: 'ZMW',
            Value: 967,
            Name: 'Zambian kwacha',
        },
        SRD: {
            Code: 'SRD',
            Value: 968,
            Name: 'Surinamese dollar',
        },
        MGA: {
            Code: 'MGA',
            Value: 969,
            Name: 'Malagasy ariary',
        },
        COU: {
            Code: 'COU',
            Value: 970,
            Name: 'Unidad de Valor Real (UVR) (funds code)',
        },
        AFN: {
            Code: 'AFN',
            Value: 971,
            Name: 'Afghan afghani',
        },
        TJS: {
            Code: 'TJS',
            Value: 972,
            Name: 'Tajikistani somoni',
        },
        AOA: {
            Code: 'AOA',
            Value: 973,
            Name: 'Angolan kwanza',
        },
        BGN: {
            Code: 'BGN',
            Value: 975,
            Name: 'Bulgarian lev',
        },
        CDF: {
            Code: 'CDF',
            Value: 976,
            Name: 'Congolese franc',
        },
        BAM: {
            Code: 'BAM',
            Value: 977,
            Name: 'Bosnia and Herzegovina convertible mark',
        },
        EUR: {
            Code: 'EUR',
            Value: 978,
            Name: 'Euro',
        },
        MXV: {
            Code: 'MXV',
            Value: 979,
            Name: 'Mexican Unidad de Inversion (UDI) (funds code)',
        },
        UAH: {
            Code: 'UAH',
            Value: 980,
            Name: 'Ukrainian hryvnia',
        },
        GEL: {
            Code: 'GEL',
            Value: 981,
            Name: 'Georgian lari',
        },
        BOV: {
            Code: 'BOV',
            Value: 984,
            Name: 'Bolivian Mvdol (funds code)',
        },
        PLN: {
            Code: 'PLN',
            Value: 985,
            Name: 'Polish złoty',
        },
        BRL: {
            Code: 'BRL',
            Value: 986,
            Name: 'Brazilian real',
        },
        CLF: {
            Code: 'CLF',
            Value: 990,
            Name: 'Unidad de Fomento (funds code)',
        },
        XSU: {
            Code: 'XSU',
            Value: 994,
            Name: 'SUCRE',
        },
        USN: {
            Code: 'USN',
            Value: 997,
            Name: 'United States dollar (next day) (funds code)',
        },
        XXX: {
            Code: 'XXX',
            Value: 999,
            Name: 'No currency',
        },
        XAG_Gr: {
            Code: 'XAG_Gr',
            Value: 1000,
            Name: 'Silver Gram',
        },
        XAU_Gr: {
            Code: 'XAU_Gr',
            Value: 1001,
            Name: 'Gold Gram',
        },
        XPD_Gr: {
            Code: 'XPD_Gr',
            Value: 1002,
            Name: 'Palladium Gram',
        },
        XPT_Gr: {
            Code: 'XPT_Gr',
            Value: 1003,
            Name: 'Platinum Gram',
        },
    },

};
export { enums };
export default enums;
