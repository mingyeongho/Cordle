import { useRecoilState } from "recoil";
import styles from "../../styles/main/_board.module.scss";
import { boardState } from "../recoil/atom";
import Tile from "../reusable/Tile";

const Board = () => {
  // enter를 누르면 localStorage.setItem('board')에 저장되어야 됨.
  const [board, setBoard] = useRecoilState(boardState);
  console.log(board);
  return (
    <div className={styles.board_container}>
      {board.map((row, idx) => (
        <div className={styles.board_row} key={idx}>
          {row.map((tile, idx) => {
            const { char, state } = tile;
            return <Tile key={idx} char={char}></Tile>;
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
