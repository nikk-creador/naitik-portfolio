import React from "react";
import styled from "styled-components";
import { GLOBAL_STYLES } from "../../theme/Theme";

type ContainerProps = {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "xxl";
  padding?: boolean;
  className?: string;
};

const StyledContainer = styled.div<{
  $maxWidth: ContainerProps["maxWidth"];
  $padding: boolean;
}>`
  width: 100%;
  max-width: ${(props) => {
    switch (props.$maxWidth) {
      case "sm":
        return "600px";
      case "md":
        return "900px";
      case "lg":
        return "1200px";
      case "xl":
        return "1500px";
      case "xxl":
        return "1800px";
      default:
        return GLOBAL_STYLES.containerMaxWidth;
    }
  }};
  margin: 0 auto;
  padding: ${(props) =>
    props.$padding ? GLOBAL_STYLES.containerPadding : "0"};

  @media (max-width: 768px) {
    padding: ${(props) =>
      props.$padding ? GLOBAL_STYLES.containerPaddingMobile : "0"};
  }
`;

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = "lg",
  padding = true,
  className,
}) => {
  return (
    <StyledContainer
      $maxWidth={maxWidth}
      $padding={padding}
      className={className}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;
