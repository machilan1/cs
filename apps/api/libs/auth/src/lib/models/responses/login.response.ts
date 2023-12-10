export type LoginResponse =
  | {
      jwt: string;
    }
  | Error;
