import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styles from "../../styles/main/_board.module.scss";
import compare from "../files/compare";
import { COL, REGEX } from "../files/constants";
import { boardState, positionState } from "../recoil/atom";
import Tile from "../reusable/Tile";

const Board = () => {
  // enter를 누르면 localStorage.setItem('board')에 저장되어야 됨.
  const [board, setBoard] = useRecoilState(boardState);
  const [position, setPosition] = useRecoilState(positionState);
  const { i, j } = { ...position };

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      const { key } = e;

      // 영문자 입력
      if (REGEX.test(key)) {
        // j가 COL 보다 작으면 추가
        if (j < COL) {
          setBoard((prev) => {
            const newBoard = [...prev].map((row, idx) => {
              return idx === i
                ? row.map((val, idx) => (idx === j ? { char: key } : val))
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
      else if (key === "Enter") {
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
      // Backspace
      else if (key === "Backspace") {
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
    };
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [board, position]);

  useEffect(() => {
    if (position.j === 0 && position.i !== 0) {
      localStorage.setItem("boardState", JSON.stringify(board));
      localStorage.setItem("positionState", JSON.stringify(position));
    }
  }, [position]);

  return (
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
  );
};

export default Board;
