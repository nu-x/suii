import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import babelParser from '@babel/eslint-parser';

export default [
  js.configs.recommended,
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      'no-unused-vars': 'warn',
      ...prettier.configs.recommended.rules,
      'prettier/prettier': 'error',
      'no-empty': ['warn', { allowEmptyCatch: true }],
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
];
