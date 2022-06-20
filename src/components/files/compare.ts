import { TileProps } from "./interface";

const ANSWER = "focus";

const compare = (row: TileProps[]): string[] => {
  const answer = ANSWER.split("");
  const guess = row.map((tile) => tile.char);
  const result: string[] = guess.map((char, idx) => {
    return ANSWER[idx] === char
      ? "correct"
      : ANSWER.includes(char)
      ? "present"
      : "absent";
  });
  return result;
};
export default compare;
