import styles from "../../styles/reusable/_key.module.scss";
import { KeyProps } from "../files/interface";

const Key = ({ char }: KeyProps) => {
  return <button className={`${styles.key_container} key`}>{char}</button>;
};

export default Key;
