import { useRef } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";

const headingWordsEN = [
  { text: "Elevate Your", highlight: false },
  { text: "Presence.", highlight: true },
  { text: "Expand Your", highlight: false },
  { text: "Impact.", highlight: true },
];

const headingWordsCN = [
  { text: "参与全球化", highlight: false },
  { text: "布局.", highlight: true },
  { text: "扩大全球", highlight: false },
  { text: "影响力.", highlight: true },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const wordVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
  hover: {
    scale: 1.05,

    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function TargetCTA({ items }: { items: any[] }) {
  const cardsRef = useRef<any>(null);
  const { locale } = useRouter();

  // Pick heading words based on locale
  const headingWords = locale === "cn" ? headingWordsCN : headingWordsEN;

  return (
    <div className="target-cta-wrapper py-5 gradient-1">
      <div className="container">
        {/* — Heading with staggered word animation — */}
        <motion.h2
          className="section-heading-2026 mb-4 text-dark text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {headingWords.map((w, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={w.highlight ? "text-primary mx-3" : ""}
              style={{ display: "inline-block", marginRight: "" }}
            >
              {w.text}
            </motion.span>
          ))}
        </motion.h2>

        {/* — Cards row with container-level stagger and individual hover — */}
        <motion.div
          className="row g-4 py-5 justify-content-center"
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="col-6 col-lg-3"
              whileHover="hover"
            >
              <Link href={item.link.value}>
                <motion.h4
                  className="h5 d-flex align-items-center gap-2 mb-2"
                  initial={{ color: "#000", x: 0 }}
                  whileHover={{ x: 6, color: "#099ffc" }} // ← no semicolon here
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {item.name.value}
                  <FaArrowRight />
                </motion.h4>

                {/* Body copy fades in slightly later */}
                <motion.div
                  className="text-muted"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.content.value,
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
