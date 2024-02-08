/** @type {import('jest').Config} */

const path = require('path');

const config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    roots: ["../"],
    moduleNameMapper: {
        "\\.css$": path.join(__dirname, '/styleMock.js')
    },
};

module.exports = config;
