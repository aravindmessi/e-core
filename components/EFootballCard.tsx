import React from "react";

const EFootballCard = ({ player }) => {
  if (!player) return null;

  const cardImage = player.cardImageUrl || player.imageUrl;
  const name = player.name || "Unknown";
  const position = player.position || "N/A";
  const overall = player.overall || 0;
  const type = player.cardType || "Featured";

  return (
    <div className="relative w-[160px] h-[230px] overflow-hidden p-0 m-0 bg-transparent shadow-none border-none">

      <img
        src={cardImage}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover block"
      />

      {/* Top Left */}
      <div className="absolute top-1 left-1 text-white text-2xl font-extrabold drop-shadow-[0_0_4px_black] leading-none z-20">
        {overall}
        <div className="text-[10px] font-bold">{position}</div>
      </div>

      {/* Card Type Badge */}
      <div className="absolute top-1 right-1 z-20 px-1 py-[2px] rounded bg-purple-600 text-white text-[8px] font-bold uppercase">
        {type}
      </div>

      {/* Player Name - FIXED */}
      <div className="absolute bottom-0 left-0 w-full text-center px-1 py-1 
                      text-white text-[13px] font-bold 
                      bg-black/40 backdrop-blur-[1px] 
                      drop-shadow-[0_0_4px_black]">
        {name}
      </div>
    </div>
  );
};

export default EFootballCard;
