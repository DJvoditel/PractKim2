import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-const-assign': 'error',
      'no-duplicate-imports': 'error',
      'eqeqeq': ['error', 'always'], // Используйте строгое равенство
      'prefer-const': 'warn', // Рекомендуйте использовать const
      'curly': 'error', // Обязательные фигурные скобки
      'no-console': 'warn', // Предупреждение о использовании console.log
      'consistent-return': 'error', // Консистентный возврат из функций
    },
  },
];
