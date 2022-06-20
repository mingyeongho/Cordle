import styles from "../../styles/main/_keyboard.module.scss";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import compare from "../files/compare";
import { COL, KEYBOARD, REGEX } from "../files/constants";
import { boardState, positionState } from "../recoil/atom";
import Key from "../reusable/Key";

const Keyboard = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [position, setPosition] = useRecoilState(positionState);
  const { i, j } = { ...position };

  const onClickKey = (e: any) => {
    const target = e.target;
    const { tagName, innerHTML } = target;
    if (tagName === "BUTTON") {
      if (REGEX.test(innerHTML)) {
        if (j < COL) {
          setBoard((prev) => {
            const newBoard = [...prev].map((row, idx) => {
              return idx === i
                ? row.map((val, idx) => (idx === j ? { char: innerHTML } : val))
                : row;
            });
            return newBoard;
          });
          j !== COL &&
            setPosition((prev) => {
              return { ...prev, j: prev.j + 1 };
            });
        }
      }
      // Enter를 누르면 localStorage에 저장되어야 함.
      else if (innerHTML === "Enter") {
        if (j === COL) {
          setBoard((prev) => {
            const newBoard = [...prev].map((row, idx) => {
              if (idx === i) {
                const states = compare(row);
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
        }
      }
      // Delete
      else if (innerHTML === "Delete") {
        if (j !== 0) {
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
    }
  }, [position]);

  return (
    <div className={styles.keyboard_container} onClick={onClickKey}>
      {KEYBOARD.map((row, idx) => (
        <div key={idx} className={styles.keyboard_row}>
          {row.map((key, idx) => (
            <Key char={key} key={idx}></Key>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
