import React, { useState, useEffect } from 'react';
import styled  from 'styled-components';
import { ContentContainer } from '../components/ContentContainer';
import Calculator from '../components/Calculator';
import Input from '../components/Input';
import { CreditLimitsService, CreditConstraints } from '../services/CreditLimits';

const LoanQuote =  styled.div`
  .credit-params-section {
    margin-bottom: 40px;
  }

  .loan-calculators {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 40px;

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      grid-row-gap: 30px;
    }
  }
`;
/** ^ for a properly responsive solution, make media queries global */

const Title = styled.h1`
  text-align: left;
`;


export default () => {
  const [amount, setAmount] = useState<number>(10000);
  const [months, setMonths] = useState<number>(4);
  const [creditConstraints, setCreditConstrants] = useState<CreditConstraints>();

  useEffect(() => {
    (async () => {
      const creditConstraints = await CreditLimitsService.get();
      setCreditConstrants(creditConstraints);
    })();
  }, []);

  return (
    <LoanQuote>
      <ContentContainer>
        <Title>Your loan</Title>
        <div className="credit-params-section">
          <div className="center-within-parent">
            <Input label="Amount requested" units="£" value={amount} valueChanged={setAmount} />
            <Input label="Duration" units="months" value={months} valueChanged={setMonths} />
          </div>
        </div>
        <div className="center-within-parent">
          <div className="loan-calculators">
            <Calculator amount={amount} months={months} creditConstraints={creditConstraints}/>
            <Calculator amount={amount} months={months} creditConstraints={creditConstraints} isBusinessCredit={true} />
          </div>
        </div>
      </ContentContainer>
    </LoanQuote>
  );
}
