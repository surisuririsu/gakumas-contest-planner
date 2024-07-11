import { useContext, useState } from "react";
import IconSelect from "@/components/IconSelect";
import IdolContext from "@/contexts/IdolContext";
import styles from "./Header.module.scss";

const PLANS = ["sense", "logic"];
const IDOLS = [
  "saki",
  "temari",
  "kotone",
  "mao",
  "lilja",
  "china",
  "sumika",
  "hiro",
  "ume",
  "rinami",
];

export default function Header() {
  const { plan, idol, setPlan, setIdol, writeUrlToClipboard } =
    useContext(IdolContext);
  const [copied, setCopied] = useState(false);

  return (
    <div className={styles.header}>
      <IconSelect
        options={PLANS.map((alias) => ({
          alias,
          iconSrc: `/plans/${alias}.png`,
        }))}
        selected={plan}
        onChange={setPlan}
      />
      <IconSelect
        options={IDOLS.map((alias) => ({
          alias,
          iconSrc: `/idols/${alias}.png`,
        }))}
        selected={idol}
        onChange={setIdol}
      />
      <button
        className={styles.copyLinkButton}
        onClick={() => {
          writeUrlToClipboard();
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        }}
      >
        {copied ? "✔️" : "🔗"}
      </button>
    </div>
  );
}
