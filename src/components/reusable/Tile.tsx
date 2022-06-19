import styles from "../../styles/reusable/_tile.module.scss";
import { TileProps } from "../files/interface";

const Tile = ({ char, state }: TileProps) => {
  return (
    <div
      className={`${styles.tile_container} ${char && styles.fill} ${
        state && styles[state]
      } ${state && styles.rotate}`}
    >
      {char}
    </div>
  );
};

export default Tile;
