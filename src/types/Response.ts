interface Response<T = any> {
  status: {
    code: number;
    message: 'OK' | string;
  };
  data: T;
  version: number;
  module: string;
  method: string;
}
