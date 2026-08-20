import styles from "./MathContentArea.module.css";

export default function MathContentArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.contentArea}>{children}</main>;
}
