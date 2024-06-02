
export type State = {
    "name": string,
    "capital": string,
    "state_code": string,
    "creation_date": string,
    lgas: string[]
    location: Location;
}

export type LGA = {
    name: string;
    location: Location;
}

export type Location = {
    latitude: string | null;
    longitude: string | null;
}