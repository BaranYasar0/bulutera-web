module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'babel', 'import', 'jsx-a11y', 'react-hooks'],
  rules: {
    'linebreak-style': 'off', // Don't play nicely with Windows
    'arrow-body-style': 'off', // Incompatible with prettier
    'arrow-parens': 'off', // Incompatible with prettier
    'object-curly-newline': 'off', // Incompatible with prettier
    'function-paren-newline': 'off', // Incompatible with prettier
    indent: 'off', // Incompatible with prettier
    'implicit-arrow-linebreak': 'off', // Incompatible with prettier
    'space-before-function-paren': 'off', // Incompatible with prettier
    'comma-dangle': ['error', {
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'only-multiline',
      exports: 'only-multiline',
      functions: 'never'
    }],
    'no-confusing-arrow': 'off', // Incompatible with prettier
    'no-mixed-operators': 'off', // Incompatible with prettier
    'no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true,
    }],
    'consistent-this': ['error', 'self'],
    eqeqeq: 'off', // ['error', 'smart'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreComments: true,
      },
    ], // airbnb is allowing some edge cases
    'no-console': 'error', // airbnb is using warn
    'prefer-destructuring': 'off', // airbnb is using error. destructuring harm grep potential.
    'no-alert': 'error', // airbnb is using warn
    'no-param-reassign': 'off', // airbnb use error
    'react/no-array-index-key': 'off',
    'no-prototype-builtins': 'off', // airbnb use error
    'no-restricted-exports': 'off',
    'operator-linebreak': 'off', // airbnb use error
    'import/prefer-default-export': 'warn',
    // It would be better to enable this rule, but it might slow us down.
    'import/no-extraneous-dependencies': 'off',
    'import/newline-after-import': ['error', { count: 2 }],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'import/namespace': [
      'error',
      {
        allowComputed: true,
      },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-dom',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'prop-types',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '@mui/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@fi/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-dom', 'prop-types', '@mui/**', '@fi/**'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
      },
    ],
    'sort-imports': ['error', {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      allowSeparatedGroups: true,
    }],
    'react/jsx-indent': 'off', // Incompatible with prettier
    'react/jsx-closing-bracket-location': 'off', // Incompatible with prettier
    'react/jsx-wrap-multilines': 'off', // Incompatible with prettier
    'react/jsx-indent-props': 'off', // Incompatible with prettier
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off', // Incompatible with prettier
    'react/jsx-curly-brace-presence': 'off', // airbnb use error, it's buggy
    'react/forbid-prop-types': 'off', // airbnb use error
    'react/forbid-foreign-prop-types': 'off', // airbnb use error
    'react/require-default-props': 'off', // airbnb use error, it's buggy
    'react/destructuring-assignment': 'off', // airbnb use error
    'react/function-component-definition': [2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.tsx'],
      },
    ], // airbnb is using .jsx
    'react/no-danger': 'error', // airbnb is using warn
    'react/no-direct-mutation-state': 'error', // airbnb is using off
    'react/no-find-dom-node': 'off', // airbnb use error
    'react/sort-prop-types': 'error', // airbnb use off

    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-autofocus': 'off', // We are a library, people do what they want.

    'no-plusplus': 'off',
    'no-return-assign': 'off',
    'react/no-string-refs': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
