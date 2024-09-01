

export type Advert = {
    _id: string;
    title: string;
    startDate: string;
    duration: string; // number of days - how long the advert will be displayed
    isActive: boolean; // true - if startDate < todaysDate and duration <= today-startDate | otherwise false
    image: string;
    url: string;
    createdAt: string;
}

/**
 * /adverts
 * query params
 * q = string. search query for advert title
 * only = 'active'|'inactive'. return either only active adverts or expired ones
 * sort = 'date'|'a-z'. order by date or alphabetically
 * page = number. page number
 */