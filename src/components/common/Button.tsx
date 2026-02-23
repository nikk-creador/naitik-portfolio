import React from "react";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import { styled } from "@mui/material/styles";
import { COLORS, GLOBAL_STYLES } from "../../theme/Theme";

export type ButtonProps = Omit<
  AntButtonProps,
  "type" | "variant" | "size"
> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children: React.ReactNode;
};

const StyledButton = styled(AntButton, {
  shouldForwardProp: (prop) =>
    prop !== "$variant" && prop !== "$fullWidth" && prop !== "$size",
})<{ $variant?: ButtonProps["variant"]; $fullWidth?: boolean; $size?: ButtonProps["size"] }>(
  ({ $variant = "primary", $fullWidth = false, $size = "medium" }) => ({
    borderRadius: GLOBAL_STYLES.borderRadius,
    textTransform: "uppercase",
    fontWeight: 600,
    letterSpacing: "0.2em",
    fontSize: "0.7rem",
    transition: GLOBAL_STYLES.transition,
    width: $fullWidth ? "100%" : "auto",

    ...($size === "small" && {
      fontSize: "0.7rem",
      padding: "8px 16px",
      height: "32px",
    }),
    ...($size === "medium" && {
      fontSize: "0.75rem",
      padding: "10px 20px",
      height: "40px",
    }),
    ...($size === "large" && {
      fontSize: "0.8rem",
      padding: "12px 26px",
      height: "48px",
    }),

    ...($variant === "primary" && {
      backgroundColor: COLORS.primary[900],
      borderColor: COLORS.primary[900],
      color: "#ffffff",
      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.18)",
      "&:hover": {
        backgroundColor: COLORS.primary[800],
        borderColor: COLORS.primary[800],
        boxShadow: "0 16px 34px rgba(0, 0, 0, 0.2)",
        transform: "translateY(-2px)",
      },
      "&:active": {
        backgroundColor: COLORS.primary[900],
        borderColor: COLORS.primary[900],
      },
    }),

    ...($variant === "secondary" && {
      backgroundColor: COLORS.neutral[800],
      borderColor: COLORS.neutral[800],
      color: "#ffffff",
      "&:hover": {
        backgroundColor: COLORS.neutral[700],
        borderColor: COLORS.neutral[700],
        transform: "translateY(-2px)",
      },
      "&:active": {
        backgroundColor: COLORS.neutral[900],
        borderColor: COLORS.neutral[900],
      },
    }),

    ...($variant === "outline" && {
      backgroundColor: "transparent",
      borderColor: COLORS.neutral[900],
      color: COLORS.neutral[900],
      borderStyle: "dashed",
      "&:hover": {
        backgroundColor: COLORS.neutral[100],
        borderColor: COLORS.neutral[900],
        color: COLORS.neutral[900],
        transform: "translateY(-2px)",
      },
      "&:active": {
        backgroundColor: COLORS.neutral[200],
        borderColor: COLORS.neutral[900],
        color: COLORS.neutral[900],
      },
    }),

    ...($variant === "ghost" && {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: COLORS.neutral[700],
      "&:hover": {
        backgroundColor: COLORS.neutral[100],
        color: COLORS.neutral[900],
        transform: "translateY(-2px)",
      },
      "&:active": {
        backgroundColor: COLORS.neutral[200],
        color: COLORS.neutral[800],
      },
    }),
  }),
);

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
