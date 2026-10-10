import Link from 'next/link';
import React from 'react';
import {TNavLink} from '@/types/nav.types'

// interface InavLink {
//     id: string
//   slug: string
//   nameBn: string
//   icon: string
// }

const Navber = async() => {
    // const res = await fetch( "https://api.abcz.workers.dev/api/bazardor/categories")
    const res = await fetch( "https://api.api-store.workers.dev/api/bazardor/categories")
    const navData = await res.json();
    console.log(navData, 'navdata')
    return (
        <div className='flex gap-15 justify-start container mx-auto 
          p-4 mt-4 bg-white'>
            {navData.map((navLink:TNavLink) => <Link key={navLink.id} href={`/category/${navLink.slug}`}>
            <div className='flex gap-2'>
             <span>{navLink.icon}</span>
             <span>{navLink.nameBn}</span>
            </div>
            
            </Link>)}
        </div>
    );
};

export default Navber;