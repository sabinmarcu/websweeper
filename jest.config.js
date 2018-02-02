module.exports = {
    verbose: true,
    moduleFileExtensions: ["js", "ls", "jsx"],
    testRegex: "(\\.|/)(spec)\\.(jsx?|ls)$",
    testPathIgnorePatterns: [
        "node_modules",
        "lib",
    ],
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.ls$": "<rootDir>/test/livescriptProcessor.js",
    },
};
