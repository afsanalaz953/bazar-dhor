
import React from 'react';

// বাংলা ইউনিট ম্যাপিং
const unitBn: Record<string, string> = {
  kg: 'কেজি',
  gram: 'গ্রাম',
  litre: 'লিটার',
  piece: 'পিস',
  dozen: 'ডজন',
};

// যেকোনো unit-কে বাংলায় রূপান্তর করার ফাংশন
export const toBnUnit = (unit: string): string => {
  return unitBn[unit?.toLowerCase()] ?? unit;
};

// ডেমো কম্পোনেন্ট (চাইলে ব্যবহার করতে পারেন)
const StringBn = () => {
  const units = ['kg', 'gram', 'litre', 'piece', 'dozen', 'ton'];

  return (
    <div className="p-4">
      {/* <h2 className="font-bold mb-2">ইউনিট বাংলায়:</h2> */}
      <ul className="space-y-1">
        {units.map((u) => (
          <li key={u}>
            {u} → {toBnUnit(u)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StringBn;