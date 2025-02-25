import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['{lib,web,test}/**/*.{ts,tsx}', 'test/setup.ts'],
    ignores: ['dist', 'web/snippets/**/*'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-empty-object-type": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "indent": [
        "error",
        2,
        {
          "offsetTernaryExpressions": true,
          "SwitchCase": 1
        }
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "warn",
        "single",
        {
          "avoidEscape": true,
          "allowTemplateLiterals": true
        }
      ],
      "react/prop-types": 0,
      "semi": [
        "error",
        "never"
      ]
    },
  },
)
