import dotenv from 'dotenv';
dotenv.config();

import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Keypair, PublicKey, Signer } from "@solana/web3.js";
import { Cryptolotto } from "../target/types/cryptolotto";
import {
  getOrCreateAssociatedTokenAccount,
  createMint,
  mintTo,
} from '@solana/spl-token';
import { assert } from "chai";
import bs58 from "bs58";

const LOCALNET: string = "LOCALNET";
const DEVNET: string = "DEVNET";

let Lottery_USDC_ATA = null;
let Lottery_USDC_2_ATA = null;
let Lottery_USDC_5_ATA = null;
let Lottery_USDC_10_ATA = null;

let Winner_ATA = null;
let Team_ATA = null;
let Association_ATA = null;

let USDC_Mint = null;
let USDC_DEVNET_Mint = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");
let USDC_Fake_Mint = anchor.web3.Keypair.generate()

let bufferedTimestamp;
let _lottery_pda;

/**
 * Si le Cluster est en devnet, penser a airdrop des USDC a la loterie (1 USDC suffit, pas besoin de tester les autres loteries)
 * Wallet Loterie 1 USDC : HzQskGieQ2dfkuwHzk3X3jQdNNrutP4HPXgyX6ouUuAb
 */
describe("Cryptolotto", async () => {
  console.log(4 - 0.40889708)
  let provider = anchor.AnchorProvider.env();
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Cryptolotto as Program<Cryptolotto>;
  const timestamp = new anchor.BN(1656980458054); // Timestamp de quand la loterie a été créée

  const adminWallet = Keypair.fromSecretKey(new Uint8Array(bs58.decode(process.env.ADMIN_SECRET_KEY)));
  const adminGuardWallet = anchor.web3.Keypair.generate();

  const localnetUSDCCreator = anchor.web3.Keypair.generate();
  const lotteryWinnerAccount = anchor.web3.Keypair.generate();
  const lotteryTeamAccount = anchor.web3.Keypair.generate();
  const lotteryAssociationAccount = anchor.web3.Keypair.generate();

  const actual_cluster: string = DEVNET

  it("It create a Lottery 1 USDC", async () => {
    bufferedTimestamp = timestamp.toBuffer('be', 8);
    _lottery_pda = await getPDA("lottery_one", bufferedTimestamp, program.programId);

    if (actual_cluster === LOCALNET) {
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

    Lottery_USDC_ATA = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      adminWallet,
      (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
      _lottery_pda,
      true
    )

    if (actual_cluster === LOCALNET) {
      await mintTo(
        provider.connection,
        localnetUSDCCreator,
        USDC_Mint,
        Lottery_USDC_ATA.address,
        localnetUSDCCreator,
        43356 * 1e6
      )
    }

    const lottery_account_ata = await provider.connection.getParsedAccountInfo(Lottery_USDC_ATA.address) as any;
    assert.equal(
      (actual_cluster === LOCALNET) ? 43356 : 1000,
      Number(lottery_account_ata.value.data.parsed.info.tokenAmount.amount) / 1e6);
  });

  if (actual_cluster === DEVNET) {
    it("It distribute to team, association and winner (Lottery 1 USDC)", async () => {
      await getOrCreateATA(
        provider,
        adminWallet,
        actual_cluster,
        (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
        lotteryWinnerAccount,
        lotteryTeamAccount,
        lotteryAssociationAccount
      )

      // @ts-ignore
      await program.methods.distributeLottery(
        (actual_cluster === LOCALNET) ? new anchor.BN(43356 * 1e6) : new anchor.BN(1000 * 1e6),
        bufferedTimestamp,
        "lottery_one"
      )
        .accounts({
          signer: adminWallet.publicKey,
          usdcMint: (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
          lotteryAta: Lottery_USDC_ATA.address,
          lotteryAtaAuthority: _lottery_pda,
          winnerAta: Winner_ATA.address,
          teamAta: Team_ATA.address,
          associationAta: Association_ATA.address
        })
        .signers([adminWallet])
        .rpc({ skipPreflight: true })

      const winner_account_ata_after = await provider.connection.getParsedAccountInfo(Winner_ATA.address) as any;
      const team_account_ata_after = await provider.connection.getParsedAccountInfo(Team_ATA.address) as any;
      const association_account_ata_after = await provider.connection.getParsedAccountInfo(Association_ATA.address) as any;
      const lottery_account_ata_after = await provider.connection.getParsedAccountInfo(Lottery_USDC_ATA.address) as any;

      assert.equal(
        (actual_cluster === LOCALNET) ? (90 * 43356 / 100) : (90 * 1000 / 100),
        Number(winner_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal(
        (actual_cluster === LOCALNET) ? (5 * 43356 / 100) : (5 * 1000 / 100),
      Number(team_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal(
        (actual_cluster === LOCALNET) ? (5 * 43356 / 100) : (5 * 1000 / 100),
      Number(association_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal(0, Number(lottery_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
    });
  }

  if (actual_cluster === LOCALNET) {
    it("Bad admin try to distribute to team, association and winner", async () => {
      try {
        await getOrCreateATA(
          provider,
          adminWallet,
          actual_cluster,
          (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
          lotteryWinnerAccount,
          lotteryTeamAccount,
          lotteryAssociationAccount
        )

        // @ts-ignore
        await program.methods.distributeLottery(new anchor.BN(43356 * 1e6), bufferedTimestamp, "lottery_one")
          .accounts({
            signer: adminGuardWallet.publicKey,
            usdcMint: USDC_Mint,
            lotteryAta: Lottery_USDC_ATA.address,
            lotteryAtaAuthority: _lottery_pda,
            winnerAta: Winner_ATA.address,
            teamAta: Team_ATA.address,
            associationAta: Association_ATA.address
          })
          .signers([adminGuardWallet])
          .rpc({ skipPreflight: true })
      } catch (e) {
        assert.equal('Not Authorized', e.msg)
      }
    });

    it("It try to distribute to team, association and winner with wrong amount", async () => {
      try {
        await getOrCreateATA(
          provider,
          adminWallet,
          actual_cluster,
          (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
          lotteryWinnerAccount,
          lotteryTeamAccount,
          lotteryAssociationAccount
        )

        // @ts-ignore
        await program.methods.distributeLottery(new anchor.BN(50000 * 1e6), bufferedTimestamp, "lottery_one")
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
      } catch (e) {
        // Code 2003 = A raw constraint was violated
        assert.equal(2003, e.code)
      }
    });

    it("It try to distribute to team, association and winner with wrong USDC", async () => {
      try {
        await getOrCreateATA(
          provider,
          adminWallet,
          actual_cluster,
          (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
          lotteryWinnerAccount,
          lotteryTeamAccount,
          lotteryAssociationAccount
        )

        // @ts-ignore
        await program.methods.distributeLottery(new anchor.BN(50000 * 1e6), bufferedTimestamp, "lottery_one")
          .accounts({
            signer: adminWallet.publicKey,
            usdcMint: USDC_Fake_Mint.publicKey,
            lotteryAta: Lottery_USDC_ATA.address,
            lotteryAtaAuthority: _lottery_pda,
            winnerAta: Winner_ATA.address,
            teamAta: Team_ATA.address,
            associationAta: Association_ATA.address
          })
          .signers([adminWallet])
          .rpc({ skipPreflight: true })
      } catch (e) {
        // Code 3012 = Account not initialized
        assert.equal(3012, e.code)
      }
    });

    it("It distribute to team, association and winner (Lottery 1 USDC)", async () => {
      await getOrCreateATA(
        provider,
        adminWallet,
        actual_cluster,
        (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
        lotteryWinnerAccount,
        lotteryTeamAccount,
        lotteryAssociationAccount
      )

      // @ts-ignore
      await program.methods.distributeLottery(new anchor.BN(43356 * 1e6), bufferedTimestamp, "lottery_one")
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

      const winner_account_ata_after = await provider.connection.getParsedAccountInfo(Winner_ATA.address) as any;
      const team_account_ata_after = await provider.connection.getParsedAccountInfo(Team_ATA.address) as any;
      const association_account_ata_after = await provider.connection.getParsedAccountInfo(Association_ATA.address) as any;
      const lottery_account_ata_after = await provider.connection.getParsedAccountInfo(Lottery_USDC_ATA.address) as any;

      assert.equal((90 * 43356 / 100), Number(winner_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal((5 * 43356 / 100), Number(team_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal((5 * 43356 / 100), Number(association_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal(0, Number(lottery_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
    });

    it("It create a Lottery 2 USDC", async () => {
      _lottery_pda = await getPDA("lottery_two", bufferedTimestamp, program.programId);

      if (actual_cluster === "LOCALNET") {
        await provider.connection.confirmTransaction(
          await provider.connection.requestAirdrop(localnetUSDCCreator.publicKey, 1000000000),
          "processed"
        );

        USDC_Mint = await createMint(
          provider.connection,
          localnetUSDCCreator,
          localnetUSDCCreator.publicKey,
          null,
          6
        )
      }

      Lottery_USDC_2_ATA = await getOrCreateAssociatedTokenAccount(
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
          Lottery_USDC_2_ATA.address,
          localnetUSDCCreator,
          100 * 1e6
        )
      }

      const lottery_account_ata = await provider.connection.getParsedAccountInfo(Lottery_USDC_2_ATA.address) as any;
      assert.equal(100, Number(lottery_account_ata.value.data.parsed.info.tokenAmount.amount) / 1e6);
    });

    it("It distribute to team, association and winner (Lottery 2 USDC)", async () => {
      await getOrCreateATA(
        provider,
        adminWallet,
        actual_cluster,
        (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
        lotteryWinnerAccount,
        lotteryTeamAccount,
        lotteryAssociationAccount
      )

      // @ts-ignore
      await program.methods.distributeLottery(new anchor.BN(100 * 1e6), bufferedTimestamp, "lottery_two")
        .accounts({
          signer: adminWallet.publicKey,
          usdcMint: USDC_Mint,
          lotteryAta: Lottery_USDC_2_ATA.address,
          lotteryAtaAuthority: _lottery_pda,
          winnerAta: Winner_ATA.address,
          teamAta: Team_ATA.address,
          associationAta: Association_ATA.address
        })
        .signers([adminWallet])
        .rpc({ skipPreflight: true })

      const winner_account_ata_after = await provider.connection.getParsedAccountInfo(Winner_ATA.address) as any;
      const team_account_ata_after = await provider.connection.getParsedAccountInfo(Team_ATA.address) as any;
      const association_account_ata_after = await provider.connection.getParsedAccountInfo(Association_ATA.address) as any;
      const lottery_account_ata_after = await provider.connection.getParsedAccountInfo(Lottery_USDC_ATA.address) as any;

      assert.equal((90 * 100 / 100), Number(winner_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal((5 * 100 / 100), Number(team_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal((5 * 100 / 100), Number(association_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal(0, Number(lottery_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
    });

    it("It create a Lottery 5 USDC", async () => {
      _lottery_pda = await getPDA("lottery_five", bufferedTimestamp, program.programId);

      if (actual_cluster === "LOCALNET") {
        await provider.connection.confirmTransaction(
          await provider.connection.requestAirdrop(localnetUSDCCreator.publicKey, 1000000000),
          "processed"
        );

        USDC_Mint = await createMint(
          provider.connection,
          localnetUSDCCreator,
          localnetUSDCCreator.publicKey,
          null,
          6
        )
      }

      Lottery_USDC_5_ATA = await getOrCreateAssociatedTokenAccount(
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
          Lottery_USDC_5_ATA.address,
          localnetUSDCCreator,
          500 * 1e6
        )
      }

      const lottery_account_ata = await provider.connection.getParsedAccountInfo(Lottery_USDC_5_ATA.address) as any;
      assert.equal(500, Number(lottery_account_ata.value.data.parsed.info.tokenAmount.amount) / 1e6);
    });

    it("It distribute to team, association and winner (Lottery 5 USDC)", async () => {
      await getOrCreateATA(
        provider,
        adminWallet,
        actual_cluster,
        (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
        lotteryWinnerAccount,
        lotteryTeamAccount,
        lotteryAssociationAccount
      )

      // @ts-ignore
      await program.methods.distributeLottery(new anchor.BN(500 * 1e6), bufferedTimestamp, "lottery_five")
        .accounts({
          signer: adminWallet.publicKey,
          usdcMint: USDC_Mint,
          lotteryAta: Lottery_USDC_5_ATA.address,
          lotteryAtaAuthority: _lottery_pda,
          winnerAta: Winner_ATA.address,
          teamAta: Team_ATA.address,
          associationAta: Association_ATA.address
        })
        .signers([adminWallet])
        .rpc({ skipPreflight: true })

      const winner_account_ata_after = await provider.connection.getParsedAccountInfo(Winner_ATA.address) as any;
      const team_account_ata_after = await provider.connection.getParsedAccountInfo(Team_ATA.address) as any;
      const association_account_ata_after = await provider.connection.getParsedAccountInfo(Association_ATA.address) as any;
      const lottery_account_ata_after = await provider.connection.getParsedAccountInfo(Lottery_USDC_ATA.address) as any;

      assert.equal((90 * 500 / 100), Number(winner_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal((5 * 500 / 100), Number(team_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal((5 * 500 / 100), Number(association_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal(0, Number(lottery_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
    });

    it("It create a Lottery 10 USDC", async () => {
      _lottery_pda = await getPDA("lottery_ten", bufferedTimestamp, program.programId);

      if (actual_cluster === "LOCALNET") {
        await provider.connection.confirmTransaction(
          await provider.connection.requestAirdrop(localnetUSDCCreator.publicKey, 1000000000),
          "processed"
        );

        USDC_Mint = await createMint(
          provider.connection,
          localnetUSDCCreator,
          localnetUSDCCreator.publicKey,
          null,
          6
        )
      }

      Lottery_USDC_10_ATA = await getOrCreateAssociatedTokenAccount(
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
          Lottery_USDC_10_ATA.address,
          localnetUSDCCreator,
          1000 * 1e6
        )
      }

      const lottery_account_ata = await provider.connection.getParsedAccountInfo(Lottery_USDC_10_ATA.address) as any;
      assert.equal(1000, Number(lottery_account_ata.value.data.parsed.info.tokenAmount.amount) / 1e6);
    });

    it("It distribute to team, association and winner (Lottery 10 USDC)", async () => {
      await getOrCreateATA(
        provider,
        adminWallet,
        actual_cluster,
        (actual_cluster === LOCALNET) ? USDC_Mint : USDC_DEVNET_Mint,
        lotteryWinnerAccount,
        lotteryTeamAccount,
        lotteryAssociationAccount
      )

      // @ts-ignore
      await program.methods.distributeLottery(new anchor.BN(1000 * 1e6), bufferedTimestamp, "lottery_ten")
        .accounts({
          signer: adminWallet.publicKey,
          usdcMint: USDC_Mint,
          lotteryAta: Lottery_USDC_10_ATA.address,
          lotteryAtaAuthority: _lottery_pda,
          winnerAta: Winner_ATA.address,
          teamAta: Team_ATA.address,
          associationAta: Association_ATA.address
        })
        .signers([adminWallet])
        .rpc({ skipPreflight: true })

      const winner_account_ata_after = await provider.connection.getParsedAccountInfo(Winner_ATA.address) as any;
      const team_account_ata_after = await provider.connection.getParsedAccountInfo(Team_ATA.address) as any;
      const association_account_ata_after = await provider.connection.getParsedAccountInfo(Association_ATA.address) as any;
      const lottery_account_ata_after = await provider.connection.getParsedAccountInfo(Lottery_USDC_ATA.address) as any;

      assert.equal((90 * 1000 / 100), Number(winner_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal((5 * 1000 / 100), Number(team_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal((5 * 1000 / 100), Number(association_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
      assert.equal(0, Number(lottery_account_ata_after.value.data.parsed.info.tokenAmount.amount) / 1e6);
    });
  }
});

/**
 *
 * @param key
 * @param bufferedTimestamp
 * @param programId
 */
const getPDA = async (
  key: string,
  bufferedTimestamp: Buffer,
  programId: PublicKey
) => {
  let seed;

  seed = [
    Buffer.from(anchor.utils.bytes.utf8.encode(key)),
    bufferedTimestamp
  ]

  const [_pda, _] = await PublicKey.findProgramAddress(
    seed,
    programId,
  );

  return _pda
}

/**
 *
 * @param provider
 * @param adminWallet
 * @param actual_cluster
 * @param USDC_Mint
 * @param lotteryWinnerAccount
 * @param lotteryTeamAccount
 * @param lotteryAssociationAccount
 */
const getOrCreateATA = async (
  provider: any,
  adminWallet: Signer,
  actual_cluster: string,
  USDC_Mint: PublicKey,
  lotteryWinnerAccount: any,
  lotteryTeamAccount: any,
  lotteryAssociationAccount: any
) => {
  Winner_ATA = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    adminWallet,
    USDC_Mint,
    lotteryWinnerAccount.publicKey
  )

  Team_ATA = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    adminWallet,
    USDC_Mint,
    lotteryTeamAccount.publicKey
  )

  Association_ATA = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    adminWallet,
    USDC_Mint,
    lotteryAssociationAccount.publicKey
  )
}
