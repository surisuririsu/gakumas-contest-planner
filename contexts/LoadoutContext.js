import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoadoutContext = createContext();

export function LoadoutContextProvider({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialItems = searchParams.get("items") || "0-0-0-0";
  const initialCards = searchParams.get("cards") || "0-0-0-0-0-0";

  const [items, setItems] = useState(
    initialItems.split("-").map((n) => parseInt(n, 10))
  );
  const [cardGroups, setCardGroups] = useState(
    initialCards
      .split("_")
      .map((group) => group.split("-").map((n) => parseInt(n, 10)))
  );
  const [selection, setSelection] = useState(null);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

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
    setSelection(null);
  };

  const deleteCardGroup = (groupIndex) => {
    setCardGroups((currentCards) => {
      const newCards = [...currentCards];
      newCards.splice(groupIndex, 1);
      return newCards;
    });
    setSelection(null);
  };

  const swapCardGroups = (groupIndexA, groupIndexB) => {
    setCardGroups((currentCards) => {
      const newCards = [...currentCards];
      const temp = newCards[groupIndexA];
      newCards[groupIndexA] = newCards[groupIndexB];
      newCards[groupIndexB] = temp;
      return newCards;
    });
    setSelection(null);
  };

  return (
    <LoadoutContext.Provider
      value={{
        items,
        cardGroups,
        changeItem,
        changeCard,
        insertCardGroup,
        deleteCardGroup,
        swapCardGroups,
        selection,
        setSelection,
      }}
    >
      {children}
    </LoadoutContext.Provider>
  );
}

export default LoadoutContext;
