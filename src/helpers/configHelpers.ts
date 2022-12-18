import { prefix, appConfig } from "@/app.config";

const configKey = `${prefix}config`;

export const checkConfigMatchesPrevious = () => {
  const savedConfig = localStorage.getItem(configKey);

  if (savedConfig) {
    const saved = Object.entries(JSON.parse(savedConfig)).toString();
    const unsaved = Object.entries(appConfig).toString();
    localStorage.setItem(configKey, JSON.stringify(appConfig));

    return saved === unsaved;
  } else {
    localStorage.setItem(configKey, JSON.stringify(appConfig));
    return false;
  }
};

export const checkIfStateIsEmpty = (key: string) => {
  const item = localStorage.getItem(`${prefix}${key}`);
  return item === "[]" || item === null;
};

export const removePersistedState = () => {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => {
      if (key !== configKey) {
        localStorage.setItem(key, "[]");
      }
    });
};
