import dotenv from 'dotenv';
dotenv.config();

import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Cryptolotto } from "../target/types/cryptolotto";
import {
  getOrCreateAssociatedTokenAccount,
  createMint,
  mintTo
} from '@solana/spl-token';
import { assert } from "chai";
import bs58 from "bs58";

const LOCALNET = "LOCALNET";
const DEVNET = "DEVNET";

describe("Cryptolotto", () => {
  let provider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Cryptolotto as Program<Cryptolotto>;
  const timestamp = new anchor.BN(1656980458054);
  const adminWallet = Keypair.fromSecretKey(new Uint8Array(bs58.decode(process.env.ADMIN_SECRET_KEY)));

  //const timestamp = new anchor.BN(new Date().getTime());
  // Récupérer le number du timestamp à sauvegarder console.log(timestamp.toNumber())

  const localnetUSDCCreator = anchor.web3.Keypair.generate();
  const lotteryWinnerAccount = anchor.web3.Keypair.generate();
  const lotteryTeamAccount = anchor.web3.Keypair.generate();
  const lotteryAssociationAccount = anchor.web3.Keypair.generate();

  const actual_cluster = LOCALNET

  let Lottery_USDC_ATA = null;
  let Winner_ATA = null;
  let USDC_Mint = null;
  let USDC_DEVNET_Mint = "12345678"

  it("It create a Lottery", async () => {
    // HzQskGieQ2dfkuwHzk3X3jQdNNrutP4HPXgyX6ouUuAb
    const bufferedTimestamp = timestamp.toBuffer('be', 8);

    const [_lottery_pda, _bump] = await PublicKey.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("lottery_one")),
        bufferedTimestamp
      ],
      program.programId,
    );

    if (actual_cluster === "LOCALNET") {
      await provider.connection.confirmTransaction(
        await provider.connection.requestAirdrop(localnetUSDCCreator.publicKey, 1000000000),
        "processed"
      );

      // Simulation de l'USDC pour le localnet
      USDC_Mint = await createMint(
        provider.connection,
        localnetUSDCCreator,
        localnetUSDCCreator.publicKey,
        null,
        6
      )
    }

    // USDC_mint = Localnet
    // USDC_DEVNET_Mint = Devnet
    // Le signer c'est l'admin et c'est lui qui se fera remboursé
    Lottery_USDC_ATA = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      adminWallet,
      (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
      _lottery_pda,
      true
    )

    if (actual_cluster === "LOCALNET") {
      await mintTo(
        provider.connection,
        localnetUSDCCreator,
        USDC_Mint,
        Lottery_USDC_ATA.address,
        localnetUSDCCreator,
        100
      )
    }

    const lottery_account_ata = await provider.connection.getParsedAccountInfo(Lottery_USDC_ATA.address) as any;
    assert.equal(100, Number(lottery_account_ata.value.data.parsed.info.tokenAmount.amount));
  });

  it("It distribute to team, association and winner", async () => {
    // Récupérer ou créer l'ATA de la team, de l'association et du winner par rapport a l'USDC
    // Call le RPC avec l'amount, le timestamp pour dériver la PDA, et les ATA
    //console.log(Lottery_USDC_ATA.address.toString())
    const lottery_account_ata_before = await provider.connection.getParsedAccountInfo(Lottery_USDC_ATA.address) as any;
    console.log(Number(lottery_account_ata_before.value.data.parsed.info.tokenAmount.amount))

    const bufferedTimestamp = timestamp.toBuffer('be', 8);

    const Winner_ATA = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      adminWallet,
      (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
      lotteryWinnerAccount.publicKey
    )

    const Team_ATA = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      adminWallet,
      (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
      lotteryTeamAccount.publicKey
    )

    const Association_ATA = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      adminWallet,
      (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
      lotteryAssociationAccount.publicKey
    )

    const [_lottery_pda, _] = await PublicKey.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("lottery_one")),
        bufferedTimestamp
      ],
      program.programId,
    );

    // @ts-ignore
    const txid = await program.methods.distributeLottery(new anchor.BN(100), bufferedTimestamp, "lottery_one")
      .accounts({
        signer: adminWallet.publicKey,
        usdcMint: USDC_Mint,
        lotteryAta: Lottery_USDC_ATA.address,
        lotteryAtaAuthority: _lottery_pda,
        winnerAta: Winner_ATA.address,
        teamAta: Team_ATA.address,
        associationAta: Association_ATA.address
      })
      .signers([adminWallet])
      .rpc({ skipPreflight: true })

    console.log(txid)
    const lottery_account_ata_after = await provider.connection.getParsedAccountInfo(Lottery_USDC_ATA.address) as any;
    console.log(Number(lottery_account_ata_after.value.data.parsed.info.tokenAmount.amount))

    //lotteryWinnerAccount

  });

});
