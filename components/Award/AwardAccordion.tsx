import { Awarditem2026 } from "@/models/awarditem2026";
import AwardSlider from "./AwardSlider";

interface Props {
  items: Awarditem2026[];
}

const AwardAccordion: React.FC<Props> = ({ items }) => {
  const grouped = groupAwardsByCategory(items);
  const categories = Object.keys(grouped);

  return (
    <div className="accordion" id="awardAccordion">
      {categories.map((category, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`heading-${index}`}>
            <button
              className={`accordion-button ${index !== 1 ? "collapsed" : ""}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${index}`}
              aria-expanded={index === 0}
              aria-controls={`collapse-${index}`}
            >
              {category}
            </button>
          </h2>
          <div
            id={`collapse-${index}`}
            className={`accordion-collapse collapse ${
              index === 0 ? "show" : ""
            }`}
            aria-labelledby={`heading-${index}`}
            data-bs-parent="#awardAccordion"
          >
            <div className="accordion-body">
              <AwardSlider items={grouped[category]} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AwardAccordion;

// Utility function
const groupAwardsByCategory = (items: Awarditem2026[]) => {
  const grouped: { [category: string]: Awarditem2026[] } = {};
  items.forEach((item) => {
    const categoryName = item.category.value[0]?.name || "Uncategorized";
    if (!grouped[categoryName]) {
      grouped[categoryName] = [];
    }
    grouped[categoryName].push(item);
  });
  return grouped;
};
