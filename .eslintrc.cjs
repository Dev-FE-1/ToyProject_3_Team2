module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier', 'import', 'import-order'],
  rules: {
    // console.log() 사용 시 경고 (warn과 error는 허용)
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // 함수형 컴포넌트를 화살표 함수로 작성하도록 강제 (코딩 컨벤션)
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // 화살표 함수 본문 스타일 지정(간결한 함수 작성을 유도하여 코드의 가독성을 높일 수 있음)
    'arrow-body-style': ['error', 'as-needed'],
    // 컴포넌트 이름을 PascalCase로 강제(코딩 컨벤션)
    'react/jsx-pascal-case': 'error',
    // 변수/함수명은 camelCase로 강제(코딩 컨벤션)
    camelcase: ['error', { properties: 'never' }],
    // 이벤트 핸들러 prop 이름은 'on'으로 시작하도록 강제(코딩 컨벤션)
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPropPrefix: 'on',
      },
    ],
    // Default Export와 Named Export 모두 허용(코딩 컨벤션)
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',

    'import/no-unresolved': 'off',
    // React Hooks 규칙 강제(Hooks 관련 버그를 방지하고, Hooks의 올바른 사용을 유도)
    'react-hooks/rules-of-hooks': 'error',
    // PropTypes 사용 권장(타입 안정성을 향상시키고, 컴포넌트의 인터페이스를 명확히 할 수 있음)
    'react/prop-types': 'warn',
    // 재할당 없는 변수는 const 사용 강제
    'prefer-const': 'error',
    // var 대신 let과 const 사용 강제
    'no-var': 'error',
    // 'no-unused-vars' 규칙 제거
    'no-unused-vars': 'off',
    // === 와 !== 사용 강제(타입 강제 변환으로 인한 예기치 않은 동작을 방지)
    eqeqeq: 'error',
    // 객체 구조 분해 할당 권장(코드를 더 간결하고 읽기 쉽게 만들며, 필요한 속성만 명시적으로 사용할 수 있게 할 수 있음)
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],
    // import 순서 강제(내장 모듈, 외부 모듈, 내부 모듈, index 순으로 import)
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    // JSX에서 중복된 props 방지(실수로 같은 prop을 여러 번 사용하는 것을 방지하여 버그를 예방)
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    // TypeScript 전용으로 설정
    '@typescript-eslint/no-unused-vars': [
      'error', // 'warn'을 'error'로 변경
      {
        varsIgnorePattern: '^_', // '_'로 시작하는 변수는 무시
        argsIgnorePattern: '^_', // '_'로 시작하는 함수 매개변수는 무시
      },
    ],
    // 빈 인터페이스를 허용
    '@typescript-eslint/no-empty-interface': 'off',
    // any 타입 사용 시 경고 표시
    '@typescript-eslint/no-explicit-any': 'warn',
    // 함수의 반환 타입을 명시적으로 작성하지 않아도 됨 (TypeScript의 타입 추론 기능 신뢰)
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 모듈의 공개 API에 대해 명시적인 타입 선언을 강제하지 않음
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 불필요한 이름 변경을 에러로 처리(예. import { foo as foo } from 'bar';)
    'no-useless-rename': 'error',
    // 객체 리터럴에서 가능한 단축 구문 사용하도록 강제
    'object-shorthand': 'error',
    // 리스트의 각 요소에 고유한 key prop을 요구
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    // JSX에서 React를 import하지 않아도 됨(React 17부터는 필요 없음)
    'react/react-in-jsx-scope': 'off',
    // Prettier 포맷팅 규칙을 ESLint 에러로 취급 (endOfLine은 auto로 설정하여 OS에 맞게 자동으로 줄 끝 문자를 처리)
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
  },
};
