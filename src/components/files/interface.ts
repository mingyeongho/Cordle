import { Dispatch, SetStateAction } from "react";

export interface KeyProps {
  char: string;
  state?: string;
}

export interface TileProps {
  char: string;
  state?: string;
}

export interface PositionProps {
  i: number;
  j: number;
}

export interface ModalProps {
  children: JSX.Element;
}

export interface GameOverProps {
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

export interface BoardProps {
  answer: string;
}

export interface KeyboardProps {
  answer: string;
}

export interface CompareProps {
  answer: string;
  guess: string;
}
