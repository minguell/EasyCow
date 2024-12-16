import styles from "./page.module.css";
import Login from "../components/Login/Login";
import Banner from "../components/Banner/Banner";


export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "5px" }}>
      <Banner />
      <Login />
    </div>
  );
}