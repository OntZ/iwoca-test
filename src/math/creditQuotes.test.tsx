import { getInterestValuesForCredit, getPrincipalForCredit } from './creditQuotes';

describe('creditQuotes', () => {
  it ('getPrincipalForCredit calculates principle rates properly', () => {
    expect(getPrincipalForCredit(10000, 4)).toEqual(2500);
  });

  it ('getPrincipalForCredit avoids divide by zero', () => {
    expect(getPrincipalForCredit(10000, 0)).toEqual(10000);
  });

  it ('getInterestValuesForCredit calculates RCF interest rates properly', () => {
    expect(getInterestValuesForCredit({
      amount: 10000,
      months: 4,
      interestRatePercent: 3
    })).toEqual([300, 225, 150, 75]);
  });

  it ('getInterestValuesForCredit calculates Business interest rates properly', () => {
    expect(getInterestValuesForCredit({
      amount: 10000,
      months: 4,
      interestRatePercent: 3,
      isBusinessLoan: true
    })).toEqual([1300, 225, 150, 75]);
  });
});