import { title } from "process";

export const COOKIE_MAX_AGE = 60 * 60 * 24;
export const HOST = "https://kraftkollectors.vercel.app";
export const SERVER_TIME_DIFFERENCE = 1; // 1 hour

export const WS_URL = "wss://backends-865y.onrender.com"
// export const WS_URL = "wss://backends-865y.onrender.com/socket.io/?EIO=4&transport=polling&t=P0TH-jM"

export const GOOGLE_OAUTH_CLIENT_ID = "912930599984-0ojggkv87gcrf25f661kvffft90qckmc.apps.googleusercontent.com";
export const GOOGLE_AUTH_USER_INFO_API = "https://www.googleapis.com/oauth2/v3/userinfo"

export const JWT_SECRET = 'n7tdce8yhsu88209cry8y98d4suhd9y408w9ufs94';

export const ARTISAN_DEGREE_TYPES = [
    "HND", 'OND', "Diploma", 'BSC', 'PHD', 'Others'
];

export const GENDERS = ['male', 'female']

export const ALLOWED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'gif']
export const ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'm4a'];
export const $1MB = 1024 * 1024 * 1;

export const SORT_OPTIONS =  [
    {
      title: "Best Rating",
      value: "best-rating",
    },
    {
      title: "Latest",
      value: "latest",
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
      value: "1"
    },
    {
      title: "3 days",
      value: "3"
    },
    {
      title: "7 days",
      value: "7"
    },
    {
      title: "12 days",
      value: "12"
    },
  ]