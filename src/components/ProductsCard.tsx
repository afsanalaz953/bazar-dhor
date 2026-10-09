import { TMark } from '@/types/mark.types';



const ProductsCard = ( {products} :{products:TMark}) => {
// number turns in bengali
const enToBn = (num : number) =>
  Number(num).toLocaleString('bn-BD', { useGrouping: false });

    // {plansdata}: {plansdata: TApp}
    return (
       
 <div className="card  bg-base-100 shadow-sm ">
  <div className="card-body">
   
    {/* intro */}
    <div className='flex gap-2 justify-start '>
    <div className='bg-slate-100 w-6 h-6 rounded '>
      {products.image}
    </div>
    <div className="">
      <h2 className=" font-bold text-lg">{products.nameBn}  </h2>
      <span className="">প্রতি {products.unit}</span>
    </div>
    </div>
    {/* intro */}
    {/* nextdiv */}
    <div className='flex justify-between'>
       <div className="mt-2 flex flex-col  ">
      
         <span>আজকের দাম</span>
     
  
       <span className='font-bold text-lg'> {enToBn(products.today)} টাকা</span>
    
     </div>
      {/* <span className="badge badge-xs badge-warning">{products.unit}</span> */}
       <button className= {`bg-slate-100 btn rounded-2xl ${products.change.dir === 'down' ? 'text-red-600' : 'text-green-600' }`}>
              {products.change.dir === 'down' ? '▼' : '▲'} {enToBn(products.change.pct)}%
             </button>

    </div>
    
    
  </div>
</div>
       
    );
};

export default ProductsCard;