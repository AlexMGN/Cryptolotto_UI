import { FC } from 'react';
import logo from "../../public/logo.png";
import Link from "next/link";

export const Footer: FC = () => {
    return (
        <div>
            <div className="h-1/2 mb-[-1px] w-screen">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0C6252" fillOpacity="1" d="M0,256L26.7,240C53.3,224,107,192,160,202.7C213.3,213,267,267,320,250.7C373.3,235,427,149,480,106.7C533.3,64,587,64,640,74.7C693.3,85,747,107,800,138.7C853.3,171,907,213,960,202.7C1013.3,192,1067,128,1120,122.7C1173.3,117,1227,171,1280,197.3C1333.3,224,1387,224,1413,224L1440,224L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"/>
                </svg>
            </div>

            <footer className="mx-auto flex flex-col md:flex-row p-2 h-40 md:h-60 footer bg-primary text-neutral-content">
                <div className="w-22 h-22 xl:ml-10 md:p-6 flex-col footer-small-logo">
                    <img className="footer-logo" src={logo.src} alt="Cryptolotto logo in Footer"/>
                    <div className="flex mb-4 xl:mb-10 mt-2">
                        <a className="ml-4 xl:ml-2 mr-4 xl:mr-8" href="https://www.github.com/AlexMGN" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                                <path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"></path>
                            </svg>
                        </a>
                        <a className="mr-4 xl:mr-8" href="" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a className="mr-4 xl:mr-8" href="" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                            </svg>
                        </a>
                        <a className="mr-4 xl:mr-8" href="" target="_blank">
                            <svg width="24px" height="24px" version="1.1" fill="currentColor">
                                <path id="telegram-5" d="M12,0c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12Zm0,2c5.514,0 10,4.486 10,10c0,5.514 -4.486,10 -10,10c-5.514,0 -10,-4.486 -10,-10c0,-5.514 4.486,-10 10,-10Zm2.692,14.889c0.161,0.115 0.368,0.143 0.553,0.073c0.185,-0.07 0.322,-0.228 0.362,-0.42c0.435,-2.042 1.489,-7.211 1.884,-9.068c0.03,-0.14 -0.019,-0.285 -0.129,-0.379c-0.11,-0.093 -0.263,-0.12 -0.399,-0.07c-2.096,0.776 -8.553,3.198 -11.192,4.175c-0.168,0.062 -0.277,0.223 -0.271,0.4c0.006,0.177 0.125,0.33 0.296,0.381c1.184,0.354 2.738,0.847 2.738,0.847c0,0 0.725,2.193 1.104,3.308c0.047,0.139 0.157,0.25 0.301,0.287c0.145,0.038 0.298,-0.001 0.406,-0.103c0.608,-0.574 1.548,-1.461 1.548,-1.461c0,0 1.786,1.309 2.799,2.03Zm-5.505,-4.338l0.84,2.769l0.186,-1.754c0,0 3.243,-2.925 5.092,-4.593c0.055,-0.048 0.062,-0.13 0.017,-0.188c-0.045,-0.057 -0.126,-0.071 -0.188,-0.032c-2.143,1.368 -5.947,3.798 -5.947,3.798Z"/>
                            </svg>
                        </a>
                        <a className="mr-4 xl:mr-8" href="" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 5v14h-20v-14h20zm2-2h-24v18h24v-18zm-2 16l-6.526-6.618-3.445 3.483-3.418-3.525-6.611 6.66 5.051-8-5.051-6 10.029 7.446 9.971-7.446-4.998 6.01 4.998 7.99z"/>
                            </svg>
                        </a>
                    </div>
                    <p className="xl:text-lg">&copy; Copyright 2022 - All Rights Reserved.</p>
                </div>
                <div className="hidden md:inline max-w-md mx-auto sm:pl-12 grid-flow-col gap-4 text-center">

                </div>
                <div className="hidden md:inline grid-flow-col gap-4 md:mr-14 xl:mr-36 left-constraint">
                    <div>
                        <ul style={{ textAlignLast: "left" }}>
                            <li className="xl:mb-3 md:mb-1.5">
                                <Link href="/lotteries/low">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Private Policy</a>
                                    </div>
                                </Link>
                            </li>
                            <li className="xl:mb-3 pt-2 md:mb-1.5">
                                <Link href="/lotteries/medium">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Support</a>
                                    </div>
                                </Link>
                            </li>
                            <li className="xl:mb-3 pt-2 md:mb-1.5">
                                <Link href="/lotteries/degen">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Homepage</a>
                                    </div>
                                </Link>
                            </li>
                            <li className="xl:mb-3 pt-2">
                                <Link href="/lotteries/whale">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Terms of Services</a>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="hidden md:inline grid-flow-col gap-4 md:mr-14 xl:mr-36">
                    <div>
                        <ul style={{ textAlignLast: "left" }}>
                            <li className="xl:mb-1">
                                <Link href="/lotteries/low">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Low<span style={{ color: "#F50009", fontSize: "2em" }}>.</span> (1 USDC)</a>
                                    </div>
                                </Link>
                            </li>
                            <li className="xl:mb-1 pt-1.5">
                                <Link href="/lotteries/medium">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Medium<span style={{ color: "#F50009", fontSize: "2em" }}>.</span> (2 USDC)</a>
                                    </div>
                                </Link>
                            </li>
                            <li className="xl:mb-1 pt-1.5">
                                <Link href="/lotteries/degen">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Degen<span style={{ color: "#F50009", fontSize: "2em" }}>.</span> (5 USDC)</a>
                                    </div>
                                </Link>
                            </li>
                            <li className="xl:mb-1 pt-1.5">
                                <Link href="/lotteries/whale">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Whale<span style={{ color: "#F50009", fontSize: "2em" }}>.</span> (10 USDC)</a>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};
