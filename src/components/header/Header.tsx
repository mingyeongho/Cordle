import styles from "../../styles/header/_header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRepeat,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { LOGO } from "../files/constants";
import { useEffect, useState } from "react";

const LIGHT = <FontAwesomeIcon icon={faToggleOff} />;
const DARK = <FontAwesomeIcon icon={faToggleOn} />;
const REPEAT = <FontAwesomeIcon icon={faRepeat} />;

const Header = () => {
  // media query중 운영체제가 현재 가지고 있는 theme
  const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  // dark theme 면 prefersColorScheme.matches 가 true를 가짐
  let theme = prefersColorScheme.matches ? "dark" : "light";

  // localStorage가 있으면 localStorage의 값으로 설정하고 없으면 운영체제에서 가져옴
  const [currentTheme, setCurrentTheme] = useState<string>(
    localStorage.getItem("theme") ?? theme
  );

  // button을 누르면 localStorage가 바뀜.
  useEffect(() => {
    if (currentTheme === "dark") {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    } else if (currentTheme === "light") {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    }
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const onClickToggleBtn = () => {
    setCurrentTheme((prev) => {
      return prev === "dark" ? "light" : "dark";
    });
  };

  const onClickReset = () => {
    // localStorage를 비우기
    localStorage.clear();
    // 새로고침
    location.reload();
  };

  return (
    <header className={styles.header_container}>
      <button className={styles.icon} onClick={onClickReset}>
        {REPEAT}
      </button>
      <h1>{LOGO}</h1>
      <button className={styles.icon} onClick={onClickToggleBtn}>
        {currentTheme === "dark" ? DARK : LIGHT}
      </button>
    </header>
  );
};

export default Header;
