import React from 'react';
import styled  from 'styled-components';

const Input =  styled.div`
  padding: 12px;
  input {
    height: 20px;
    width: 100px;
    border: 2px solid #000;
    margin: 0 20px;
  }
`;

interface IInputProps {
  label: string;
  units: string;
  value?: number;
  valueChanged: (value: number) => void;
}

export default (props: IInputProps) => {
  return (
  <Input>
    <span>{props.label}:</span>
    <input
      type="number"
      value={!props.value && props.value !== 0 ? '' : props.value}
      onChange={e => props.valueChanged(parseInt(e.currentTarget.value))}
    />
    <span>(in {props.units})</span>
  </Input>
  )
}