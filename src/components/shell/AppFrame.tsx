import MathHeader from "./MathHeader";
import MathToolbar from "./MathToolbar";
import MathContentArea from "./MathContentArea";
import MathStatusBar from "./MathStatusBar";
import styles from "./AppFrame.module.css";

export default function AppFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.frame}>
      <MathHeader />
      <MathToolbar />
      <MathContentArea>{children}</MathContentArea>
      <MathStatusBar />
    </div>
  );
}
