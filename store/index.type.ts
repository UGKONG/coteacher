export type Dispatch = {
  type: keyof Store;
  payload: any;
};

export type Store = {
  user: null | User;
  isNoticeWatch: boolean;
};
