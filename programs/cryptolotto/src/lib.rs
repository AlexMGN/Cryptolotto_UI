use anchor_lang::prelude::*;
use anchor_spl::token::{
    Mint,
    Token,
    TokenAccount,
    Transfer,
    transfer,
};
use anchor_spl::associated_token::AssociatedToken;
use std::str::FromStr;

declare_id!("6bZfjVTqcCVhwXxr4qibktLfv1QHvaUbKDryxWXjQ6NB");

#[program]
pub mod cryptolotto {
    use anchor_lang::solana_program::entrypoint::ProgramResult;
    use super::*;

    #[access_control(is_admin(*ctx.accounts.signer.key))]
    pub fn distribute_lottery(ctx: Context<DistributeCtx>, amount: u64, lottery_timestamp: [u8; 8], lottery_type_derive_pda: String) -> ProgramResult {
        let token_program = &ctx.accounts.token_program;

        msg!("Distribution in progress");

        let (_, lottery_pda_bump) =
            Pubkey::find_program_address(&[&lottery_type_derive_pda.as_bytes(), &lottery_timestamp], ctx.program_id);

        let token_account_list: [&Account<TokenAccount>; 2] = [&ctx.accounts.winner_ata, &ctx.accounts.team_ata];

        for (i, token_account) in token_account_list.iter().enumerate() {
            let amount_to_send: u64;

            match i {
                0 => {
                    msg!("Distribution in progress for the Winner");
                    amount_to_send = 80 * amount / 100
                },
                1 => {
                    msg!("Distribution in progress for the Team Cryptolotto");
                    amount_to_send = 20 * amount  / 100
                },
                _ => amount_to_send = 0
            };

            transfer(
                CpiContext::new_with_signer(
                    token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.lottery_ata.to_account_info(),
                        to: token_account.to_account_info(),
                        authority: ctx.accounts.lottery_ata_authority.to_account_info(),
                    },
                    &[&[
                        &lottery_type_derive_pda.as_bytes(),
                        &lottery_timestamp,
                        &[lottery_pda_bump]
                    ]]
                ),
                amount_to_send,
            )?;
        }

        msg!("Distribution completed! Congratulations");

        Ok(())
    }

    pub fn deposit(ctx: Context<DepositCtx>, amount: u64) -> ProgramResult {
        let token_program = &ctx.accounts.token_program;

        msg!("Deposit in progress");

        transfer(
            CpiContext::new(
                token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.participant_ata.to_account_info(),
                    to: ctx.accounts.lottery_ata.to_account_info(),
                    authority: ctx.accounts.signer.to_account_info(),
                },
            ),
            amount,
        )?;

        msg!("Deposit completed! Good Luck");

        Ok(())
    }

}

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct DistributeCtx<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    pub usdc_mint: Account<'info, Mint>,
    #[account(
        mut,
        constraint = lottery_ata.mint == usdc_mint.key(),
        constraint = lottery_ata.amount > 1,
        constraint = lottery_ata.amount.eq(&amount),
    )]
    pub lottery_ata: Box<Account<'info, TokenAccount>>,
    /// CHECK:
    #[account(
        constraint = lottery_ata_authority.key() == lottery_ata.owner
    )]
    pub lottery_ata_authority: AccountInfo<'info>,
    #[account(
        mut,
        constraint = winner_ata.mint == usdc_mint.key(),
    )]
    pub winner_ata: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        constraint = team_ata.mint == usdc_mint.key(),
    )]
    pub team_ata: Box<Account<'info, TokenAccount>>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
    pub token_program: Program<'info, Token>
}

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct DepositCtx<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    pub usdc_mint: Account<'info, Mint>,
    #[account(
        mut,
        constraint = lottery_ata.mint == usdc_mint.key(),
    )]
    pub lottery_ata: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        constraint = participant_ata.mint == usdc_mint.key(),
    )]
    pub participant_ata: Box<Account<'info, TokenAccount>>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
    pub token_program: Program<'info, Token>
}

pub fn is_admin(signer: Pubkey) -> Result<()> {
    if signer == Pubkey::from_str("DQaQgYZ8Hw7augfc2sAZSuXYj1UwTSBFfbvBG243MVU9").unwrap() {
        Ok(())
    } else {
        return Err(error!(ErrorCode::NotAuthorized));
    }
}

#[error_code]
pub enum ErrorCode {
    #[msg("Not Authorized")]
    NotAuthorized
}
