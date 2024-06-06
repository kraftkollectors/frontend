export type AppLayoutProps = Readonly<{ children: React.ReactNode }>;
export type AppPageProps<T = any, K = any> = { params?: T, searchParams?: K };

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
    hasPreviousPage: boolean,
    previousPages: number,
    hasNextPage: boolean,
    nextPages: number,
    totalPages: number,
    currentPage: number
}