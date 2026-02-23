import React from "react";
import { Typography, Space, Tag } from "antd";
import { motion } from "framer-motion";
import styled from "styled-components";
import { COLORS } from "../../theme/Theme";
import { FEATURED_WORK, ROLE_ITEMS, SERVICE_ITEMS } from "../../data/Home";
import Hero from "./Hero";
import { BlogSection } from "./Blog";
import { SectionWrapper, Container, Card } from "../common/Index";
import { ScrollCard } from "../common/Animations";

const { Title, Paragraph, Text } = Typography;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const Eyebrow = styled(Text)`
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${COLORS.neutral[500]};
  font-size: 0.65rem;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const RoleStack = styled.div`
  display: grid;
  gap: 0;
  border-top: 1px solid rgba(11, 11, 11, 0.14);
`;

const RoleItem = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(11, 11, 11, 0.14);
`;

const RoleKicker = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.6rem;
  color: ${COLORS.neutral[500]};
`;

const RoleTitle = styled(Text)`
  font-size: 1rem;
  font-weight: 600;
  color: ${COLORS.neutral[900]};
  display: block;
`;

const RoleMeta = styled(Text)`
  color: ${COLORS.neutral[600]};
  font-size: 0.85rem;
`;

const RoleTime = styled(Text)`
  color: ${COLORS.neutral[600]};
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const MutedTag = styled(Tag)`
  background: transparent !important;
  border-color: rgba(11, 11, 11, 0.45) !important;
  color: ${COLORS.neutral[900]} !important;
  border-radius: 999px !important;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.6rem;
  border-style: dashed;
  padding: 2px 10px;
`;

const Home: React.FC = () => (
  <motion.div
    key="home"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Hero />

    <SectionWrapper id="works" background="white">
      <Container>
        <SectionHeader>
          <div>
            <Eyebrow>Featured work</Eyebrow>
            <Title level={2} style={{ marginTop: 8 }}>
              Selected digital products
            </Title>
          </div>
          <Text type="secondary">Case studies and shipped products</Text>
        </SectionHeader>

        <FeaturedGrid>
          {FEATURED_WORK.map((item, index) => (
            <ScrollCard key={item.title} index={index}>
              <Card variant="outlined" hoverable>
                <Space direction="vertical" size="small">
                  <Title level={4}>{item.title}</Title>
                  <Paragraph type="secondary">{item.desc}</Paragraph>
                  <Space size={[8, 8]} wrap>
                    {item.tags.map((tag) => (
                      <MutedTag key={tag}>{tag}</MutedTag>
                    ))}
                  </Space>
                </Space>
              </Card>
            </ScrollCard>
          ))}
        </FeaturedGrid>
      </Container>
    </SectionWrapper>

    <SectionWrapper id="services" background="subtle">
      <Container>
        <SectionHeader>
          <div>
            <Eyebrow>Services</Eyebrow>
            <Title level={2} style={{ marginTop: 8 }}>
              Focused, modern delivery
            </Title>
          </div>
          <Text type="secondary">
            Clear product thinking with reliable execution
          </Text>
        </SectionHeader>

        <ServicesGrid>
          {SERVICE_ITEMS.map((item, index) => (
            <ScrollCard key={item.title} index={index}>
              <Card variant="outlined" hoverable>
                <Space direction="vertical" size="small">
                  <Title level={4}>{item.title}</Title>
                  <Paragraph type="secondary">{item.description}</Paragraph>
                </Space>
              </Card>
            </ScrollCard>
          ))}
        </ServicesGrid>
      </Container>
    </SectionWrapper>

    <SectionWrapper id="about" background="white">
      <Container>
        <SectionHeader>
          <div>
            <Eyebrow>About</Eyebrow>
            <Title level={2} style={{ marginTop: 8 }}>
              Product-first engineering
            </Title>
          </div>
          <Text type="secondary">Navsari, Gujarat, India</Text>
        </SectionHeader>

        <AboutGrid>
          <Paragraph>
            I build performance-driven web and mobile products that prioritize
            speed, clarity, and reliability. My experience includes POS systems,
            data-heavy dashboards, and hospitality platforms where precision and
            responsiveness are critical.
          </Paragraph>

          <RoleStack>
            {ROLE_ITEMS.map((role) => (
              <RoleItem key={`${role.company}-${role.title}`}>
                <Space direction="vertical" size={4}>
                  <RoleKicker>{role.status}</RoleKicker>
                  <RoleTitle>{role.title}</RoleTitle>
                  <RoleMeta>{role.company}</RoleMeta>
                </Space>
                <RoleTime>{role.timeline}</RoleTime>
              </RoleItem>
            ))}
          </RoleStack>
        </AboutGrid>
      </Container>
    </SectionWrapper>

    <BlogSection />
  </motion.div>
);

export default Home;
