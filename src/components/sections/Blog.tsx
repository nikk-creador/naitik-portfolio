import React from "react";
import { Typography, Space, Tag } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import type { IconType } from "react-icons";
import { SiReact, SiRedux, SiTypescript } from "react-icons/si";
import { FiCode, FiTool } from "react-icons/fi";
import { BLOG_POSTS } from "../../data/Blog";
import { COLORS } from "../../theme/Theme";
import { Container, SectionWrapper, Card, Button } from "../common/Index";
import { ScrollCard } from "../common/Animations";
import type { BlogPost } from "../../types/Content";

const { Title, Paragraph, Text } = Typography;

type BlogBackground = {
  gradient: string;
  image?: string;
  accent: string;
};

const BLOG_BACKGROUNDS_BY_TITLE: Record<string, BlogBackground> = {
  "state management made simple with zustand": {
    gradient: "linear-gradient(135deg, #f7f6f2, #efefeb)",
    image: "/placeholders/blog-1.svg",
    accent: "#b3b0a3",
  },
  "react hooks you actually reach for": {
    gradient: "linear-gradient(135deg, #f7f6f2, #efefeb)",
    image: "/placeholders/blog-2.svg",
    accent: "#8c887d",
  },
  "debugging react native with flipper": {
    gradient: "linear-gradient(135deg, #f7f6f2, #efefeb)",
    image: "/placeholders/blog-3.svg",
    accent: "#5f5b53",
  },
  "react native + typescript with the new architecture": {
    gradient: "linear-gradient(135deg, #f7f6f2, #efefeb)",
    image: "/placeholders/blog-4.svg",
    accent: "#e6e5dd",
  },
};

const resolveBlogBackground = (post: BlogPost): BlogBackground => {
  const key = post.title.trim().toLowerCase();
  return (
    BLOG_BACKGROUNDS_BY_TITLE[key] ?? {
      gradient: post.gradient,
      image: post.image,
      accent: "#8c887d",
    }
  );
};

const TECH_ICONS: Record<string, IconType> = {
  react: SiReact,
  "react native": SiReact,
  hooks: SiReact,
  zustand: SiRedux,
  state: SiRedux,
  flipper: FiTool,
  debugging: FiCode,
  typescript: SiTypescript,
  fabric: SiReact,
  patterns: FiCode,
};

const resolveTechIcon = (tag: string): IconType => {
  const key = tag.trim().toLowerCase();
  return TECH_ICONS[key] ?? FiCode;
};

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(Card)<{ $accent: string }>`
  position: relative;
  background: ${COLORS.neutral[900]};
  border: 1px solid ${({ $accent }) => `${$accent}55`};
  color: #ffffff;
  min-height: 340px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    background-position 0.3s ease,
    filter 0.3s ease;

  .ant-card-body {
    padding: 0;
    gap: 12px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: inherit;
    pointer-events: none;
  }

  &::before {
    content: "";
    position: absolute;
    left: -20%;
    right: -20%;
    bottom: -40%;
    height: 52%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.25),
      rgba(255, 255, 255, 0)
    );
    pointer-events: none;
    z-index: 0;
    opacity: 0.65;
  }

  h4.ant-typography {
    color: #ffffff;
    letter-spacing: -0.01em;
    margin-bottom: 6px;
  }

  p.ant-typography {
    color: rgba(255, 255, 255, 0.78);
  }

  &:hover {
    transform: translateY(-6px);
    filter: saturate(1.02);
    box-shadow:
      0 18px 42px rgba(5, 8, 18, 0.42),
      0 0 0 1px ${({ $accent }) => `${$accent}99`};
    border-color: ${({ $accent }) => `${$accent}99`};
  }

  &:focus-within {
    box-shadow:
      0 18px 38px rgba(0, 0, 0, 0.16),
      0 0 0 2px rgba(11, 11, 11, 0.28);
    border-color: rgba(11, 11, 11, 0.45);
  }
`;

const BlogMedia = styled.div<{
  $gradient: string;
  $image?: string;
  $accent: string;
}>`
  position: absolute;
  inset: 0;
  height: 100%;
  border-radius: inherit;
  background: ${({ $gradient, $image }) =>
    $image
      ? `linear-gradient(165deg, rgba(11,11,11,0.2), rgba(11,11,11,0.6)), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.12), rgba(255,255,255,0)), url(${$image}) center/cover no-repeat`
      : $gradient};
  margin-bottom: 0;
  box-shadow: none;
  overflow: hidden;
  filter: saturate(0.58) contrast(1.05);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.26),
      rgba(0, 0, 0, 0.74)
    );
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  ${BlogCard}:hover &::after {
    opacity: 0.56;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $accent }) =>
      `linear-gradient(140deg, ${$accent}1f 0%, transparent 52%, ${$accent}47 100%)`};
    mix-blend-mode: soft-light;
    opacity: 0.3;
    pointer-events: none;
  }
`;

