import { ImageResponse } from "next/og";
import Preview from "@/components/Preview";
import {
  LEGACY_IDOL_MAP,
  LEGACY_ITEM_MAP,
  LEGACY_CARD_MAP,
} from "@/utils/legacy";

export async function GET(request) {
  const { searchParams, host, protocol } = new URL(request.url);
  const isLegacy = LEGACY_IDOL_MAP[searchParams.get("idol")];

  let items = searchParams.get("items") || "0-0-0-0";
  let cards = searchParams.get("cards") || "0-0-0-0-0-0_0-0-0-0-0-0";
  const empty = cards == "0-0-0-0-0-0_0-0-0-0-0-0";

  items = items.split("-").map((n) => parseInt(n, 10));
  cards = cards
    .split("_")
    .map((group) => group.split("-").map((n) => parseInt(n, 10)));

  if (isLegacy) {
    items = items.map((item) => LEGACY_ITEM_MAP[item] || item);
    cards = cards.map((group) =>
      group.map((card) => LEGACY_CARD_MAP[card] || card)
    );
  }

  const height =
    32 + // Margin
    48 + // P-Items
    (16 + 68 + (empty ? 0 : 8)) * Math.min(cards.length, 4) + // Card groups
    (empty ? 0 : 8); // Extra for cost

  return new ImageResponse(
    (
      <Preview
        baseUrl={`${protocol}//${host}`}
        items={items}
        cardGroups={cards}
        empty={empty}
      />
    ),
    { width: 470, height }
  );
}
