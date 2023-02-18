export type Dispatch = {
  type: keyof Store;
  payload: any;
};

export type Store = {
  uuid: string;
};
