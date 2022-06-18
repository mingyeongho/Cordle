import { atom } from "recoil";
import { COL, ROW } from "../files/constants";
import { TileProps } from "../files/interface";

export const boardState = atom<TileProps[][]>({
  key: "boardState",
  // localStorage.getItem('board')가 있다면 가져다 쓰고 없으면 새로 만듬
  default:
    (localStorage.getItem("board") as unknown as TileProps[][]) ??
    new Array(ROW).fill(0).map((_) => new Array(COL).fill({ char: "" })),
});
