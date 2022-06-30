import styles from "../../styles/main/_keyboard.module.scss";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import compare from "../files/compare";
import { COL, REGEX } from "../files/constants";
import {
  boardState,
  guessState,
  isGameOverState,
  keyboardState,
  positionState,
} from "../recoil/atom";
import Key from "../reusable/Key";
import { KeyboardProps } from "../files/interface";

const Keyboard = ({ answer }: KeyboardProps) => {
  const [board, setBoard] = useRecoilState(boardState);
  const [guess, setGuess] = useRecoilState(guessState);
  const [position, setPosition] = useRecoilState(positionState);
  const [keyboard, setKeyboard] = useRecoilState(keyboardState);
  const [isGameOver, setIsGameOver] = useRecoilState(isGameOverState);

  const [isShow, setIsShow] = useState<boolean>(false);

  const { i, j } = { ...position };

  const onClickKey = (e: any) => {
    const target = e.target;
    const { tagName, innerHTML } = target;
    if (tagName === "BUTTON" && !isGameOver) {
      if (REGEX.test(innerHTML)) {
        if (j < COL) {
          setGuess((prev) => prev.concat(innerHTML));
          setBoard((prev) => {
            const newBoard = [...prev].map((row, idx) => {
              return idx === i
                ? row.map((val, idx) => (idx === j ? { char: innerHTML } : val))
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
      else if (innerHTML === "Enter") {
        if (j === COL) {
          const states = compare({ answer, guess });
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
          setKeyboard((prev) => {
            const guessArray = guess.split("");
            const newKeyboard = [...prev].map((row, idx) => {
              return row.map((key, idx) => {
                const { char } = key;
                const index = guessArray.indexOf(char);
                if (index !== -1) {
                  return { ...key, state: states[index] };
                } else {
                  return key;
                }
              });
            });
            return newKeyboard;
          });
          if (
            JSON.stringify(states) ===
            JSON.stringify(new Array(5).fill("correct"))
          ) {
            setIsGameOver(true);
          }
        }
      }
      // Delete
      else if (innerHTML === "Delete") {
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
    }
  };

  useEffect(() => {
    if (position.j === 0 && position.i !== 0) {
      localStorage.setItem("boardState", JSON.stringify(board));
      localStorage.setItem("positionState", JSON.stringify(position));
      localStorage.setItem("keyboardState", JSON.stringify(keyboard));
    }
  }, [position]);

  useEffect(() => {
    setTimeout(() => {
      if (isGameOver) {
        setIsShow(true);
        document.getElementById("portal")?.classList.add("show");
        localStorage.setItem("isGameOverState", true.toString());
      }
    }, 1000);
  }, [isGameOver]);

  return (
    <div className={styles.keyboard_container} onClick={onClickKey}>
      {keyboard.map((row, idx) => (
        <div key={idx} className={styles.keyboard_row}>
          {row.map((val, idx) => {
            const { char, state } = val;
            return <Key char={char} state={state} key={idx}></Key>;
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
