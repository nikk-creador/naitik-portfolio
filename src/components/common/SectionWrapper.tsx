import React from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { GLOBAL_STYLES, COLORS } from "../../theme/Theme";

type SectionWrapperProps = {
  children: React.ReactNode;
  id?: string;
  background?: "white" | "gradient" | "subtle";
  padding?: "none" | "normal" | "compact" | "extended";
  className?: string;
  reveal?: boolean;
  revealOnce?: boolean;
  revealAmount?: number;
  revealDelay?: number;
  revealYOffset?: number;
};

const StyledSection = styled(motion.section)<SectionWrapperProps>`
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: ${(props) =>
    props.padding === "none"
      ? "0"
      : props.padding === "compact"
      ? GLOBAL_STYLES.sectionPaddingMobile
      : props.padding === "extended"
        ? "120px 24px"
        : GLOBAL_STYLES.sectionPadding};

  ${(props) =>
    props.background === "gradient" &&
    `
    background: ${GLOBAL_STYLES.gradientBackground};
  `}

  ${(props) =>
    props.background === "subtle" &&
    `
    background: ${COLORS.neutral[50]};
  `}
  
  @media (max-width: 768px) {
    padding: ${(props) =>
      props.padding === "none"
        ? "0"
        : props.padding === "compact"
        ? GLOBAL_STYLES.sectionPaddingMobile
        : props.padding === "extended"
          ? "80px 20px"
          : GLOBAL_STYLES.sectionPaddingMobile};
  }
`;

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  background = "white",
  padding = "normal",
  className,
  reveal = true,
  revealOnce = true,
  revealAmount = 0.2,
  revealDelay = 0,
  revealYOffset = 36,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: revealYOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: "easeOut", delay: revealDelay },
        },
      };

  return (
    <StyledSection
      id={id}
      background={background}
      padding={padding}
      className={className}
      variants={reveal ? variants : undefined}
      initial={reveal ? "hidden" : undefined}
      whileInView={reveal ? "visible" : undefined}
      viewport={reveal ? { once: revealOnce, amount: revealAmount } : undefined}
    >
      {children}
    </StyledSection>
  );
};

export default SectionWrapper;
