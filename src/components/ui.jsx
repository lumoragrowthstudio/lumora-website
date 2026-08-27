import React from "react";
export const Arrow = ({ down = false }) => (
  <span className={down ? "arrow down" : "arrow"}>{down ? "↓" : "↗"}</span>
);
