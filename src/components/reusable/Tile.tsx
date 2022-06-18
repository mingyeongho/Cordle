import styles from "../../styles/reusable/_tile.module.scss";
import { TileProps } from "../files/interface";

const Tile = ({ char = "" }: TileProps) => {
  return <div className={styles.tile_container}>{char}</div>;
};

export default Tile;
