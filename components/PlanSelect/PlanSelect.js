import IconSelect from "@/components/IconSelect";

const PLANS = ["sense", "logic"];

export default function PlanSelect({ selected, onChange }) {
  return (
    <IconSelect
      options={PLANS.map((plan) => ({
        alias: plan,
        iconSrc: `/plans/${plan}.png`,
      }))}
      selected={selected}
      onChange={onChange}
    />
  );
}
