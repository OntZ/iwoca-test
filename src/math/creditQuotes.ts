import { CreditConstraints } from "../services/CreditLimits";

export type Credit = {
  amount: number,
  months: number,
  interestRatePercent: number,
  isBusinessLoan?: boolean
}

export const getInterestValuesForCredit = (credit: Credit): number[] => {
  let amountLeft = credit.amount;
  const principal = getPrincipalForCredit(credit.amount, credit.months);

  return [...new Array(credit.months)].map((month, index) => {
    let interest = Math.ceil((credit.interestRatePercent / 100) * amountLeft);
    if (index === 0 && credit.isBusinessLoan) {
      interest += 1000;
    }

    amountLeft -= principal;
    return interest;
  });
}

export const getPrincipalForCredit = (amount: number, months: number) => Math.ceil(amount / (months || 1));

export const isCreditAllowed = (credit: Credit, constraints?: CreditConstraints) => {
  if (!constraints) {
    return true;
  }

  const creditType: keyof CreditConstraints = credit.isBusinessLoan? 'businessLoan' : 'revolvingCreditFacility';

  return (
    constraints[creditType].amountMax >= credit.amount &&
    constraints[creditType].amountMin <= credit.amount &&
    constraints[creditType].durationMax >= credit.months &&
    constraints[creditType].durationMin <= credit.months
  )
}