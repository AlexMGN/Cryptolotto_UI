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
