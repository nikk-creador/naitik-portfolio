import React from "react";
import { Typography, Space } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import styled from "styled-components";
import { COLORS } from "../../theme/Theme";
import { Button, SectionWrapper } from "../../components/common/Index";

const { Title, Paragraph } = Typography;

const HeroContainer = styled(SectionWrapper)`
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding-left: 0;
  padding-right: 0

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #f7f6f2 0%, #efefeb 100%);
    pointer-events: none;
    z-index: -1;
  }
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Kicker = styled(Paragraph)`
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${COLORS.neutral[500]};
  margin-bottom: 12px !important;
`;

const NameTitle = styled(Title)`
  margin-bottom: 16px !important;
  color: ${COLORS.neutral[900]};
  letter-spacing: 0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem !important;
  }
`;

const Subtitle = styled(Paragraph)`
  font-size: 1.05rem;
  color: ${COLORS.neutral[600]};
  margin-bottom: 32px !important;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const RoleBadge = styled(motion.span)`
  display: inline-block;
  background: transparent;
  color: ${COLORS.neutral[700]};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border: 1px dashed rgba(11, 11, 11, 0.4);
`;

const CTAContainer = styled(Space)`
  gap: 16px !important;

  @media (max-width: 768px) {
    flex-direction: column !important;
    width: 100%;

    .ant-space-item {
      flex: 1;
    }
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;

  .shape {
    position: absolute;
    border-radius: 999px;
    background: linear-gradient(135deg, #e6e5dd, #f7f6f2);
    opacity: 0.18;

    &:nth-child(1) {
      width: 240px;
      height: 240px;
      top: 10%;
      right: 8%;
      animation: float 7s ease-in-out infinite;
    }

    &:nth-child(2) {
      width: 200px;
      height: 200px;
      bottom: 18%;
      left: 6%;
      animation: float 9s ease-in-out infinite reverse;
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
`;

const Hero: React.FC = () => {
  const [cursorPos, setCursorPos] = React.useState({ x: 50, y: 50 });

  React.useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setCursorPos({
        x: (e.clientX / innerWidth) * 100,
        y: (e.clientY / innerHeight) * 100,
      });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const scrollToWorks = () => {
    const target = document.getElementById("works");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HeroContainer id="hero" background="gradient" padding="none">
      <FloatingShapes>
        <motion.div
          className="shape"
          style={{
            filter: "blur(45px)",
            opacity: 0.35,
            position: "absolute",
            inset: 0,
            background: `radial-gradient(180px at ${cursorPos.x}% ${cursorPos.y}%, rgba(225, 6, 0, 0.25), transparent 60%)`,
          }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        />
        <div className="shape" />
      </FloatingShapes>

      <HeroContent
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <RoleBadge
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            Web & Mobile Engineer
          </RoleBadge>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Kicker>Digital products with clarity and confidence</Kicker>
        </motion.div>

        <motion.div variants={itemVariants}>
          <NameTitle level={1}>Naitik Bhavsar</NameTitle>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Subtitle>
            I create thoughtful, high-quality digital products with a focus on
            usability, performance, and maintainability.
          </Subtitle>
        </motion.div>

        <motion.div variants={itemVariants}>
          <CTAContainer size="large">
            <Button
              variant="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={scrollToWorks}
            >
              Explore the work
            </Button>
          </CTAContainer>
        </motion.div>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
