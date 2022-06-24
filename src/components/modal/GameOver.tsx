import styles from "../../styles/modal/_gameover.module.scss";
import { CANCEL, NEWGAME } from "../files/constants";
import { GameOverProps } from "../files/interface";

const GameOver = ({ setIsShow }: GameOverProps) => {
  const onClickCancel = () => {
    setIsShow(false);
  };

  const onClickReset = () => {
    const isReset: boolean = confirm("새 게임을 하시겠습니까?");
    if (isReset) {
      // localStorage를 비우기
      localStorage.clear();
      // 새로고침
      location.reload();
    }
  };
  return (
    <div className={styles.gameover_container}>
      <h2>GameOver</h2>
      <div className={styles.btn_container}>
        <button className={styles.cancel_btn} onClick={onClickCancel}>
          {CANCEL}
        </button>
        <button onClick={onClickReset}>{NEWGAME}</button>
      </div>
    </div>
  );
};

export default GameOver;
