import React from "react";
import { Typography as AntTypography } from "antd";
import styled from "styled-components";
import { TYPOGRAPHY, COLORS } from "../../theme/Theme";

const { Text, Title, Paragraph } = AntTypography;

type TypographyProps = {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption";
  color?: "primary" | "secondary" | "text" | "muted";
  children: React.ReactNode;
  className?: string;
};

const StyledTypography = styled.div<TypographyProps>`
  color: ${(props) => {
    switch (props.color) {
      case "primary":
        return COLORS.primary[600];
      case "secondary":
        return COLORS.neutral[600];
      case "muted":
        return COLORS.neutral[400];
      default:
        return COLORS.neutral[900];
    }
  }};

  ${(props) => {
    const style = TYPOGRAPHY[props.variant || "body1"];
    return `
      font-size: ${style.fontSize};
      font-weight: ${style.fontWeight};
      line-height: ${style.lineHeight};
      letter-spacing: ${"letterSpacing" in style ? style.letterSpacing : "normal"};
    `;
  }}
`;

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  color = "text",
  children,
  className,
  ...props
}) => {
  return (
    <StyledTypography
      variant={variant}
      color={color}
      className={className}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

export { Title, Text, Paragraph };
export default Typography;
