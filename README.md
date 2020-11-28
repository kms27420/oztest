## Dev-Dependencies

 - Code Formatter(ESLint + Prettier)
    - eslint: 코드의 규칙을 두어 퀄리티를 높이고 통일성을 유지
        - plugin: 추가적인 규칙
        - config: 규칙에 대한 설정(에러, 경고, 무시 등)
    - eslint-config-airbnb: JS 파일 및 JSX 파일에 대한 전반적인 규약을 지정 아래의 peerDependencies 필요
        - eslint-plugin-import
        - eslint-plugin-jsx-a11y
        - eslint-plugin-react
        - eslint-plugin-react-hooks
    - eslint-config-prettier: Prettier와 ESLint 연동
        - eslint-plugin-prettier
    - prettier: 코드 형식을 지정하여 통일성을 높임. IDE에 Prettier 플러그인을 통해 형식 자동 수정을 지원함.
 - Transpiler(Babel)
    - @babel-core: 브라우저마다 Javascript 엔진에 차이가 있어 이를 공통적으로 이용할 수 있는 코드로 변환해줌.
        - preset: Babel의 설정과 플러그인 등을 모아놓은 라이브러리.
    - babel-preset-react-app: create-react-app(이하 CRA)사용되는 프리셋(@babel-preset-react 과 다른 것).
    - babel-preset-mobx: mobx 라이브러리를 위한 프리셋
 - Builder(Webpack)

