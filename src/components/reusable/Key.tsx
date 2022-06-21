import styles from "../../styles/reusable/_key.module.scss";
import { KeyProps } from "../files/interface";

const Key = ({ char, state }: KeyProps) => {
  return (
    <button className={`key ${styles.key_container} ${state && styles[state]}`}>
      {char}
    </button>
  );
};

export default Key;
