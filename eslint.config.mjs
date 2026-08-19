import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['build/**', 'dist/**', 'node_modules/**', 'coverage/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.flat.recommended.rules,
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^React$',
      }],
      'react-refresh/only-export-components': ['warn', {
        allowConstantExport: true,
        allowExportNames: [
          'LANGUAGES',
          'useLanguage',
          'registerDictionary',
          'detectBrowserLang',
          'readStoredLang',
          'resolveInitialLang',
        ],
      }],
    },
  },
];
