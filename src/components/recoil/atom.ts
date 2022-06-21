import { atom } from "recoil";
import { COL, KEYBOARD, ROW } from "../files/constants";
import { KeyProps, PositionProps, TileProps } from "../files/interface";

export const boardState = atom<TileProps[][]>({
  key: "boardState",
  // localStorage.getItem('board')가 있다면 가져다 쓰고 없으면 새로 만듬
  default: localStorage.getItem("boardState")
    ? JSON.parse(localStorage.getItem("boardState")!)
    : new Array(ROW).fill(0).map((_) => new Array(COL).fill({ char: "" })),
});

export const positionState = atom<PositionProps>({
  key: "positionState",
  default: localStorage.getItem("positionState")
    ? JSON.parse(localStorage.getItem("positionState")!)
    : {
        i: 0,
        j: 0,
      },
});

export const keyboardState = atom<KeyProps[][]>({
  key: "keyboardState",
  default: localStorage.getItem("keyboardState")
    ? JSON.parse(localStorage.getItem("keyboardState")!)
    : KEYBOARD.map((row) =>
        row.map((key) => {
          return { char: key };
        })
      ),
});

export const guessState = atom<string>({
  key: "guessState",
  default: "",
});
