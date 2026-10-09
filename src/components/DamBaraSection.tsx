import { TMark } from '@/types/mark.types';
import React from 'react';
import { BiSolidUpArrow } from 'react-icons/bi';

const DamBaraSection = async() => {
const res = await fetch( "https://api.abcz.workers.dev/api/bazardor/products")
    const allProductsData = await res.json();
    console.log(allProductsData, 'AllProductsdata')

    // dam bara products berkora
      const increasedProducts =  allProductsData.filter(
      (increasedProducts: TMark) =>  increasedProducts.change.dir === "up"
    );
    console.log(increasedProducts, 'dambara products')

    // sorting kora decending order
    const decendingProducts = increasedProducts.sort((a : TMark, b : TMark) => b.change.pct - a.change.pct);
//  top 6 ta up products
   const topUpProducts = decendingProducts.slice(0, 6);
   console.log (topUpProducts, "top dam bara products")

// number turns in bengali
const enToBn = (num : number) =>
  Number(num).toLocaleString('bn-BD', { useGrouping: false });


    return (
        <div className='container mx-auto' >
            <div className='flex gap-2 mt-6  '>
               <span className='bg-green-600 w-5 h-5'><BiSolidUpArrow />    </span>
            <h2 className='font-bold text-2xl'>আজ দাম বেড়েছে   </h2>
            </div>
            
            <div className='grid grid-cols-3 gap-4 my-6'>
            {
                topUpProducts.map((upProducts: TMark) => <div key={upProducts.id}>
                   
                    <div className="card  bg-base-100 shadow-sm ">
  <div className="card-body">
   
    {/* intro */}
    <div className='flex gap-2 justify-start '>
    <div className='bg-slate-100 w-6 h-6 rounded '>
      {upProducts.image}
    </div>
    <div className="">
      <h2 className=" font-bold text-lg">{upProducts.nameBn}  </h2>
      <span className="">প্রতি {upProducts.unit}</span>
    </div>
    </div>
    {/* intro */}
    {/* nextdiv */}
    <div className='flex justify-between'>
       <div className="mt-2 flex flex-col  ">
      
         <span>আজকের দাম</span>
     
  
       <span className='font-bold text-lg'> {enToBn(upProducts.today)} টাকা</span>
    
     </div>
      {/* <span className="badge badge-xs badge-warning">{products.unit}</span> */}
       <button className= {`bg-slate-100 btn rounded-2xl ${upProducts.change.dir === 'down' ? 'text-red-600' : 'text-green-600' }`}>
              {upProducts.change.dir === 'down' ? '▼' : '▲'} {enToBn(upProducts.change.pct)}%
             </button>

    </div>
    
    
  </div>
</div>
                </div>
            )}
            </div>
        </div>
    );
};

export default DamBaraSection;