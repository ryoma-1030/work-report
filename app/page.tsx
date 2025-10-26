import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <a href="http://localhost:3000/schedule">
        http://localhost:3000/scheduleへ移動
      </a>
    </div>
  );
}
