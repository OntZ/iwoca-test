import React, {useState, useEffect} from 'react';
import styled  from 'styled-components';
import moment from 'moment';
import Input from './Input';
import { getInterestValuesForCredit, getPrincipalForCredit } from '../math/creditQuotes';

const Calculator = styled.div`
  background-color: #dadada;
  padding: 20px;

  .quote-table {
    background-color: #fff;
  }
`;

interface ICalculatorProps {
  amount: number;
  months: number;
  isBusinessCredit?: boolean;
}
//getInterestValuesForCredit
export default (props: ICalculatorProps) => {
  const [interestRate, setInterestRate] = useState<number>();
  const [interestForCredit, setInterestForCredit] = useState<number[]>([]);

  useEffect(() => {
    if (interestRate !== undefined && props.amount && props.months) {
      setInterestForCredit(getInterestValuesForCredit({
        amount: props.amount,
        months: props.months,
        interestRatePercent: interestRate,
        isBusinessLoan: props.isBusinessCredit
      }))
    }
  }, [interestRate, props.amount, props.months]);

  const principal = getPrincipalForCredit(props.amount, props.months);

  const totalInterest = interestForCredit.reduce((accumulator, interestForCurrentMonth) => accumulator + interestForCurrentMonth, 0)

  return (
    <Calculator>
      <Input label="Interest rate" units="%" value={interestRate} valueChanged={setInterestRate} />
      <table className="quote-table">
        <thead>
          <tr>
            <th>Repayment date</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Total repayment</th>
          </tr>
        </thead>
        {props.amount && props.months && interestRate ?
          <tbody>
              {interestForCredit.map((interest, index) => (
                <tr key={index}>
                  <td>{moment().add(index + 1, 'M').format('DD/MM/YYYY')}</td>
                  <td>{principal}</td>
                  <td>{interest}</td>
                  <td>{principal + interest}</td>
                </tr>
              ))}
            <tr>
              <td>Total</td>
              <td>{props.amount}</td>
              <td>{totalInterest}</td>
              <td>{props.amount + totalInterest}</td>
            </tr>
          </tbody>
        : null}
      </table>
      <h2>{props.isBusinessCredit ? 'Revolving Credit Facility' : 'Business Loan'}</h2>
    </Calculator>
  );
}