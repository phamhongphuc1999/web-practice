import { FileText, Lock, Shield, Unlock, User } from 'lucide-react';
import React from 'react';
import { CARD_WIDTH } from 'src/configs/constance';
import { CardProps, EncryptionState } from 'src/global';
import ScrambleText from './ScrambleText';

const Card: React.FC<CardProps> = ({ data, distanceFromGate }) => {
  // Calculate percentage of card that has passed the gate
  // distanceFromGate is distance from center of card to center of screen (gate)
  // Positive = Right of gate, Negative = Left of gate

  // Left Edge of card = distance - width/2
  // If Left Edge > 0, 0% passed.
  // If Right Edge (distance + width/2) < 0, 100% passed.

  // We want the cut point relative to the card's width.
  // Percentage = (CardWidth/2 - distance) / CardWidth

  const progress = 0.5 - distanceFromGate / CARD_WIDTH;
  const percentage = Math.min(Math.max(progress * 100, 0), 100);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-xl bg-gray-900 shadow-2xl">
      {/* -----------------------------
          LAYER 1: ENCRYPTED (BACK)
          Visible on the LEFT side of the wipe
         ----------------------------- */}
      <div
        className="absolute inset-0 z-10 flex flex-col overflow-hidden rounded-xl border border-green-500/50 bg-black"
        style={{ clipPath: `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)` }}
      >
        {/* Matrix Background Effect */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div
            className="animate-matrix h-[200%] w-full"
            style={{
              // eslint-disable-next-line quotes
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.text%7Bfont-family:monospace;fill:%2322c55e;font-size:10px;%7D%3C/style%3E%3Ctext x='10' y='20' class='text'%3E10101%3C/text%3E%3Ctext x='30' y='40' class='text'%3E01011%3C/text%3E%3Ctext x='50' y='60' class='text'%3E11001%3C/text%3E%3Ctext x='70' y='80' class='text'%3E00101%3C/text%3E%3Ctext x='10' y='90' class='text'%3E11111%3C/text%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          ></div>
        </div>

        {/* Encrypted Header */}
        <div className="flex items-center justify-between border-b border-green-900/50 bg-green-950/20 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-green-500">
            <Shield size={16} className="animate-pulse" />
            <span className="font-mono text-xs tracking-widest">ENCRYPTED</span>
          </div>
          <Lock size={14} className="text-green-600" />
        </div>

        {/* Encrypted Body */}
        <div className="relative flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-green-500/30 bg-green-900/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <Lock size={40} className="text-green-500" />
          </div>

          <div className="mt-4 w-full space-y-3">
            <div className="h-2 w-full overflow-hidden rounded bg-green-900/30">
              <div className="h-full w-[80%] animate-pulse bg-green-500/50"></div>
            </div>
            <div className="mx-auto h-2 w-2/3 rounded bg-green-900/30"></div>
            <div className="h-2 w-full rounded bg-green-900/30"></div>
          </div>

          <div className="mt-4 text-center font-mono text-[10px] leading-3 break-all text-green-500/60">
            {Array.from({ length: 80 })
              .map(() => (Math.random() > 0.5 ? '1' : '0'))
              .join('')}
          </div>
        </div>

        {/* Encrypted Footer */}
        <div className="border-t border-green-900/50 bg-green-900/20 p-3">
          <div className="flex justify-between font-mono text-[10px] text-green-400">
            <span>
              ID: <ScrambleText text={data.id} state={EncryptionState.ENCRYPTED} />
            </span>
            <span>SECURE</span>
          </div>
        </div>
      </div>

      {/* -----------------------------
          LAYER 2: CLEARTEXT (FRONT)
          Visible on the RIGHT side of the wipe
         ----------------------------- */}
      <div
        className="absolute inset-0 z-20 flex flex-col overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900"
        style={{ clipPath: `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)` }}
      >
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-800">
          <div className="absolute inset-0 z-10 bg-linear-to-t from-gray-900 to-transparent" />
          <img
            src={data.imageUrl}
            alt={data.title}
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 right-3 z-20">
            <div className="flex items-center gap-1 rounded border border-gray-600/50 bg-black/60 px-2 py-1 font-mono text-xs text-gray-300 backdrop-blur">
              <Unlock size={12} /> PUBLIC
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-1 text-xs font-bold tracking-wider text-blue-400 uppercase">
                {data.role}
              </div>
              <h3 className="text-xl leading-tight font-bold text-white">{data.title}</h3>
            </div>
            {data.role.includes('Document') ? (
              <FileText className="text-gray-500" size={24} />
            ) : (
              <User className="text-gray-500" size={24} />
            )}
          </div>

          <div className="mt-auto border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between font-mono text-xs text-gray-500">
              <span>ID: {data.id}</span>
              <span className="flex items-center gap-1">
                <span
                  className={`h-2 w-2 rounded-full ${data.clearanceLevel > 5 ? 'bg-red-500' : 'bg-blue-500'}`}
                ></span>
                LVL {data.clearanceLevel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
