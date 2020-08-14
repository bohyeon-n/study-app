import styled from "styled-components";
import React, { ReactNode } from "react";

const LabelWrapper = styled.label`
  position: absolute;
  left: -10000px;
  top: auto;
  height: 1px;
  overflow: hidden;
`;

export const InputLabel = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  return <LabelWrapper htmlFor={label}>{children}</LabelWrapper>;
};
