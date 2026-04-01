/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIRST_ENTRY?: string;
  readonly VITE_SECOND_ENTRY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
