import React, { FC } from "react";

export const Point: FC<{ x: number; y: number }> = React.memo(({ x, y }) => (
  <div
    style={{
      width: 15,
      height: 15,
      position: "absolute",
      zIndex: 99999,
      borderRadius: "50%",
      background: "red",
      transform: `translate3d(${x}px, ${y}px, 0)`,
    }}
  />
));
