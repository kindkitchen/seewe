/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "import/core-modules": ["off", "vue-router/auto-routes"],
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 3,
      },
      "multiline": 1,
    }],
  },
};
