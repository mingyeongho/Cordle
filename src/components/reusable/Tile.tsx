import styles from "../../styles/reusable/_tile.module.scss";
import { TileProps } from "../files/interface";

const Tile = ({ char, state }: TileProps) => {
  return (
    <div
      className={`tile ${state && "rotate"} 
      ${char && "fill"} ${styles.tile_container} ${state && styles[state]}`}
    >
      {char}
    </div>
  );
};

export default Tile;
