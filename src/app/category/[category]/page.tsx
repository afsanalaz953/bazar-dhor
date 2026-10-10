import { toBnUnit } from "@/components/StringBn";
import { TMark } from "@/types/mark.types";
import Search from "@/components/Search";
import { Suspense } from "react";

type Props = {
  params: { category: string };
  searchParams: { sort?: string };
};

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const { sort } = await searchParams;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${category}`,
    { cache: "no-store" }
  );
  const categoryData: TMark[] = await res.json();

  // ✅ sort logic
  const sortedData =
    sort === "asc"
      ? [...categoryData].sort((a, b) => Number(a.today) - Number(b.today))
      : sort === "desc"
      ? [...categoryData].sort((a, b) => Number(b.today) - Number(a.today))
      : categoryData;

  return (
    <div className="bg-[#F0F5F0]">
      <div className="divider"></div>

      <div className="container mx-auto">
        {/* header */}
        <div className="container  my-10 mx-auto rounded flex gap-2 p-4 shadow bg-white">
          <span>{categoryData?.[0]?.image}</span>
          <span>
            <h1 className="font-bold text-2xl">
              {categoryData?.[0]?.categoryNameBn ?? category}
            </h1>
            <p className="font-bold">
              {(categoryData?.length ?? 0).toLocaleString("bn-BD")} টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </span>
        </div>

        {/* sort only */}
        <div className="p-3 shadow bg-white mt-4 flex gap-2 justify-end items-center">
          <p className='font-bold'>সাজান</p>
          <Suspense fallback={null}>

            <Search />
          </Suspense>
        </div>

        {/* table / cards */}
        <div className="m-6 pb-20">
          <h2 className="font-bold">
            মোট {sortedData.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
          </h2>

          <div className="grid grid-cols-3 gap-4 my-6">
            {sortedData.map((cat, id) => (
              <div key={id} className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <div className="flex gap-2 justify-start">
                    <div className="bg-slate-100 w-6 h-6 rounded">
                      {cat.image}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">{cat.nameBn}</h2>
                      <span>প্রতি {toBnUnit(cat?.unit)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="mt-2 flex flex-col">
                      <span>আজকের দাম</span>
                      <span className="font-bold text-lg">
                        {cat.today.toLocaleString("bn-BD")} টাকা
                      </span>
                    </div>

                    <button
                      className={`bg-slate-100 btn rounded-2xl ${
                        cat.change.dir === "down"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {cat.change.dir === "down" ? "▼" : "▲"}{" "}
                      {cat.change.pct.toLocaleString("bn-BD")}%
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;




// import {toBnUnit} from '@/components/StringBn';
// import { TMark } from '@/types/mark.types';
// import Search from '@/components/Search'

// const CategoryPage = async({params}:{params:{category:string}}) => {
//     const {category} = await params;
//     //  const res = await fetch(
//     // `https://api.api-store.workers.dev/api/bazardor/products?category=${category}`,
//     const res = await fetch(
//     `https://openapi.programming-hero.com/api/bazardor/products?category=${category}`, 
//     { cache: 'no-store' }
//   );
//   const categoryData = await res.json();
//     console.log(categoryData, 'categorydata')
//     return (
//         <div className=' bg-[#F0F5F0]   '>
//             <div className="divider"></div>
//             <div className='container mx-auto '>
//                 <div className=' container border-2 my-10  mx-auto rounded flex gap-2 p-4  shadow bg-white'>
                  
//                     <span> {categoryData[0]?.image} </span> 
//                     <span className=''>
//                        <h1 className='font-bold text-2xl'> {categoryData[0]?.categoryNameBn ?? category} </h1>
//                        <p className='font-bold'> {categoryData.length.toLocaleString('bn-BD')} টি পণ্যের আজকের দাম ও পরিবর্তন</p>
//                     </span>
//                    </div>
//                    {/* sort div */}
//                    <div className='p-3 shadow bg-white mt-4 flex gap-2 justify-end'>
//                     <button>সাজান</button>
//                    <button> <Search categoryData= {categoryData}/>   </button> 
//                    </div>
//                    {/* card div */}
//                    <div className='m-6  pb-20'>
//                     <h2 className='font-bold'>মোট {categoryData.length.toLocaleString('bn-BD')}  টি পণ্য দেখানো হচ্ছে</h2>
//                     <div className='grid grid-cols-3 gap-4 my-6'>
//                         {categoryData.map ((cat:TMark, id: number) => <div key={id}   className="card  bg-base-100 shadow-sm ">
//   <div className="card-body">
   
//     {/* intro */}
//     <div className='flex gap-2 justify-start '>
//     <div className='bg-slate-100 w-6 h-6 rounded '>
//       {cat.image}
//     </div>
//     <div className="">
//       <h2 className=" font-bold text-lg">{cat.nameBn}  </h2>
//       <span className="">প্রতি {toBnUnit(cat?.unit)}</span>
//     </div>
//     </div>
//     {/* intro */}
//     {/* nextdiv */}
//     <div className='flex justify-between'>
//        <div className="mt-2 flex flex-col  ">
      
//          <span>আজকের দাম</span>
     
  
//        <span className='font-bold text-lg'> {(cat.today.toLocaleString('bn-BD'))} টাকা</span>
    
//      </div>
//       {/* <span className="badge badge-xs badge-warning">{products.unit}</span> */}
//        <button className= {`bg-slate-100 btn rounded-2xl ${cat.change.dir === 'down' ? 'text-red-600' : 'text-green-600' }`}>
//               {cat.change.dir === 'down' ? '▼' : '▲'} {(cat.change.pct.toLocaleString('bn-BD'))}%
//              </button>

//     </div>
    
    
//   </div>
// </div>
                        
//                         )}
//                     </div>
//                    </div>

             
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;