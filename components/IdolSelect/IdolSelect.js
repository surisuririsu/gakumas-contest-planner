import IconSelect from "@/components/IconSelect";

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

export default function IdolSelect({ selected, onChange }) {
  return (
    <IconSelect
      options={IDOLS.map((idol) => ({
        alias: idol,
        iconSrc: `/idols/${idol}.png`,
      }))}
      selected={selected}
      onChange={onChange}
    />
  );
}
