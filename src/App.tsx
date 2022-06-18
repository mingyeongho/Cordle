import styles from "./App.module.scss";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  return (
    <div className={styles.App}>
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;
