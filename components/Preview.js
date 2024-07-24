import { PItems, SkillCards } from "gakumas-data";

const styles = {
  preview: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
    backgroundColor: "#f6f6f6",
  },
  row: { display: "flex", gap: "6px" },
  item: {
    width: "48px",
    height: "48px",
    display: "flex",
    border: "4px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#ddd",
    overflow: "hidden",
  },
  text: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#666",
    fontSize: "20px",
  },
  card: {
    width: "68px",
    height: "68px",
    display: "flex",
    border: "4px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#ddd",
    overflow: "hidden",
  },
};

export default function Preview({ baseUrl, items, cardGroups }) {
  return (
    <div style={styles.preview}>
      <div style={styles.row}>
        {items
          .slice(0, 4)
          .map(PItems.getById)
          .map((item, index) => (
            <div key={index} style={styles.item}>
              {item && (
                <img
                  src={`${baseUrl}${item.icon.src}`}
                  width={40}
                  height={40}
                />
              )}
            </div>
          ))}
        <div style={styles.text}>gkcontest.ris.moe</div>
      </div>
      {cardGroups.slice(0, 4).map((cards, groupIndex) => (
        <div key={groupIndex} style={styles.row}>
          {cards
            .slice(0, 6)
            .map(SkillCards.getById)
            .map((card, index) => (
              <div key={index} style={styles.card}>
                {card && (
                  <img
                    src={`${baseUrl}${card.icon.src}`}
                    width={60}
                    height={60}
                  />
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
