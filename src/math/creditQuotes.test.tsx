import { getInterestValuesForCredit, getPrincipalForCredit, isCreditAllowed } from './creditQuotes';
import { CreditConstraints } from '../services/CreditLimits';

const limits: CreditConstraints = {
  revolvingCreditFacility: {
    amountMin: 1000,
    amountMax: 150000,
    durationMin: 1,
    durationMax: 12
  },
  businessLoan: {
    amountMin: 10000,
    amountMax: 200000,
    durationMin: 1,
    durationMax: 60
  }
}

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

  it ('isCreditAllowed allows a valid RCF credit', () => {
    expect(isCreditAllowed({
      amount: 10000,
      months: 4,
      interestRatePercent: 3,
      isBusinessLoan: false
    }, limits)).toEqual(true);
  });

  it ('isCreditAllowed allows a valid business loan', () => {
    expect(isCreditAllowed({
      amount: 10000,
      months: 4,
      interestRatePercent: 3,
      isBusinessLoan: true
    }, limits)).toEqual(true);
  });

  it ('isCreditAllowed allows any credit if limits are undefined', () => {
    expect(isCreditAllowed({
      amount: 0,
      months: 0,
      interestRatePercent: 0,
      isBusinessLoan: true
    })).toEqual(true);
  });

  it ('isCreditAllowed invalidates RCF by min amount', () => {
    expect(isCreditAllowed({
      amount: limits.revolvingCreditFacility.amountMin - 1,
      months: limits.revolvingCreditFacility.durationMin + 1,
      interestRatePercent: 0,
      isBusinessLoan: false
    }, limits)).toEqual(false);
  });

  it ('isCreditAllowed invalidates RCF by max amount', () => {
    expect(isCreditAllowed({
      amount: limits.revolvingCreditFacility.amountMax + 1,
      months: limits.revolvingCreditFacility.durationMin + 1,
      interestRatePercent: 0,
      isBusinessLoan: false
    }, limits)).toEqual(false);
  });

  it ('isCreditAllowed invalidates RCF by min duration', () => {
    expect(isCreditAllowed({
      amount: limits.revolvingCreditFacility.amountMin + 1,
      months: limits.revolvingCreditFacility.durationMin - 1,
      interestRatePercent: 0,
      isBusinessLoan: false
    }, limits)).toEqual(false);
  });

  it ('isCreditAllowed invalidates RCF by max duration', () => {
    expect(isCreditAllowed({
      amount: limits.revolvingCreditFacility.amountMin + 1,
      months: limits.revolvingCreditFacility.durationMax + 1,
      interestRatePercent: 0,
      isBusinessLoan: false
    }, limits)).toEqual(false);
  });

  it ('isCreditAllowed invalidates business loan by min amount', () => {
    expect(isCreditAllowed({
      amount: limits.businessLoan.amountMin - 1,
      months: limits.businessLoan.durationMin + 1,
      interestRatePercent: 0,
      isBusinessLoan: true
    }, limits)).toEqual(false);
  });

  it ('isCreditAllowed invalidates business loan by max amount', () => {
    expect(isCreditAllowed({
      amount: limits.businessLoan.amountMax + 1,
      months: limits.businessLoan.durationMin + 1,
      interestRatePercent: 0,
      isBusinessLoan: true
    }, limits)).toEqual(false);
  });

  it ('isCreditAllowed invalidates business loan by min duration', () => {
    expect(isCreditAllowed({
      amount: limits.businessLoan.amountMin + 1,
      months: limits.businessLoan.durationMin - 1,
      interestRatePercent: 0,
      isBusinessLoan: true
    }, limits)).toEqual(false);
  });

  it ('isCreditAllowed invalidates business loan by max duration', () => {
    expect(isCreditAllowed({
      amount: limits.businessLoan.amountMin + 1,
      months: limits.businessLoan.durationMax + 1,
      interestRatePercent: 0,
      isBusinessLoan: true
    }, limits)).toEqual(false);
  });

});