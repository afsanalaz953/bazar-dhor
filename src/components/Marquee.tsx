
import React from 'react';
import Link from 'next/link';
import { TMark } from '@/types/mark.types';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const Marquee = async() => {
    const res= await fetch("https://api.abcz.workers.dev/api/bazardor/products",{
         cache: "no-store" 
    })
    const allMarData = await res.json();
    const marData = allMarData.slice(0,10)
    console.log (marData, 'Markdata')
    return (
        <div className='bg-white'>
            <div className="divider"></div>
            <MarqueeText duration = {10}>
            {marData.map((mark: TMark) => <Link key={mark.id} href={mark.slug}>
            <div className='flex gap-2 ml-4'>
             <span>{mark.categoryIcon}</span>
             <span>{mark.nameBn}</span>
             <span>{mark.today}</span>
             <span>টাকা/{mark.unit}</span>
             <span className={mark.change.dir === 'down' ? 'text-red-600' : 'text-green-600'}>
              {mark.change.dir === 'down' ? '▼' : '▲'} {mark.change.pct}%
             </span>
            </div>
            
            </Link>)} 
            </MarqueeText>
        </div>
    );
};

export default Marquee;