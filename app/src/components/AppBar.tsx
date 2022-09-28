import { FC, useState } from 'react';
import Link from "next/link";

import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import logo from '../../public/logo.png';
import { Transition } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
export const AppBar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { publicKey } = useWallet();

  return (
    <div>
      <div className="navbar flex sm:justify-around flex-row md:mb-2 shadow-lg bg-neutral text-primary">
        <div className="navbar-start flex">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="ml-5 bg-neutral inline-flex items-center justify-center p-2 text-primary md:hidden z-20"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>

          <div className="w-22 h-22 md:p-6 md:ml-5 hidden md:inline md:pl-10 xl:inline">
            <img style={{ maxWidth: "70%" }} src={logo.src} alt=""/>
          </div>
        </div>

        <div className="md:hidden w-full left-0 absolute z-0">
          <div className="w-22 h-22 md:p-2 w-full">
            <img className="m-auto w-[25%]" src={logo.src} alt=""/>
          </div>
        </div>

        <div className="navbar-end flex font-display font-bold hidden md:flex">
          <div className="flex">
            <Link href="/">
              <a className="reward-sm md:text-lg xl:text-xl" style={{ textTransform: "none" }}>Rewards</a>
            </Link>
            <div className="dropdown flex justify-center">
              <div className="group flex justify-center relative">
                <div className="flex flex-row">
                  <a tabIndex={0} className="lottery-sm md:text-lg xl:text-xl xl:mx-28 md:mx-10 w-full flex" style={{ textTransform: "none", cursor: "pointer" }}>
                    Lotteries
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
                <ul tabIndex={0} className="absolute hidden p-3 shadow menu group-hover:flex bg-neutral rounded-box mt-6 w-full xl:w-1/2 z-50">
                  <li className="mb-3">
                    <Link href="/lotteries/low">
                      <div style={{ textAlign: "center", cursor: "pointer" }}>
                        <a>Low<span style={{ color: "#F50009" }}>.</span> <br />(1 USDC)</a>
                      </div>
                    </Link>
                  </li>
                  <hr/>
                  <li className="mb-3 pt-2">
                    <Link href="/lotteries/medium">
                      <div style={{ textAlign: "center", cursor: "pointer" }}>
                        <a>Medium<span style={{ color: "#F50009" }}>.</span> <br />(2 USDC)</a>
                      </div>
                    </Link>
                  </li>
                  <hr/>
                  <li className="mb-3 pt-2">
                    {/* DELETE */}
                    <div style={{ textAlign: "center", cursor: "pointer", transform: "rotate(-10deg)" }}>
                      <a>Coming <br/> Soon<span style={{ color: "#F50009" }}>.</span> <br /></a>
                    </div>

                    {/*<Link href="/lotteries/degen">
                      <div style={{ textAlign: "center", cursor: "pointer" }}>
                        <a>Degen<span style={{ color: "#F50009" }}>.</span> <br />(5 USDC)</a>
                      </div>
                    </Link>*/}
                  </li>
                  <hr/>
                  <li className="mb-3 pt-2" >
                    {/* DELETE */}
                    <div style={{ textAlign: "center", cursor: "pointer", transform: "rotate(-10deg)" }}>
                      <a>Coming <br/> Soon<span style={{ color: "#F50009" }}>.</span> <br /></a>
                    </div>

                    {/* UNCOMMENT */}
                    {/*<Link href="/lotteries/whale">
                      <div style={{ textAlign: "center", cursor: "pointer" }}>
                        <a>Whale<span style={{ color: "#F50009" }}>.</span> <br />(10 USDC)</a>
                      </div>
                    </Link>*/}
                  </li>
                  <hr/>
                  <li className="mb-3 mt-3 pt-2" >
                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                      <Link href="https://cryptolotto.gitbook.io/docs/">
                        <a target="_blank" rel="noopener noreferrer">
                          Docs<span style={{ color: "#F50009" }}>.</span>
                        </a>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mr-20 md:mr-10 xl:mr-20">
            <WalletMultiButton className="btn btn-ghost mr-20 wallet-button" />
          </div>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <ul className="p-4 menu h-full bg-neutral text-primary font-bold">
                { publicKey &&
                <div className="text-center mb-2 w-full flex justify-center">
                    <div className="bg-primary text-neutral border-solid border-2 border-primary pl-[10px] pr-[10px] rounded-[20px]">
                      {
                        publicKey.toString().slice(0, 4)  + '...' + publicKey.toString().slice(-4)
                      }
                    </div>
                </div>
                }

                <li onClick={() => setIsOpen(!isOpen)}>
                  <Link href="/">
                    <a className="mobile-menu-focus">Rewards</a>
                  </Link>
                </li>
                <hr />
                <li className="mb-3" onClick={() => setIsOpen(!isOpen)}>
                  <Link href="/lotteries/low">
                    <a className="mobile-menu-focus">Low<span style={{ color: "#F50009" }}>.</span>&nbsp; (1 USDC)</a>
                  </Link>
                </li>
                <li className="mb-3" onClick={() => setIsOpen(!isOpen)}>
                  <Link href="/lotteries/medium">
                    <a className="mobile-menu-focus">Medium<span style={{ color: "#F50009" }}>.</span>&nbsp; (2 USDC)</a>
                  </Link>
                </li>
                <li className="mb-3">
                  <a className="mobile-menu-focus">Coming Soon<span style={{ color: "#F50009" }}>.</span></a>
                </li>
                {/*<li className="mb-3" onClick={() => setIsOpen(!isOpen)}>
                  <Link href="/lotteries/degen">
                    <a className="mobile-menu-focus">Degen<span style={{ color: "#F50009" }}>.</span>&nbsp; (5 USDC)</a>
                  </Link>
                </li>*/}
                {/* DELETE */}
                <li className="mb-3">
                  <a className="mobile-menu-focus">Coming Soon<span style={{ color: "#F50009" }}>.</span></a>
                </li>
                {/* UNCOMMENT */}
                {/*<li className="mb-3" onClick={() => setIsOpen(!isOpen)}>
                  <Link href="/lotteries/whale">
                    <a className="mobile-menu-focus">Whale<span style={{ color: "#F50009" }}>.</span>&nbsp; (10 USDC)</a>
                  </Link>
                </li>*/}
                <hr className="mb-3" />
                <li className="mb-3" onClick={() => setIsOpen(!isOpen)}>
                  <Link href="https://cryptolotto.gitbook.io/docs-2/how-to-play">
                    <a className="mobile-menu-focus" target="_blank" rel="noopener noreferrer">
                      Docs<span style={{ color: "#F50009" }}>.</span>
                    </a>
                  </Link>
                </li>
                <hr className="mb-5" />

                { !publicKey &&
                <WalletMultiButton className="btn btn-ghost wallet-button mb-5" />
                }
                { publicKey &&
                <WalletDisconnectButton className="btn btn-ghost wallet-button mt-5" />
                }
              </ul>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};
