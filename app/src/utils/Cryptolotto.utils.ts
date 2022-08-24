import axios from 'axios'
import { LotteryInterface } from "../models/Interfaces/Lottery.interface";
import { Connection, sendAndConfirmRawTransaction, Transaction } from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";

const cryptolotto = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CRYPTOLOTTO_API,
  headers: {},
})

const CryptolottoApi = {
  lottery: {
    getLotteryInfo: async (slug: string) => {
      const { data, status }: { data: LotteryInterface; status: number } =
        await cryptolotto.get(`/lottery/${slug}`)
      return {
        data,
        status,
      }
    },
    getLotteryAmount: async (pda: string) => {
      const { data }: { data: number } =
        await cryptolotto.get(`/lottery/amount/${pda}`)
      return {
        amount: data,
      }
    },
    deposit: async (slug: string, wallet: string, amount: number) => {
      const { data } =
        await cryptolotto.get(`/lottery/deposit/${slug}/${wallet}/${amount}`);
      return {
        data,
      }
    },
    confirmParticipation: async (slug: string, wallet: string, amount: number, txid: string) => {
      const { data } =
        await cryptolotto.get(`/lottery/confirmParticipation/${slug}/${wallet}/${amount}/${txid}`);
      return {
        data,
      }
    },
    getUserParticipations: async (slug: string, wallet: string) => {
      const { data } =
        await cryptolotto.get(`/lottery/getParticipations/${slug}/${wallet}`);
      return {
        userParticipations: data
      }
    },
  }
}

export default CryptolottoApi

export const depositUSDC = async (slug: string, wallet: AnchorWallet, amount: number) => {
  try {
    const connection = new Connection(process.env.NEXT_PUBLIC_RPC_ENDPOINT);

    const { data } = await CryptolottoApi.lottery.deposit(
      slug,
      wallet.publicKey.toString(),
      amount
    )

    const deserializedTx = Transaction.from(data.data);
    await wallet.signTransaction(deserializedTx);
    const txid = await sendAndConfirmRawTransaction(connection, deserializedTx.serialize())

    await CryptolottoApi.lottery.confirmParticipation(
      slug,
      wallet.publicKey.toString(),
      amount,
      txid
    )

    return txid
  } catch (e) {
    throw new Error(e)
  }
}
