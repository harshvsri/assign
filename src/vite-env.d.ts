/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASSIGN_API: string;
  readonly VITE_JUDGE0_URL: string;
  readonly VITE_GOOGLE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
