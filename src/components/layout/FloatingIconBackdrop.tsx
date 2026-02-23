import React, { useMemo } from "react";
import styled from "styled-components";
import type { IconType } from "react-icons";
import {
  FaCode,
  FaCodeBranch,
  FaDatabase,
  FaGitAlt,
  FaHashtag,
  FaTerminal,
} from "react-icons/fa6";
import { SiReact, SiTypescript } from "react-icons/si";

const ICON_SET: IconType[] = [
  FaCode,
  FaCodeBranch,
  FaTerminal,
  FaHashtag,
  FaDatabase,
  FaGitAlt,
  SiReact,
  SiTypescript,
];
const FLOATING_ICON_COUNT = 22;
type FloatingIconStyle = React.CSSProperties & {
  "--icon-rotate": string;
  "--float-x": string;
  "--float-y": string;
  "--float-duration": string;
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  color: #0b0b0b;
  opacity: 0.08;

  .icon {
    position: absolute;
    opacity: 0.25;
    transform: translate(-50%, -50%) rotate(var(--icon-rotate, 0deg));
    filter: blur(0.1px);
    animation: float var(--float-duration, 16s) ease-in-out infinite;
  }

  @media (max-width: 768px) {
    opacity: 0.14;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(-50%, -50%) rotate(var(--icon-rotate, 0deg));
    }
    50% {
      transform: translate(
          calc(-50% + var(--float-x, 0px)),
          calc(-50% - var(--float-y, 0px))
        )
        rotate(var(--icon-rotate, 0deg));
    }
  }
`;

const FloatingIconBackdrop: React.FC = () => {
  const floatingIcons = useMemo(() => {
    return Array.from({ length: FLOATING_ICON_COUNT }, (_, index) => {
      const Icon = ICON_SET[index % ICON_SET.length];
      return {
        Icon,
        top: `${Math.round(Math.random() * 100)}%`,
        left: `${Math.round(Math.random() * 100)}%`,
        size: 22 + Math.round(Math.random() * 26),
        rotate: Math.round(Math.random() * 40) - 20,
        opacity: 0.16 + Math.random() * 0.18,
        floatX: `${Math.round(Math.random() * 16 - 8)}px`,
        floatY: `${Math.round(10 + Math.random() * 16)}px`,
        floatDuration: `${Math.round(14 + Math.random() * 10)}s`,
      };
    });
  }, []);

  return (
    <Backdrop>
      {floatingIcons.map(
        ({ Icon, top, left, size, rotate, opacity, floatX, floatY, floatDuration }, i) => (
        <span
          key={`icon-${i}`}
          className="icon"
          style={
            {
              top,
              left,
              opacity,
              "--icon-rotate": `${rotate}deg`,
              "--float-x": floatX,
              "--float-y": floatY,
              "--float-duration": floatDuration,
            } as FloatingIconStyle
          }
        >
          <Icon size={size} />
        </span>
        ),
      )}
    </Backdrop>
  );
};

export default FloatingIconBackdrop;
