import { id } from "./id";
import { en } from "./en";

export type Locale = "id" | "en";

export const translations = {
  id,
  en,
} as const;

type DeepString<T> = {
  readonly [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends (infer U)[]
    ? readonly DeepString<U>[]
    : T[K] extends readonly (infer U)[]
    ? readonly DeepString<U>[]
    : T[K] extends object
    ? DeepString<T[K]>
    : T[K];
};

export type TranslationSchema = DeepString<typeof id>;
