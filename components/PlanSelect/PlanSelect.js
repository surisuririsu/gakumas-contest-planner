import { useContext } from "react";
import IconSelect from "@/components/IconSelect";
import IdolContext from "@/contexts/IdolContext";

const PLANS = ["sense", "logic"];

export default function PlanSelect() {
  const { plan, setPlan } = useContext(IdolContext);
  return (
    <IconSelect
      options={PLANS.map((alias) => ({
        alias,
        iconSrc: `/plans/${alias}.png`,
      }))}
      selected={plan}
      onChange={setPlan}
    />
  );
}
