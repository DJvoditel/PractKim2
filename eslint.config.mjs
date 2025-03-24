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
      'prefer-const': 'warn', // Рекомендует использовать const
      'curly': 'error', // Обязательны фигурные скобки
      'no-console': 'warn', // Предупреждение о использовании console.log
      'indent': ['error', 2], // Обязательные отступы в 2 пробела
      'max-len': ['error', { code: 80 }], // Максимальная длина строки 80 символов
      'eqeqeq': ['error', 'always'], // Требует использования строгого равенства
      'camelcase': ['error', { properties: 'never' }], // Требует использования camelCase для переменных и функций

      // Новые правила
      'consistent-return': 'error', // Требует, чтобы функции всегда возвращали значение или ничего не возвращали
      'prefer-arrow-callback': 'warn', // Рекомендует использовать стрелочные функции в качестве колбэков
      'no-magic-numbers': ['warn', { ignore: [0, 1] }], // Предупреждает об использовании "магических" чисел
      'object-shorthand': ['error'], // Требует использования краткой записи объектов
    },
  },
];
