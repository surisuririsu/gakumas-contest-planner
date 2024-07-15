import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LEGACY_IDOL_MAP,
  LEGACY_ITEM_MAP,
  LEGACY_CARD_MAP,
} from "@/utils/legacy";

const LoadoutContext = createContext();

export function LoadoutContextProvider({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLegacy = LEGACY_IDOL_MAP[searchParams.get("idol")];
  let initialItems = searchParams.get("items") || "0-0-0-0";
  let initialCards = searchParams.get("cards") || "0-0-0-0-0-0_0-0-0-0-0-0";
  initialItems = initialItems.split("-").map((n) => parseInt(n, 10));
  initialCards = initialCards
    .split("_")
    .map((group) => group.split("-").map((n) => parseInt(n, 10)));
  if (isLegacy) {
    initialItems = initialItems.map((item) => LEGACY_ITEM_MAP[item] || item);
    initialCards = initialCards.map((group) =>
      group.map((card) => LEGACY_CARD_MAP[card] || card)
    );
  }

  const [items, setItems] = useState(initialItems);
  const [cardGroups, setCardGroups] = useState(initialCards);
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
