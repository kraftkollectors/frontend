export type AppLayoutProps = Readonly<{ children: React.ReactNode }>;
export type AppPageProps = { children: React.ReactNode };

export type BasicUser = {
  name: string;
  img: string;
};

export type BasicService = {
  img: string;
  title: string;
  price: string;
  duration: string;
  id: string;
};

export type VideoOrImage = "video" | "image";

export type ServiceMedia = {
  src: string;
  type: VideoOrImage;
};

export type ActionResponse = {
  fieldErrors?: {
    [key:string]:string[]|undefined;
  };
  error?: string;
  success?: string;
  data?: any;
}

export type ApiResponse<T = any> = {
  statusCode: number;
  msg: 'Success' | 'Failure',
  data: T
} 

export type ActionApiResponse<T, K = null> = null | "error" | T | K

export type Paginated<T = any> = {
  existingRecords: T[],
    hasPreviousPage: false,
    previousPages: 0,
    hasNextPage: false,
    nextPages: 0
}
// export type ActionApiResponseWith<T> = null | 404 | "error" | T