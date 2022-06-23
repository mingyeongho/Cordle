import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styles from "../../styles/main/_board.module.scss";
import compare from "../files/compare";
import { COL, REGEX } from "../files/constants";
import GameOver from "../modal/GameOver";
import {
  boardState,
  guessState,
  keyboardState,
  positionState,
} from "../recoil/atom";
import Modal from "../reusable/Modal";
import Tile from "../reusable/Tile";

const Board = () => {
  // enter를 누르면 localStorage.setItem('board')에 저장되어야 됨.
  const [board, setBoard] = useRecoilState(boardState);
  const [guess, setGuess] = useRecoilState(guessState); // 현재 입력중인 단어
  const [position, setPosition] = useRecoilState(positionState);
  const { i, j } = { ...position };
  const [keyboard, setKeyboard] = useRecoilState(keyboardState);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      const { key } = e;

      // 영문자 입력
      if (REGEX.test(key)) {
        // j가 COL 보다 작으면 추가
        if (j < COL) {
          setGuess((prev) => prev.concat(key));
          setBoard((prev) => {
            const newBoard = [...prev].map((row, idx) => {
              return idx === i
                ? row.map((val, idx) => (idx === j ? { char: key } : val))
                : row;
            });
            return newBoard;
          });
          setPosition((prev) => {
            return { ...prev, j: prev.j + 1 };
          });
        }
      }
      // Enter를 누르면 localStorage에 저장되어야 함.
      else if (key === "Enter") {
        if (j === COL) {
          const states = compare(guess);
          setGuess("");
          setBoard((prev) => {
            const newBoard = [...prev].map((row, idx) => {
              if (idx === i) {
                return row.map((tile, idx) => {
                  return { ...tile, state: states[idx] };
                });
              } else {
                return row;
              }
            });
            return newBoard;
          });
          setPosition((prev) => {
            return { ...prev, i: prev.i + 1, j: 0 };
          });
          // 이미 correct인 Key는 색을 계속 유지해야됨.
          setKeyboard((prev) => {
            const guessArray = guess.split("");
            const newKeyboard = [...prev].map((row, idx) => {
              return row.map((key, idx) => {
                const { char, state } = key;
                const index = guessArray.indexOf(char);
                if (index !== -1) {
                  // 이미 state가 있을 경우와 없을 경우
                  if (state) {
                    // state가 correct일 경우 -> 무조건 현재 key가 리턴
                    if (state === "correct") return { ...key };
                    // state가 present일 경우 - states[index]가 correct일 경우에만 update
                    else if (state === "present" && states[index] === "correct")
                      return { ...key, state: states[index] };
                    else return { ...key, state: states[index] };
                  } else {
                    return { ...key, state: states[index] };
                  }
                } else {
                  return key;
                }
              });
            });
            return newKeyboard;
          });
          setIsGameOver((prev) => !prev);
        }
      }
      // Backspace
      else if (key === "Backspace") {
        if (j !== 0) {
          setGuess((prev) => {
            const guessArr = prev.split("");
            guessArr.splice(prev.length - 1, 1);
            return guessArr.join("");
          });
          setBoard((prev) => {
            const newBoard = [...prev].map((row, idx) => {
              return idx === i
                ? row.map((tile, idx) => (idx === j - 1 ? { char: "" } : tile))
                : row;
            });
            return newBoard;
          });
          setPosition((prev) => {
            return { ...prev, j: prev.j - 1 };
          });
        }
      }
    };
    isGameOver === false && document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [board, position]);

  useEffect(() => {
    if (position.j === 0 && position.i !== 0) {
      localStorage.setItem("boardState", JSON.stringify(board));
      localStorage.setItem("positionState", JSON.stringify(position));
      localStorage.setItem("keyboardState", JSON.stringify(keyboard));
    }
  }, [position]);

  return (
    <>
      <div className={styles.board_container}>
        {board.map((row, idx) => (
          <div className={styles.board_row} key={idx}>
            {row.map((tile, idx) => {
              const { char, state } = tile;
              return <Tile key={idx} char={char} state={state}></Tile>;
            })}
          </div>
        ))}
      </div>
      {isGameOver && (
        <Modal>
          <GameOver setIsGameOver={setIsGameOver}></GameOver>
        </Modal>
      )}
    </>
  );
};

export default Board;
