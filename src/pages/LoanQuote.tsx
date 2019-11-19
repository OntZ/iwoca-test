import React, { useState } from 'react';
import styled  from 'styled-components';
import { ContentContainer } from '../components/ContentContainer';
import Calculator from '../components/Calculator';
import Input from '../components/Input';

const LoanQuote =  styled.div`
  .loan-calculators {
    display: flex;
    justify-content: space-between;
  }
`;

const Title = styled.h1`
  text-align: left;
`;

export default () => {
  const [amount, setAmount] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);

  return (
    <LoanQuote>
      <ContentContainer>
        <Title>Your loan</Title>
        <Input label="Amount requested" units="£" value={amount} valueChanged={setAmount} />
        <Input label="Duration" units="months" value={months} valueChanged={setMonths} />
        <div className="loan-calculators">
          <Calculator amount={amount} months={months} />
          <Calculator amount={amount} months={months} isBusinessCredit={true} />
        </div>
      </ContentContainer>
    </LoanQuote>
  );
}
