module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["plugin:flowtype/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "flowtype"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "flowtype/array-style-complex-type": 2,
    "flowtype/array-style-simple-type": 2,
    "flowtype/arrow-parens": 2,
    "flowtype/boolean-style": 2,
    "flowtype/generic-spacing": 2,
    "flowtype/no-dupe-keys": 2,
    "flowtype/no-existential-type": 2,
    "flowtype/no-mixed": 2,
    "flowtype/no-primitive-constructor-types": 2,
    "flowtype/no-unused-expressions": 2,
    "flowtype/no-weak-types": [2, { Function: false }],
    "flowtype/object-type-delimiter": 2,
    "flowtype/require-parameter-type": 2,
    "flowtype/require-return-type": 2,
    "flowtype/require-types-at-top": 2,
    "flowtype/require-valid-file-annotation": [
      2,
      "always",
      { annotationStyle: "line", strict: true }
    ],
    "flowtype/require-variable-type": 2,
    "flowtype/semi": 2,
    "flowtype/sort-keys": 2,
    "flowtype/space-before-generic-bracket": 2
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false
    }
  }
};
