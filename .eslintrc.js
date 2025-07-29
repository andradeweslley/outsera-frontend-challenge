module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {
    "no-unused-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
