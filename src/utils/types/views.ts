export type View = {
  views: number;
};

export type ViewModel = View & {
  createdAt: string;
  serviceId: string;
};
