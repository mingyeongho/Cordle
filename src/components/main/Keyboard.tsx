import styles from "../../styles/main/_keyboard.module.scss";
import { KEYBOARD } from "../files/constants";
import Key from "../reusable/Key";

const Keyboard = () => {
  return (
    <div className={styles.keyboard_container}>
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
