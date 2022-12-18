import { Ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { prefix } from "@/app.config";

export const useSaveToLS = <T>(key: string, defaultValue: T): Ref<T> =>
  useLocalStorage(`${prefix}${key}`, defaultValue);
