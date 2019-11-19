import React, {useState, useEffect} from 'react';
import styled  from 'styled-components';
import moment from 'moment';
import Input from './Input';
import { getInterestValuesForCredit, getPrincipalForCredit, isCreditAllowed, Credit } from '../math/creditQuotes';
import { CreditConstraints } from '../services/CreditLimits';

const border = `2px solid #000`;

const Calculator = styled.div`
  background-color: #eee;
  padding: 20px;

  .interest-rate {
    width: 330px;
  }

  .quote-table {
    margin-top: 20px;
    background-color: #fff;
    border: ${border}
    border-collapse: collapse;
    font-weight: bold;

    th, td {
      padding: 6px;
    }

    th {
      background-color: #dadada;
    }

    tr:nth-child(odd) {background: #eee}
    tr:nth-child(even) {background: #fff}

    th:not(:last-child), td:not(:last-child) {
      border-right: ${border}
    }
  }

  .credit-type {
    text-align: center;
    font-weight: normal;
  }
`;

interface ICalculatorProps {
  amount: number;
  months: number;
  isBusinessCredit?: boolean;
  creditConstraints?: CreditConstraints;
}

export default (props: ICalculatorProps) => {
  const [interestRate, setInterestRate] = useState<number>(3);
  const [interestForCredit, setInterestForCredit] = useState<number[]>([]);
  const [isCreditPermitted, setIsCreditPermitted] = useState<boolean>(false);

  const credit: Credit = {
    amount: props.amount,
    months: props.months,
    interestRatePercent: 0,
    isBusinessLoan: props.isBusinessCredit
  }

  useEffect(() => {
    if (interestRate !== undefined && props.amount && props.months) {
      credit.interestRatePercent = interestRate;

      setInterestForCredit(getInterestValuesForCredit(credit));

      setIsCreditPermitted(isCreditAllowed(credit, props.creditConstraints));
    }
  }, [interestRate, props.amount, props.months, props.creditConstraints]);

  const principal = getPrincipalForCredit(props.amount, props.months);

  const totalInterest = interestForCredit.reduce((accumulator, interestForCurrentMonth) => accumulator + interestForCurrentMonth, 0)

  return (
    <Calculator>
      {isCreditPermitted ?
        <>
          <div className="interest-rate center-within-parent">
            <Input label="Interest rate" units="%" value={interestRate} valueChanged={setInterestRate} />
          </div>
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
                      <td>£{principal}</td>
                      <td>£{interest}</td>
                      <td>£{principal + interest}</td>
                    </tr>
                  ))}
                <tr>
                  <td>Total</td>
                  <td>£{props.amount}</td>
                  <td>£{totalInterest}</td>
                  <td>£{props.amount + totalInterest}</td>
                </tr>
              </tbody>
            : null}
          </table>
        </>
      : creditNotAllowedMessage(credit, props.creditConstraints)}
      <h2 className="credit-type">{props.isBusinessCredit ? 'Business Loan' : 'Revolving Credit Facility'}</h2>
    </Calculator>
  );
}

function creditNotAllowedMessage (credit: Credit, constraints?: CreditConstraints) {
  const creditType: keyof CreditConstraints = credit.isBusinessLoan? 'businessLoan' : 'revolvingCreditFacility'

  /**
   * Format this nicely for a human
   */
  return <div>
    <p><b>This credit is not allowed for your selected options.</b></p>
    <>{constraints
      ? <div>Please select something within these limits: <pre>{JSON.stringify(constraints[creditType], null, 4)}</pre></div>
    : null}</>
  </div>
}