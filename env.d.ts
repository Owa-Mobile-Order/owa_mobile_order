declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      DATABASE_CONNECTION_STRING: string;
      NEXT_PUBLIC_API_ENDPOINT: string;
      WS_URI: string;
    }
  }
}

export {};
