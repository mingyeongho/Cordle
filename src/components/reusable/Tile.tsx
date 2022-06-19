import styles from "../../styles/reusable/_tile.module.scss";
import { TileProps } from "../files/interface";

const Tile = ({ char, state }: TileProps) => {
  return (
    <div
      className={`tile ${styles.tile_container}  ${state && styles[state]} ${
        state && "rotate"
      } ${char && "fill"}`}
    >
      {char}
    </div>
  );
};

export default Tile;
