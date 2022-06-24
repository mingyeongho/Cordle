# Cordle

## Description

- Custom + Wordle

## Function

- 사용자가 몇 글자의 단어를 맞출지 결정했으면 좋겠다.
- 사용자가 편하게 Reset 버튼을 누르면 새로운 글자 수와 새로운 단어로 Reset 된다. ✅
  - Reset을 누르면 초기화 되면서 새로고침 되면 좋겠다.
- 사용자가 Reset 버튼을 누르기 전에는 사용자가 입력했던 것들이 저장되어있으면 좋겠다. ✅
  - 처음에 localStorage에 존재하면 recoil에서 가져오고 아니면 default 값을 할당한다.
- 사용자의 기본 모드에 따른 다크모드 설정 ✅
  - https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#toggling-themes 참고
  - css의 @media (prefers-color-scheme: dark || light)로 설정한다.
  - 사용자는 toggle 버튼을 사용하여 기본 모드를 무시하고 모드를 설정할 수 있다.
  - 페이지 새로고침 시 사용자가 설정한 모드를 유지할 수 있어야 한다.
- 단어를 랜덤으로 가져와야됨.

## Stack

- yarn
- vite
- react18
- scss

## History

- 0618

  - Dark Mode 구현
  - KeyBoard와 Board에 Dark Mode에 따른 색 설정

- 0619

  - localStorage를 사용해서 사용자가 입력한 값 저장
  - Refresh해도 전에 사용했던 값들이 있어야됨.

- 0620

  - KeyBoard에 클릭이벤트 적용

- 0621

  - Key에 state에 따라 색을 주고싶다.(Tile처럼)

- 0622

  - Key State에 따라 다른 색 주는 로직 업데이트
    - 한번 correct인 Key는 계속 correct
    - present인 Key는 states[index]가 correct일 때만 업데이트
  - 단어를 랜덤으로 가져오고 단어 수를 사용자가 정하면 좋겠다.

- 0623

  - 단어를 맞추면 modal 나옴
  - 단어를 맞추면 더이상 입력이 되어선 안됨.

- 0624
  - 글자 수를 입력해서 입력한대로 가져와야됨.
