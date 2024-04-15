// Runs after Jest environment is set up, but before the tests are run
import "@testing-library/jest-dom";
import i18n from "i18next";

jest.mock("i18next", () => ({
  use: () => i18n,
  init: () => i18n,
  t: (key) => key,
  changeLanguage: () => new Promise(() => {}),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));
