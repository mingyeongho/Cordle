// Header
export const LOGO: string = "CORDLE";
export const NEWGAME: string = "New Game";

// KEYBOARD
export const KEYBOARD: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Delete"],
];

// Board
export const ROW: number = 6;
export const COL: number = 5;

// GameOver
export const CANCEL = "Cancel";

// InputLength
export const SAVE = "Save";

// 영문자 입력 정규표현식
export const REGEX: RegExp = /^[a-z]{1}/;

export const URL: string =
  "https://random-word-api.herokuapp.com/word?length=" + COL;

export const ANSWER: string =
  localStorage.getItem("answerState") ??
  (await fetch(URL)
    .then((res) => res.json())
    .then((data) => data[0])
    .catch((err) => console.error(err)));

localStorage.setItem("answerState", ANSWER);
