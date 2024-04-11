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
