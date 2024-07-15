import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const IdolContext = createContext();

export function IdolContextProvider({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan");
  const initialIdol = searchParams.get("idol");

  const [plan, setPlan] = useState(initialPlan || "sense");
  const [idol, setIdol] = useState(initialIdol || 1);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.push(`/?${createQueryString("plan", plan)}`);
  }, [plan]);

  useEffect(() => {
    router.push(`/?${createQueryString("idol", idol)}`);
  }, [idol]);

  const writeUrlToClipboard = () => {
    navigator.clipboard.writeText(
      `https://gkcontest.ris.moe/?${searchParams.toString()}`
    );
  };

  return (
    <IdolContext.Provider
      value={{
        plan,
        idol,
        setPlan,
        setIdol,
        writeUrlToClipboard,
      }}
    >
      {children}
    </IdolContext.Provider>
  );
}

export default IdolContext;
