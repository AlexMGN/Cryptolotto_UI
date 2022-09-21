export interface LotteryInterface {
  slug: string,
  timestamp: number,
  extension_timestamp: number,
  pda: string,
  token_account: string,
  participations: {
    transaction_id: string,
    wallet: string,
    amount: number,
    date: number,
  }[];
  status: string,
  amount_win: number,
  team_part: number,
  association_part: number,
  distribution_transaction_id: string,
  distribution_date: number,
  winner: string,
}

export interface TeamInterface {
  type: string,
  wallet: string,
  status: string,
  amount_distributed: number,
  distribution_transaction_id: string,
  distribution_date: number,
  error_message: string,
}

