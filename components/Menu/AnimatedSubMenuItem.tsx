import React from "react";
import { motion } from "framer-motion";
import { itemVariants, submenuVariants } from "@/utils/menuAnimationVarients";
import Link from "next/link";

export default function AnimatedSubMenuItem(props: any) {
  return (
    <motion.div
      variants={submenuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="dropdown-menu show p-0 mt-2 shadow rounded"
      style={{ position: "absolute", top: "100%", left: 0, zIndex: 1050 }}
    >
      <ul className="list-unstyled m-0">
        {props.item.subitems.value.map((child: any, j: number) => (
          <motion.li
            key={j}
            variants={itemVariants}
            className="px-3 py-2 dropdown-item text-wrap"
          >
            <Link href={child.link.value} passHref>
              <span className="text-dark fw-medium text-decoration-none hover-primary transition">
                {child.name.value}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