const DetailMedia = styled.div<{ $gradient: string; $image?: string }>`
  width: 100%;
  height: 240px;
  border-radius: 16px;
  background: ${({ $gradient, $image }) =>
    $image
      ? `linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.32)), url(${$image}) center/cover`
      : $gradient};
  margin: 0 0 20px;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.18),
      rgba(0, 0, 0, 0.5)
    );
    pointer-events: none;
  }
`;

const CodeBlock = styled.pre`
  width: 100%;
  background: #0b0b0b;
  color: #efefeb;
  padding: 16px 18px;
  border-radius: 12px;
  overflow: auto;
  font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const DetailShell = styled.div`
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const TagRow = styled(Space)`
  flex-wrap: wrap;
`;

const BlogOverlay = styled.div`
  position: relative;
  z-index: 1;
  padding: 26px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  text-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);

  .ant-typography,
  .ant-typography.ant-typography-secondary {
    color: #ffffff !important;
  }
`;

const OverlayTag = styled(Tag)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.18) !important;
  border-color: rgba(255, 255, 255, 0.6) !important;
  color: #ffffff !important;
  border-radius: 999px !important;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.6rem;
  padding: 2px 10px;
`;

const MutedTag = styled(Tag)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent !important;
  border-color: rgba(11, 11, 11, 0.45) !important;
  color: #0b0b0b !important;
  border-radius: 999px !important;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.6rem;
  border-style: dashed;
  padding: 2px 10px;
`;

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
  color: #8c887d;
  font-size: 0.65rem;
`;

export const BlogSection: React.FC = () => (
  <SectionWrapper id="blog" background="subtle">
    <Container>
      <SectionHeader>
        <div>
          <Eyebrow>Writing</Eyebrow>
          <Title level={3} style={{ marginTop: 8 }}>
            Notes from the build log
          </Title>
        </div>
        <Text type="secondary">
          Short reads on process, decisions, and shipped work
        </Text>
      </SectionHeader>

      <BlogGrid>
        {BLOG_POSTS.map((post, index) => {
          const bg = resolveBlogBackground(post);
          return (
            <ScrollCard key={post.title} index={index}>
              <Link
                to={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <BlogCard variant="outlined" hoverable $accent={bg.accent}>
                  <BlogMedia
                    $gradient={bg.gradient}
                    $image={bg.image}
                    $accent={bg.accent}
                  />
                  <BlogOverlay>
                    <Space size={[8, 8]} wrap>
                      {post.tags.map((tag) => (
                        <OverlayTag key={tag}>
                          {React.createElement(resolveTechIcon(tag), {
                            size: 11,
                          })}
                          {tag}
                        </OverlayTag>
                      ))}
                    </Space>
                    <Title level={3}>{post.title}</Title>
                    <Paragraph type="secondary">{post.desc}</Paragraph>
                  </BlogOverlay>
                </BlogCard>
              </Link>
            </ScrollCard>
          );
        })}
      </BlogGrid>
    </Container>
  </SectionWrapper>
);

export const BlogDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!post) {
    return (
      <SectionWrapper background="white">
        <Container>
          <Space direction="vertical" size="large">
            <Title level={3}>Post not found</Title>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back home
            </Button>
          </Space>
        </Container>
      </SectionWrapper>
    );
  }

  const bg = resolveBlogBackground(post);

  return (
    <SectionWrapper background="white">
      <Container>
        <DetailShell>
          <Button variant="outline" onClick={() => navigate(-1)}>
            {"\u2190"} Back
          </Button>
          <DetailMedia $gradient={bg.gradient} $image={bg.image} />
          <Title level={2}>{post.title}</Title>
          <Paragraph type="secondary">{post.desc}</Paragraph>
          <TagRow size={[8, 8]}>
            {post.tags.map((tag) => (
              <MutedTag key={tag}>
                {React.createElement(resolveTechIcon(tag), { size: 12 })}
                {tag}
              </MutedTag>
            ))}
          </TagRow>
          {post.body.map((para, idx) => (
            <Paragraph key={`${post.slug}-${idx}`}>{para}</Paragraph>
          ))}
          {post.snippets?.map((snippet) => (
            <Space key={snippet.title} direction="vertical" size="small">
              <Text strong>{snippet.title}</Text>
              <CodeBlock>{snippet.code}</CodeBlock>
            </Space>
          ))}
        </DetailShell>
      </Container>
    </SectionWrapper>
  );
};
