import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/main/_main.module.scss";
import { URL } from "../files/constants";
import Board from "./Board";
import Keyboard from "./Keyboard";

const Main = () => {
  const [answer, setAnswer] = useState<string>("");
  const fetch = async () => {
    try {
      const res = await axios.get(URL);
      const word = res.data;
      setAnswer(word);
    } catch (e) {
      setAnswer("focus");
    }
  };

  useEffect(() => {
    localStorage.getItem("answerState") ?? fetch();
  }, []);

  useEffect(() => {
    answer !== "" && localStorage.setItem("answerState", answer);
  }, [answer]);
  return (
    <main className={styles.main_container}>
      <Board answer={answer}></Board>
      <Keyboard answer={answer}></Keyboard>
    </main>
  );
};

export default Main;
