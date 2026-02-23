import React from "react";
import styled, { keyframes } from "styled-components";

type SoundLinesProps = {
  position?: "top" | "bottom";
  fixed?: boolean;
};

const drift = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-35%);
  }
`;

const LinesWrap = styled.div<{
  $position: "top" | "bottom";
  $fixed: boolean;
}>`
  position: ${({ $fixed }) => ($fixed ? "fixed" : "absolute")};
  left: 0;
  right: 0;
  ${({ $position }) => ($position === "top" ? "top: 0;" : "bottom: 0;")}
  z-index: 0;
  pointer-events: none;
  opacity: 0.35;
  padding: 10px 0;
`;

const LinesRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 6vw;
  overflow: hidden;
`;

const LineGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  animation: ${drift} 16s linear infinite;
`;

const Line = styled.span<{ $width: string; $height: string }>`
  display: block;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: 999px;
  background: rgba(11, 11, 11, 0.5);
`;

const SOUND_LINES = [
  { width: "8vw", height: "2px" },
  { width: "4vw", height: "3px" },
  { width: "12vw", height: "2px" },
  { width: "6vw", height: "4px" },
  { width: "10vw", height: "2px" },
  { width: "3vw", height: "3px" },
];

const SoundLines: React.FC<SoundLinesProps> = ({
  position = "bottom",
  fixed = true,
}) => (
  <LinesWrap $position={position} $fixed={fixed} aria-hidden>
    <LinesRow>
      <LineGroup>
        {SOUND_LINES.map((line, idx) => (
          <Line
            key={`${position}-line-${idx}`}
            $width={line.width}
            $height={line.height}
          />
        ))}
      </LineGroup>
      <LineGroup>
        {SOUND_LINES.map((line, idx) => (
          <Line
            key={`${position}-line-dup-${idx}`}
            $width={line.width}
            $height={line.height}
          />
        ))}
      </LineGroup>
    </LinesRow>
  </LinesWrap>
);

export default SoundLines;
