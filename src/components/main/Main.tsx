import { useEffect } from "react";
import styles from "../../styles/main/_main.module.scss";
import Board from "./Board";
import Keyboard from "./Keyboard";

const Main = () => {
  return (
    <main className={styles.main_container}>
      <Board></Board>
      <Keyboard></Keyboard>
    </main>
  );
};

export default Main;
