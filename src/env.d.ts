/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_AUTH: string;
  readonly VITE_API_CORE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
