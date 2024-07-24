"use client";
import { useContext, useState } from "react";
import { Idols } from "gakumas-data";
import IconSelect from "@/components/IconSelect";
import IdolContext from "@/contexts/IdolContext";
import styles from "./Header.module.scss";

const PLANS = ["sense", "logic"];

export default function Header() {
  const { plan, idol, setPlan, setIdol, writeUrlToClipboard } =
    useContext(IdolContext);
  const [copied, setCopied] = useState(false);

  return (
    <div className={styles.header}>
      <IconSelect
        options={PLANS.map((alias) => ({
          id: alias,
          iconSrc: `/plans/${alias}.png`,
        }))}
        selected={plan}
        onChange={setPlan}
      />
      <IconSelect
        options={Idols.getAll().map(({ id, icon }) => ({
          id,
          iconSrc: icon,
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
