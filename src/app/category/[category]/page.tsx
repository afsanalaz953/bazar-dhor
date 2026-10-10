import {toBnUnit} from '@/components/StringBn';
import { TMark } from '@/types/mark.types';
import Search from '@/components/Search'

const CategoryPage = async({params}:{params:{category:string}}) => {
    const {category} = await params;
     const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${category}`,
    { cache: 'no-store' }
  );
  const categoryData = await res.json();
    console.log(categoryData, 'categorydata')
    return (
        <div className=' bg-[#F0F5F0]'>
           
            <div className='container mx-auto'>
                <div className=' container mx-auto rounded flex gap-2 p-4 shadow bg-white'>
                  
                    <span> {categoryData[0]?.image} </span> 
                    <span>
                       <h1 className='font-bold text-2xl'> {categoryData[0]?.categoryNameBn ?? category} </h1>
                       <p className='font-bold'> {categoryData.length.toLocaleString('bn-BD')} টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                    </span>
                   </div>
                   {/* sort div */}
                   <div className='p-3 shadow bg-white mt-4 flex gap-2 justify-end'>
                    <button>সাজান</button>
                   <button> <Search />   </button> 
                   </div>
                   {/* card div */}
                   <div className='m-2'>
                    <h2 className='font-bold'>মোট {categoryData.length.toLocaleString('bn-BD')}  টি পণ্য দেখানো হচ্ছে</h2>
                    <div className='grid grid-cols-3 gap-4 my-6'>
                        {categoryData.map ((cat:TMark, id: number) => <div key={id}   className="card  bg-base-100 shadow-sm ">
  <div className="card-body">
   
    {/* intro */}
    <div className='flex gap-2 justify-start '>
    <div className='bg-slate-100 w-6 h-6 rounded '>
      {cat.image}
    </div>
    <div className="">
      <h2 className=" font-bold text-lg">{cat.nameBn}  </h2>
      <span className="">প্রতি {toBnUnit(cat?.unit)}</span>
    </div>
    </div>
    {/* intro */}
    {/* nextdiv */}
    <div className='flex justify-between'>
       <div className="mt-2 flex flex-col  ">
      
         <span>আজকের দাম</span>
     
  
       <span className='font-bold text-lg'> {(cat.today.toLocaleString('bn-BD'))} টাকা</span>
    
     </div>
      {/* <span className="badge badge-xs badge-warning">{products.unit}</span> */}
       <button className= {`bg-slate-100 btn rounded-2xl ${cat.change.dir === 'down' ? 'text-red-600' : 'text-green-600' }`}>
              {cat.change.dir === 'down' ? '▼' : '▲'} {(cat.change.pct.toLocaleString('bn-BD'))}%
             </button>

    </div>
    
    
  </div>
</div>
                        
                        )}
                    </div>
                   </div>

             
            </div>
        </div>
    );
};

export default CategoryPage;