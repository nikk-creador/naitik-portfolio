import React from "react";
import { Card as AntCard, CardProps as AntCardProps } from "antd";
import { styled } from "@mui/material/styles";
import { GLOBAL_STYLES, COLORS } from "../../theme/Theme";

export type CardProps = Omit<AntCardProps, "variant"> & {
  variant?: "elevated" | "outlined" | "filled";
  hoverable?: boolean;
};

const StyledCard = styled(AntCard, {
  shouldForwardProp: (prop) => prop !== "$variant" && prop !== "$hoverable",
})<{ $variant?: CardProps["variant"]; $hoverable?: boolean }>(
  ({ $variant = "elevated", $hoverable = true }) => ({
    borderRadius: GLOBAL_STYLES.borderRadius,
    transition: GLOBAL_STYLES.transition,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: COLORS.neutral[50],

    ...($variant === "elevated" && {
      border: `1px solid ${COLORS.neutral[200]}`,
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
      "&:hover": $hoverable
        ? {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 46px rgba(0, 0, 0, 0.12)",
        }
        : {},
    }),

    ...($variant === "outlined" && {
      border: `1px dashed ${COLORS.neutral[900]}`,
      boxShadow: "none",
      "&:hover": $hoverable
        ? {
          borderColor: COLORS.neutral[900],
          boxShadow: "0 16px 32px rgba(0, 0, 0, 0.12)",
        }
        : {},
    }),

    ...($variant === "filled" && {
      backgroundColor: COLORS.neutral[100],
      border: `1px solid ${COLORS.neutral[200]}`,
      boxShadow: "none",
      "&:hover": $hoverable
        ? {
          backgroundColor: COLORS.neutral[50],
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
        }
        : {},
    }),

    ".ant-card-body": {
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },

    ".ant-card-head": {
      borderBottom: `1px solid ${COLORS.neutral[200]}`,
      ".ant-card-head-title": {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: COLORS.neutral[900],
      },
    },
  }),
);

const Card: React.FC<CardProps> = ({
  variant = "elevated",
  hoverable = true,
  children,
  ...props
}) => {
  return (
    <StyledCard $variant={variant} $hoverable={hoverable} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;
