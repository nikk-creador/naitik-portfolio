import React, { useState, useEffect } from "react";
import { Layout, Drawer, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import styled from "styled-components";
import { GLOBAL_STYLES } from "../../theme/Theme";
import { Button as CustomButton } from "../common/Index";
import { useLocation, useNavigate } from "react-router-dom";
import type { NavSection } from "../../types/Content";

const { Header } = Layout;

const StyledHeader = styled(Header)`
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
  transition: ${GLOBAL_STYLES.transition};
  display: flex;
  align-items: center;
  min-height: 68px;
  padding: 0 24px;
`;

const NavContainer = styled.div`
  max-width: ${GLOBAL_STYLES.containerMaxWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  height: 100%;
  position: relative;
  width: 100%;
  background: #f7f6f2;
  border: 1px solid rgba(11, 11, 11, 0.2);
  border-radius: 999px;
  padding: 0 24px;
  min-height: 60px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    grid-template-columns: 1fr auto;
    padding: 0 16px;
    gap: 12px;
  }
`;

const Logo = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #0b0b0b;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    color: #0b0b0b;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.button)<{ $active?: boolean }>`
  position: relative;
  padding: 12px 14px 14px;
  border-radius: 999px;
  border: none;
  background: transparent;
  font: inherit;
  appearance: none;
  -webkit-appearance: none;
  color: ${({ $active }) => ($active ? "#0b0b0b" : "#5f5b53")};
  font-size: 0.7rem;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  transition: ${GLOBAL_STYLES.transition};
  text-decoration: none;
  backdrop-filter: none;
  cursor: pointer;
  line-height: 1;

  &::after {
    content: "";
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 6px;
    height: 2px;
    background: linear-gradient(90deg, #0b0b0b, #5f5b53);
    border-radius: 999px;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const MobileMenuButton = styled(Button)`
  display: none;
  border: none;
  box-shadow: none;
  color: #0b0b0b;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CTAButton = styled(CustomButton)`
  border-radius: 999px;
  background: #0b0b0b !important;
  border-color: #0b0b0b !important;
  color: #ffffff !important;

  &:hover {
    background: #1f1d1a !important;
    border-color: #1f1d1a !important;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

const MobileNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MobileNavLink = styled(motion.button)<{ $active?: boolean }>`
  padding: 12px 14px;
  border-radius: 12px;
  color: ${({ $active }) => ($active ? "#0b0b0b" : "#5f5b53")};
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  background: transparent;
  font: inherit;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(11, 11, 11, 0.4)" : "rgba(11, 11, 11, 0.18)"};
  transition: ${GLOBAL_STYLES.transition};

  &:hover {
    border-color: ${({ $active }) =>
      $active ? "rgba(11, 11, 11, 0.4)" : "rgba(11, 11, 11, 0.18)"};
  }
`;

type NavbarProps = {
  sections: NavSection[];
};

const Navbar: React.FC<NavbarProps> = ({ sections }) => {
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("#hero");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveKey(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.35 },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections, location.pathname]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 80);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <>
      <StyledHeader>
        <NavContainer>
          <button
            onClick={() => handleNavClick("hero")}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <Logo>
              <span>Naitik</span>
            </Logo>
          </button>

          <NavLinks>
            {sections.map((section) => {
              const key = `#${section.id}`;
              return (
                <NavLink
                  key={key}
                  onClick={() => handleNavClick(section.id)}
                  $active={activeKey === key}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {section.label}
                </NavLink>
              );
            })}
          </NavLinks>

          <NavActions>
            <CTAButton
              variant="primary"
              size="medium"
              href="mailto:dev.naitik17@gmail.com"
            >
              Hire me
            </CTAButton>
            <MobileMenuButton
              type="text"
              icon={<MenuOutlined />}
              onClick={showDrawer}
            />
          </NavActions>
        </NavContainer>
      </StyledHeader>

      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={visible}
        width={280}
        closable={false}
        styles={{
          header: { background: "#f7f6f2", color: "#0b0b0b" },
          body: { background: "#f7f6f2", color: "#0b0b0b" },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 16,
          }}
        >
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </div>

        <MobileNav>
          {sections.map((section) => {
            const key = `#${section.id}`;
            return (
              <MobileNavLink
                key={key}
                onClick={() => {
                  handleNavClick(section.id);
                  onClose();
                }}
                $active={activeKey === key}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {section.label}
              </MobileNavLink>
            );
          })}
        </MobileNav>

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <CustomButton
            variant="primary"
            size="large"
            fullWidth
            href="mailto:dev.naitik17@gmail.com"
          >
            Hire me
          </CustomButton>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
