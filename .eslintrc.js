module.exports = {
    "root": true,
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "ignorePatterns": [
        "node_modules/**/*",
        "src/public/*"
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "prefer-const": "error",
        "prefer-arrow-callback": "error",
        "camelcase": "error",
        "no-unused-vars": "error",
        "no-var": "error",
        "no-empty-function": "error",
        "no-multiple-empty-lines": [
            "error",
            {
                "max": 1,
                "maxBOF": 0,
                "maxEOF": 0
            }
        ],
        "curly": "error",
        "brace-style": ["error", "1tbs"],
        "eqeqeq": ["error", "always"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "dot-notation": ["error"]
    }
};