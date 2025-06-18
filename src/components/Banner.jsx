import React, { useEffect } from "react";

function Banner({ gameBanner }) {
  useEffect(() => {
    // Component logic here
  });

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div className="absolute bottom-0 p-6 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent w-full min-h-[200px] flex flex-col justify-end">
        <h2 className="text-[32px] text-white font-bold mb-4">
          {gameBanner.name}
        </h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 w-fit">
          Get Now
        </button>
      </div>
      <img
        src={gameBanner.background_image}
        className="w-full h-[600px] object-cover object-top"
        alt={gameBanner.name}
      />
    </div>
  );
}

export default Banner;
