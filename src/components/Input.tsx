import React from 'react';
import styled  from 'styled-components';

const Input =  styled.div`
  padding: 12px 0;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: left;

  .label {
    flex-grow: 1;
  }

  .units {
    width: 100px;
  }

  input {
    height: 24px;
    font-size: 16px;
    width: 100px;
    border: 2px solid #000;
    margin: 0 12px;
    text-align: right;
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
    <div className="label">{props.label}</div>
    <input
      type="number"
      value={!props.value && props.value !== 0 ? '' : props.value}
      onChange={e => props.valueChanged(parseInt(e.currentTarget.value))}
    />
    <div className="units">(in {props.units})</div>
  </Input>
  )
}