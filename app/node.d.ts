declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string;
    }
  }
}
