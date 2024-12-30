import styles from "./ball.module.scss";
export const AnimatedBall = () => {
  return (
    <div className="relative h-64 w-64">
      <div className={`${styles.bouncingBall}`}></div>
    </div>
  );
};
