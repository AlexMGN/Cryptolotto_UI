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

declare_id!("BPMCwnBCkGPtPS2uxvbMVdusZ7gopPDGybnLkaTHMSYR");

#[program]
pub mod cryptolotto {
    use anchor_lang::solana_program::entrypoint::ProgramResult;
    use super::*;

    #[access_control(is_admin(*ctx.accounts.signer.key))]
    pub fn distribute_lottery(ctx: Context<DistributeCtx>, amount: u64, lottery_timestamp: [u8; 8], lottery_type_derive_pda: String) -> ProgramResult {
        let token_program = &ctx.accounts.token_program;

        msg!("Distribution in progress");
        msg!("Lottery ATA is {}",
            ctx.accounts.lottery_ata.key().to_string()
        );
        msg!("Winner ATA is {}",
            ctx.accounts.winner_ata.key().to_string()
        );
        msg!("Team ATA is {}",
            ctx.accounts.team_ata.key().to_string()
        );
        msg!("Association ATA is {}",
            ctx.accounts.association_ata.key().to_string()
        );
        msg!("Amount to distribute is {}",
            amount
        );

        let (_, lottery_pda_bump) =
            Pubkey::find_program_address(&[&lottery_type_derive_pda.as_bytes(), &lottery_timestamp], ctx.program_id);

        msg!("Bump to distribute is {}",
            lottery_pda_bump
        );
        transfer(
            CpiContext::new_with_signer(
                token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.lottery_ata.to_account_info(),
                    to: ctx.accounts.winner_ata.to_account_info(),
                    authority: ctx.accounts.lottery_ata_authority.to_account_info(),
                },
                &[&[
                    &lottery_type_derive_pda.as_bytes(),
                    &lottery_timestamp,
                    &[lottery_pda_bump]
                ]]
            ),
            amount - 90,
        )?;

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
    #[account(
        mut,
        constraint = association_ata.mint == usdc_mint.key(),
    )]
    pub association_ata: Box<Account<'info, TokenAccount>>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
    pub token_program: Program<'info, Token>
}

pub fn is_admin(signer: Pubkey) -> Result<()> {
    if signer == Pubkey::from_str("9145ttu78U55JtCZLgomQWWXzQP96pZkjcE2ehkMsEbQ").unwrap() {
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
