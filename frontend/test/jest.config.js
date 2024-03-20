/** @type {import("jest").Config} */

const path = require("path");

const packagesToTransform = ["@react-dnd", "dnd-core", "react-dnd", "react-dnd-html5-backend"].join(
  "|",
);

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["../"],
  setupFilesAfterEnv: [path.join(__dirname, "./jestSetup.ts")],
  moduleNameMapper: {
    "\\.css$": path.join(__dirname, "/styleMock.js"),
  },
  transform: {
    [`node_modules(\\\\|/)(${packagesToTransform})(\\\\|/).+\\.(j|t)sx?$`]: "@swc/jest",
  },
  transformIgnorePatterns: [`node_modules(\\\\|/)(?!${packagesToTransform})`],
};

module.exports = config;
