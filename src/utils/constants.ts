import { title } from "process";

export const COOKIE_MAX_AGE = 60 * 60 * 24;
export const HOST = "https://kraftkollectors.com";
export const SERVER_TIME_DIFFERENCE = 1; // 1 hour
export const GEOLOCATION_API =
  "https://nominatim.openstreetmap.org/reverse?format=json";

const backendHost = process.env.NEXT_PUBLIC_API_URL || 'https://api.kraftkollectors.com';
export const WS_URL = "wss://" + backendHost?.split("https://")[1];
// export const WS_URL = "wss://backends-865y.onrender.com/socket.io/?EIO=4&transport=polling&t=P0TH-jM"

export const GOOGLE_OAUTH_CLIENT_ID =
  "912930599984-0ojggkv87gcrf25f661kvffft90qckmc.apps.googleusercontent.com";
export const GOOGLE_AUTH_USER_INFO_API =
  "https://www.googleapis.com/oauth2/v3/userinfo";

export const JWT_SECRET = "n7tdce8yhsu88209cry8y98d4suhd9y408w9ufs94";


export const GENDERS = ["male", "female"];

export const ALLOWED_IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "gif"];
export const ALLOWED_VIDEO_EXTENSIONS = ["mp4", "m4a"];
export const $1MB = 1024 * 1024 * 1;

export const SORT_OPTIONS = [
  {
    title: "Latest",
    value: "latest",
  },
  {
    title: "Best Rating",
    value: "best-rating",
  },
  {
    title: "Lowest Price",
    value: "lowest-price",
  },
  {
    title: "Highest Price",
    value: "highest-price",
  },
];

export const ADVERT_DURATIONS = [
  {
    title: "1 day",
    value: "1",
  },
  {
    title: "3 days",
    value: "3",
  },
  {
    title: "7 days",
    value: "7",
  },
  {
    title: "12 days",
    value: "12",
  },
];

export const ADMIN_USERS_FILTERS = [
  {
    title: "All",
    value: "",
  },
  {
    title: "Artisans",
    value: "true",
  },
  {
    title: "Users",
    value: "false",
  },
];

export const ADMIN_USERS_SORT = [
  {
    title: "Newest to Oldest",
    value: "date",
  },
  {
    title: "A-Z",
    value: "a-z",
  },
];

export const ARTISAN_DEGREE_TYPES = [
  "AA",
  "AS",
  "AAS",
  "AFA",
  "ABA",
  "BA",
  "BSc",
  "BFA",
  "BBA",
  "BEng",
  "BArch",
  "BM",
  "BN",
  "BSW",
  "LLB",
  "BEd",
  "BTech",
  "HND",
  "MA",
  "MS",
  "MFA",
  "MBA",
  "MPA",
  "MPH",
  "MSW",
  "MEd",
  "MEng",
  "MArch",
  "MM",
  "MN",
  "ND",
  "PhD",
  "MD",
  "DDS",
  "EdD",
  "DNP",
  "DrPH",
  "DBA",
  "DVM",
  "PharmD",
  "JD",
  "DPT",
  "OTD",
  "PsyD",
  "DMA",
  "DMin",
  "ThD",
];
