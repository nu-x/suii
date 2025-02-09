import { defineConfig } from 'eslint-define-config';
import parser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    languageOptions: {
      parser: parser,
      parserOptions: {
        jsx: true,
      },
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': pluginTypescript,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
]);
