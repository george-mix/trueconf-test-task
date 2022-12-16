module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript",
    "prettier",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
