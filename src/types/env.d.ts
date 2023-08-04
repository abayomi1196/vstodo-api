declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
    }
  }
}

export {}
