import { FC } from 'react';
import logo from "../../public/logo.png";
import Link from "next/link";

export const Footer: FC = () => {
    return (
        <div>
            <div className="h-1/2 mb-[-1px] w-full">
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
                                <path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"/>
                            </svg>
                        </a>
                        <a className="mr-4 xl:mr-8" href="" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                        </a>
                        <a className="mr-4 xl:mr-8" href="" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                            </svg>
                        </a>
                        <a className="mr-4 xl:mr-8" href="" target="_blank">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.802 17.77a.703.703 0 11-.002 1.406.703.703 0 01.002-1.406m11.024-4.347a.703.703 0 11.001-1.406.703.703 0 01-.001 1.406m0-2.876a2.176 2.176 0 00-2.174 2.174c0 .233.039.465.115.691l-7.181 3.823a2.165 2.165 0 00-1.784-.937c-.829 0-1.584.475-1.95 1.216l-6.451-3.402c-.682-.358-1.192-1.48-1.138-2.502.028-.533.212-.947.493-1.107.178-.1.392-.092.62.027l.042.023c1.71.9 7.304 3.847 7.54 3.956.363.169.565.237 1.185-.057l11.564-6.014c.17-.064.368-.227.368-.474 0-.342-.354-.477-.355-.477-.658-.315-1.669-.788-2.655-1.25-2.108-.987-4.497-2.105-5.546-2.655-.906-.474-1.635-.074-1.765.006l-.252.125C7.78 6.048 1.46 9.178 1.1 9.397.457 9.789.058 10.57.006 11.539c-.08 1.537.703 3.14 1.824 3.727l6.822 3.518a2.175 2.175 0 002.15 1.862 2.177 2.177 0 002.173-2.14l7.514-4.073c.38.298.853.461 1.337.461A2.176 2.176 0 0024 12.72a2.176 2.176 0 00-2.174-2.174"/>
                            </svg>
                        </a>
                        <a className="mr-4 xl:mr-8" href="mailto:contact@cryptolotto.one" target="_blank">
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
                                        <a className="xl:text-lg">How to play</a>
                                    </div>
                                </Link>
                            </li>
                            <li className="xl:mb-3 pt-2 md:mb-1.5">
                                <Link href="/lotteries/medium">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">How it work</a>
                                    </div>
                                </Link>
                            </li>
                            <li className="xl:mb-3 pt-2 md:mb-1.5">
                                <Link href="/lotteries/degen">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Roadmap</a>
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
                            {/* UNCOMMENT */}
                            {/*<li className="xl:mb-1 pt-1.5">
                                <Link href="/lotteries/degen">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Degen<span style={{ color: "#F50009", fontSize: "2em" }}>.</span> (5 USDC)</a>
                                    </div>
                                </Link>
                            </li>*/}
                            {/* UNCOMMENT */}
                            {/*<li className="xl:mb-1 pt-1.5">
                                <Link href="/lotteries/whale">
                                    <div style={{ textAlign: "center", cursor: "pointer" }}>
                                        <a className="xl:text-lg">Whale<span style={{ color: "#F50009", fontSize: "2em" }}>.</span> (10 USDC)</a>
                                    </div>
                                </Link>
                            </li>*/}
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};
