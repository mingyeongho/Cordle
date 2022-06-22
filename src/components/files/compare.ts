import { ANSWER } from "./constants";

const compare = (guess: string): string[] => {
  const guessArray: string[] = guess.split(""); // guess를 Array로 바꿈.
  const answerArray: string[] = ANSWER.split(""); // ANSWER도 Array로 바꿈.
  const result: string[] = guessArray.map((char, idx) => {
    return answerArray[idx] === char
      ? "correct"
      : ANSWER.includes(char)
      ? "present"
      : "absent";
  });
  return result;
};
export default compare;
