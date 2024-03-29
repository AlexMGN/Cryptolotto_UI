import React, { FC } from "react";

export const Maintenance: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-6xl text-primary mb-16">We’ll be back soon!</p>
      <div className="w-2/3 text-center">
        <p className="text-2xl text-primary">Sorry for the inconvenience. We&rsquo;re performing some maintenance at the moment. If you need to you can always follow us on
          <a href="https://twitter.com/cryptolotto_one" target="_blank">
            <b> Twitter </b>
          </a>
          for updates, otherwise we&rsquo;ll be back up shortly!
        </p>
        <p className="text-2xl text-primary">You can also have the information live on our
          <a href="https://discord.gg/NwqSVE8E" target="_blank">
            <b> Discord.</b>
          </a>
        </p>
        <p className="text-2xl text-primary mt-16">&mdash; <b>The Cryptolotto Team</b></p>
      </div>
    </div>
  );
};
