import { http } from './Http';

type CreditLimitResponseConstraint = {
  amount_min: number;
  amount_max: number;
  duration_min: number;
  duration_max: number;
}

type CreditLimitResponse = {
  revolving_credit_facility: CreditLimitResponseConstraint;
  business_loan: CreditLimitResponseConstraint;
}

type CreditConstraint = {
  amountMin: number;
  amountMax: number;
  durationMin: number;
  durationMax: number;
}

export type CreditConstraints = {
  revolvingCreditFacility: CreditConstraint;
  businessLoan: CreditConstraint;
}

export class CreditLimitsService {
  public static get = async ():Promise<CreditConstraints> => {
    const response: CreditLimitResponse = await http<CreditLimitResponse>('https://www.mocky.io/v2/5d4aa9e93300006f000f5ea9');

    return {
      revolvingCreditFacility: {
        amountMin: response.revolving_credit_facility.amount_min,
        amountMax: response.revolving_credit_facility.amount_max,
        durationMin: response.revolving_credit_facility.duration_min,
        durationMax: response.revolving_credit_facility.duration_max,
      },
      businessLoan: {
        amountMin: response.business_loan.amount_min,
        amountMax: response.business_loan.amount_max,
        durationMin: response.business_loan.duration_min,
        durationMax: response.business_loan.duration_max,
      }
    }
  }
}