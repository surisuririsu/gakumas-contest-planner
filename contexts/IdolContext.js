import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const IdolContext = createContext();

export function IdolContextProvider({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan");
  const initialIdol = searchParams.get("idol");
  const initialItems = searchParams.get("items") || "0-0-0-0";
  const initialCards = searchParams.get("cards") || "0-0-0-0-0-0";

  const [plan, setPlan] = useState(initialPlan || "sense");
  const [idol, setIdol] = useState(initialIdol || "saki");
  const [items, setItems] = useState(
    initialItems.split("-").map((n) => parseInt(n, 10))
  );
  const [cardGroups, setCardGroups] = useState(
    initialCards
      .split("_")
      .map((group) => group.split("-").map((n) => parseInt(n, 10)))
  );

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.replace(`/?${createQueryString("plan", plan)}`);
  }, [plan]);

  useEffect(() => {
    router.replace(`/?${createQueryString("idol", idol)}`);
  }, [idol]);

  useEffect(() => {
    router.replace(`/?${createQueryString("items", items.join("-"))}`);
  }, [items]);

  useEffect(() => {
    router.replace(
      `/?${createQueryString(
        "cards",
        cardGroups.map((group) => group.join("-")).join("_")
      )}`
    );
  }, [cardGroups]);

  const changeItem = (index, itemId) => {
    setItems((currentItems) => {
      const newItems = [...currentItems];
      newItems[index] = itemId;
      return newItems;
    });
  };

  const changeCard = (index, cardId) => {
    setCardGroups((currentCards) => {
      const newCards = [...currentCards];
      newCards[index[0]][index[1]] = cardId;
      return newCards;
    });
  };

  return (
    <IdolContext.Provider
      value={{
        plan,
        idol,
        items,
        cardGroups,
        setPlan,
        setIdol,
        changeItem,
        changeCard,
      }}
    >
      {children}
    </IdolContext.Provider>
  );
}

export default IdolContext;
