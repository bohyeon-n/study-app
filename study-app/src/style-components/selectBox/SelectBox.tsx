import React, { useState } from "react";
import styled from "styled-components";
import { OptionType } from "./OptionType";
import { basicTheme } from "../../styles/basic-theme";
import { SelectBoxProps } from "./SelectBoxProps";

interface SelectBoxWrapper {
  width?: number;
  height?: number;
  fontSize?: number;
  isSelected?: boolean;
}

const SelectBoxWrapper = styled.div<SelectBoxWrapper>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  cursor: auto;
  position: relative;
  z-index: 100;
`;

const Selected = styled.div<SelectBoxWrapper>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  line-height: ${(props) => props.height}px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid
    ${(props) => (props.isSelected ? "#127cfd" : basicTheme.borderColors.dark)};
  border-bottom: ${(props) => (props.isSelected ? "none" : "block")};
  display: flex;
  justify-content: space-between;
  span {
    cursor: default;
    display: inline-block;
  }
`;

const Ul = styled.ul<SelectBoxWrapper>`
  display: ${(props) => (props.isSelected ? "block" : "none")};
  border: 1px solid #127cfd;
  border-top: none;
  padding-left: 0;
  margin: 0;
  background: #ffffff;
`;

const Li = styled.li<SelectBoxWrapper>`
  padding-left: 10px;
  box-sizing: border-box;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  line-height: ${(props) => props.height}px;
  list-style: none;
  &:hover {
    background: rgba(18, 124, 253, 0.1);
  }
`;

export const SelectBox = ({
  width,
  height,
  options,
  onChange,
  selectedValue,
}: SelectBoxProps<string>) => {
  const [toggleBoxState, dispatch] = useState(false);
  const handleToggleBox = () => {
    dispatch(!toggleBoxState);
  };

  const handleSelectBox = (value: string) => {
    onChange(value);
    handleToggleBox();
  };

  return (
    <SelectBoxWrapper
      width={width}
      height={height}
      fontSize={16}
      isSelected={toggleBoxState}
    >
      <Selected
        onClick={handleToggleBox}
        height={height}
        isSelected={toggleBoxState}
      >
        <span className="value">{selectedValue}</span>
        <span className="arrow">{toggleBoxState ? "▲" : "▼"}</span>
      </Selected>
      <Ul isSelected={toggleBoxState} width={width} height={height}>
        {options.map((option: OptionType<string>, index: number) => (
          <Li
            width={width}
            height={height}
            key={index}
            onClick={(e) => handleSelectBox(option.value)}
          >
            {option.value}
          </Li>
        ))}
      </Ul>
    </SelectBoxWrapper>
  );
};
