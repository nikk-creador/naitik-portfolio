import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { GLOBAL_STYLES } from "../../theme/Theme";
import { Button, SoundLines } from "../common/Index";

const { Footer: AntFooter } = Layout;
const { Text, Paragraph, Title } = Typography;

const StyledFooter = styled(AntFooter)`
  background: #efefeb;
  color: #0b0b0b;
  border-top: 1px solid rgba(11, 11, 11, 0.16);
  position: relative;
  overflow: hidden;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.3;
  filter: blur(80px);

  span {
    position: absolute;
    border-radius: 999px;
    background: radial-gradient(
      circle,
      rgba(11, 11, 11, 0.08) 0%,
      transparent 60%
    );
  }

  .blob-1 {
    width: 360px;
    height: 360px;
    top: -40px;
    left: -80px;
  }

  .blob-2 {
    width: 320px;
    height: 320px;
    bottom: -120px;
    right: -40px;
  }
`;

const FooterContainer = styled(motion.div)`
  max-width: ${GLOBAL_STYLES.containerMaxWidth};
  margin: 0 auto;
  padding: 72px ${GLOBAL_STYLES.containerPadding} 40px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 48px ${GLOBAL_STYLES.containerPaddingMobile} 32px;
  }
`;

const FooterTitle = styled(Title)`
  margin-bottom: 16px !important;
  color: #0b0b0b !important;
  text-align: left;
`;

const FooterLink = styled(motion.a)`
  color: #5f5b53;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  transition: ${GLOBAL_STYLES.transition};

  &:hover {
    color: #0b0b0b;
  }
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #5f5b53;
  font-size: 0.85rem;
  text-align: left;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 14px;
  justify-content: flex-start;

  a {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 999px;
    border: 1px solid rgba(11, 11, 11, 0.22);
    color: #5f5b53;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 4px 10px rgba(11, 11, 11, 0.06);
    transition:
      transform 0.14s ease,
      border-color 0.14s ease,
      color 0.14s ease,
      box-shadow 0.14s ease,
      background-color 0.14s ease;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(
        circle at 30% 20%,
        rgba(11, 11, 11, 0.12),
        transparent 62%
      );
      opacity: 0;
      transition: opacity 0.14s ease;
    }

    .anticon {
      position: relative;
      z-index: 1;
      transition: transform 0.14s ease;
    }

    &:hover {
      border-color: rgba(11, 11, 11, 0.4);
      color: #0b0b0b;
      background: #ffffff;
      box-shadow: 0 12px 24px rgba(11, 11, 11, 0.14);
      transform: translateY(-4px) scale(1.04);
    }

    &:hover::before {
      opacity: 1;
    }

    &:hover .anticon {
      transform: scale(1.08);
    }

    &:focus-visible {
      outline: none;
      border-color: #0b0b0b;
      box-shadow: 0 0 0 3px rgba(11, 11, 11, 0.16);
    }

    &:active {
      transform: translateY(-1px) scale(0.98);
      box-shadow: 0 6px 12px rgba(11, 11, 11, 0.1);
    }
  }

  a:nth-child(1):hover {
    color: #171515;
  }

  a:nth-child(2):hover {
    color: #0a66c2;
  }

  a:nth-child(3):hover {
    color: #c71610;
  }

  @media (prefers-reduced-motion: reduce) {
    a,
    a::before,
    a .anticon {
      transition: none;
    }
  }
`;

const ScrollTopButton = styled(motion.button)`
  position: fixed;
  bottom: 36px;
  right: 36px;
  z-index: 1000;
  border: none;
  border-radius: 999px;
  background: #0b0b0b;
  color: #ffffff;
  padding: 12px 14px;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const GradientDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: 32px 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(11, 11, 11, 0.28) 18%,
    rgba(11, 11, 11, 0.06) 50%,
    rgba(11, 11, 11, 0.28) 82%,
    transparent 100%
  );
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.12);
`;

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <StyledFooter id="footer">
      <Backdrop aria-hidden>
        <span className="blob-1" />
        <span className="blob-2" />
      </Backdrop>
      <SoundLines position="bottom" fixed={false} />
      <FooterContainer
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Row gutter={[48, 32]}>
          <Col
            xs={24}
            lg={10}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <motion.div variants={ITEM_VARIANTS}>
              <FooterTitle level={4}>Available for new work</FooterTitle>
              <Paragraph style={{ color: "#5f5b53", maxWidth: 440 }}>
                Web + React Native engineer focused on shipping clean, fast
                interfaces with thoughtful motion.
              </Paragraph>

              <Button
                variant="primary"
                size="large"
                href="mailto:dev.naitik17@gmail.com"
                style={{
                  background: "#0b0b0b",
                  borderColor: "#0b0b0b",
                }}
              >
                Say hello
              </Button>
            </motion.div>
          </Col>

          <Col
            xs={24}
            sm={12}
            lg={7}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <motion.div variants={ITEM_VARIANTS}>
              <FooterTitle level={5}>Navigation</FooterTitle>
              <Space direction="vertical" size="small">
                {[
                  { label: "Home", href: "#hero" },
                  { label: "Work", href: "#works" },
                  { label: "Services", href: "#services" },
                  { label: "About", href: "#about" },
                  { label: "Blog", href: "#blog" },
                ].map((item) => (
                  <FooterLink
                    key={item.href}
                    href={item.href}
                    whileHover={{ x: 4 }}
                  >
                    {item.label}
                  </FooterLink>
                ))}
              </Space>
            </motion.div>
          </Col>

          <Col xs={24} sm={12} lg={7}>
            <motion.div variants={ITEM_VARIANTS}>
              <FooterTitle level={5}>Contact</FooterTitle>
              <Space direction="vertical" size="middle">
                <ContactItem whileHover={{ x: 4 }}>
                  <MailOutlined />
                  <a href="mailto:dev.naitik17@gmail.com">
                    dev.naitik17@gmail.com
                  </a>
                </ContactItem>
                <ContactItem whileHover={{ x: 4 }}>
                  <PhoneOutlined />
                  <a href="tel:+919316046227">+91 93160 46227</a>
                </ContactItem>
                <SocialLinks>
                  <motion.a
                    href="https://github.com/nikk-creador"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "tween", duration: 0.12, ease: "easeOut" }}
                  >
                    <GithubOutlined />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/naitik-bhavsar-b385051b0/"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "tween", duration: 0.12, ease: "easeOut" }}
                  >
                    <LinkedinOutlined />
                  </motion.a>
                  <motion.a
                    href="mailto:dev.naitik17@gmail.com"
                    aria-label="Email"
                    whileHover={{ y: -4, scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "tween", duration: 0.12, ease: "easeOut" }}
                  >
                    <MailOutlined />
                  </motion.a>
                </SocialLinks>
              </Space>
            </motion.div>
          </Col>
        </Row>

        <GradientDivider />

        <Row justify="space-between" align="middle">
          <Col>
            <Text style={{ color: "#8c887d", fontSize: "0.7rem" }}>
              (c) {currentYear} Naitik Bhavsar. Designed for clarity.
            </Text>
          </Col>
        </Row>
      </FooterContainer>

      <AnimatePresence>
        {isVisible && (
          <ScrollTopButton
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowUpOutlined />
          </ScrollTopButton>
        )}
      </AnimatePresence>
    </StyledFooter>
  );
};

export default Footer;
