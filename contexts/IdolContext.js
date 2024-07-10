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
    router.push(`/?${createQueryString("plan", plan)}`);
  }, [plan]);

  useEffect(() => {
    router.push(`/?${createQueryString("idol", idol)}`);
  }, [idol]);

  useEffect(() => {
    router.push(`/?${createQueryString("items", items.join("-"))}`);
  }, [items]);

  useEffect(() => {
    router.push(
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

  const insertCardGroup = (groupIndex) => {
    setCardGroups((currentCards) => {
      const newCards = [...currentCards];
      newCards.splice(groupIndex, 0, [0, 0, 0, 0, 0, 0]);
      return newCards;
    });
  };

  const deleteCardGroup = (groupIndex) => {
    setCardGroups((currentCards) => {
      const newCards = [...currentCards];
      newCards.splice(groupIndex, 1);
      return newCards;
    });
  };

  const swapCardGroups = (groupIndexA, groupIndexB) => {
    setCardGroups((currentCards) => {
      const newCards = [...currentCards];
      const temp = newCards[groupIndexA];
      newCards[groupIndexA] = newCards[groupIndexB];
      newCards[groupIndexB] = temp;
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
        insertCardGroup,
        deleteCardGroup,
        swapCardGroups,
      }}
    >
      {children}
    </IdolContext.Provider>
  );
}

export default IdolContext;
