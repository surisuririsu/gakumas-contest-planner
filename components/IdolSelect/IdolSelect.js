import { useContext } from "react";
import IconSelect from "@/components/IconSelect";
import IdolContext from "@/contexts/IdolContext";

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

export default function IdolSelect() {
  const { idol, setIdol } = useContext(IdolContext);
  return (
    <IconSelect
      options={IDOLS.map((alias) => ({
        alias,
        iconSrc: `/idols/${alias}.png`,
      }))}
      selected={idol}
      onChange={setIdol}
    />
  );
}
