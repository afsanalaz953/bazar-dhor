import { TMark } from '@/types/mark.types';

import { RiArrowDownSFill } from 'react-icons/ri';

const DamKomaSection = async() => {
const res = await fetch( "https://api.abcz.workers.dev/api/bazardor/products")
    const allProductsData = await res.json();
    console.log(allProductsData, 'AllProductsdata')

    // dam bara products berkora
      const decreasedProducts =  allProductsData.filter(
      (decreasedProducts: TMark) =>  decreasedProducts.change.dir === "down"
    );
    console.log(decreasedProducts, 'damkoma products')

    // sorting kora decending order
    const acendingProducts = decreasedProducts.sort((a : TMark, b : TMark) => a.change.pct - b.change.pct);
//  top 6 ta up products
   const topDownProducts = acendingProducts.slice(0, 6);
   console.log (topDownProducts, "top dam koma products")

// number turns in bengali
const enToBn = (num : number) =>
  Number(num).toLocaleString('bn-BD', { useGrouping: false });


    return (
        <div className='container mx-auto '>
            <div className='flex gap-2 mt-8  '>
                <span className='bg-green-600 w-5 h-5'> <RiArrowDownSFill /></span>
               <h2 className='font-bold text-2xl '> আজ দাম কমেছে </h2>
            </div>
            
            <div className='grid grid-cols-3 gap-4 my-6'>
            {
                topDownProducts.map((downProducts: TMark) => <div key={downProducts.id}>
                   
                    <div className="card  bg-base-100 shadow-sm ">
  <div className="card-body">
   
    {/* intro */}
    <div className='flex gap-2 justify-start '>
    <div className='bg-slate-100 w-6 h-6 rounded '>
      {downProducts.image}
    </div>
    <div className="">
      <h2 className=" font-bold text-lg">{downProducts.nameBn}  </h2>
      <span className="">প্রতি {downProducts.unit}</span>
    </div>
    </div>
    {/* intro */}
    {/* nextdiv */}
    <div className='flex justify-between'>
       <div className="mt-2 flex flex-col  ">
      
         <span>আজকের দাম</span>
     
  
       <span className='font-bold text-lg'> {enToBn(downProducts.today)} টাকা</span>
    
     </div>
      {/* <span className="badge badge-xs badge-warning">{products.unit}</span> */}
       <button className= {`bg-slate-100 btn rounded-2xl ${downProducts.change.dir === 'down' ? 'text-red-600' : 'text-green-600' }`}>
              {downProducts.change.dir === 'down' ? '▼' : '▲'} {enToBn(downProducts.change.pct)}%
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

export default DamKomaSection;