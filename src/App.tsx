import { RecoilRoot } from "recoil";
import styles from "./_app.module.scss";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { ANSWER } from "./components/files/constants";

function App() {
  console.log(ANSWER);
  return (
    <RecoilRoot>
      <div className={styles.App}>
        <Header></Header>
        <Main></Main>
      </div>
    </RecoilRoot>
  );
}

export default App;
