import { OptionType } from "./OptionType";

export interface SelectBoxProps<T> {
  width: number;
  height: number;
  fontSize: number;
  options: OptionType<T>[];
  onChange: Function;
  selectedValue: T;
}
