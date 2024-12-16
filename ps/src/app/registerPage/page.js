import styles from "./page.module.css";
import Banner from "../../components/Banner/Banner";
import Register from "../../components/Login/register";


export default function RegisterPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "5px" }}>
      <Banner />
      <Register />
    </div>
  );
}