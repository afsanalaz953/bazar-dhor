import Image from 'next/image';
import React from 'react';


const Header = () => {
// for urrent date
const date = new Date().toLocaleDateString("bn-BD", {dateStyle:"full",});
console.log(date)



    return (
        <div className='flex flex-col-2 justify-between container bg-white mx-auto mt-4'>
            <div className='flex gap-2'>
        <div>
         <Image
  src='/assets/logo-icon.png'
  alt='বাজার দর'
  width={50}
  height={50}
  className="rounded bg-green-400"
/>
              </div>
              <div className=' '>
               <p className='font-bold text-2xl'>বাজার দর</p> 
               <span>{date}</span>
              </div>

            </div>
           
            <div className='flex gap-3'>
                <button className='btn rounded p-4 bg-[#05893E]'>সাইন ইন </button>
                <button className='btn rounded p-4 bg-[#05893E]'>সাইন আপ</button>
            </div>
            
        </div>
    );
};

export default Header;