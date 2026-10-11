import React from 'react';
import { notFound } from 'next/navigation';


// ১. বাজারের ডেটার টাইপ
interface MarketType {
  market: string;
  division: string;
  min: number;
  max: number;
}

// ২. প্রোডাক্টের ডেটার টাইপ
interface ProductType {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: 'up' | 'down'; // 'up' অথবা 'down' ছাড়া অন্য কিছু হতে পারবে না
    pct: number;
  };
  markets: MarketType[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SingleProductPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const res = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/products',
    { cache: 'no-store' }
  );

  // 👇 এখানে টাইপ অ্যাসাইন করা হয়েছে
  const products: ProductType[] = await res.json();

  // slug দিয়ে প্রোডাক্ট খুঁজো
  const product: ProductType | undefined = products.find((p) => p.slug === slug);

  if (!product) notFound();

  // ==========================================
  // 👇 দামের হিসাব বের করার লজিক (টাইপসহ)
  // ==========================================
  
  let lowestMarket: MarketType | null = null;
  let highestMarket: MarketType | null = null;
  let totalMin: number = 0;
  let totalMax: number = 0;

  if (product.markets && product.markets.length > 0) {
    for (const m of product.markets) {
      // সর্বনিম্ন দামের বাজার
      if (!lowestMarket || m.min < lowestMarket.min) {
        lowestMarket = m;
      }
      // সর্বোচ্চ দামের বাজার
      if (!highestMarket || m.max > highestMarket.max) {
        highestMarket = m;
      }
      // গড় দামের জন্য যোগফল
      totalMin += m.min;
      totalMax += m.max;
    }
  }

  // গড় দাম বের করা
  const averagePrice: number = product.markets && product.markets.length > 0 
    ? (totalMin + totalMax) / (product.markets.length * 2) 
    : 0;
  // ==========================================

  return (
    <div className="p-6 container mx-auto">
      <div className=' w-full bg-white rounded shadow flex justify-between'>
        {/* 1st div */}
        <div className='flex gap-2 div1 m-4'>
              <div className='bg-slate-100 w-15 h-15 m-4 rounded flex items-center justify-center '>
     <span className='m-0'> {product.categoryIcon}</span>
    </div>
        <div className='div2 p-4 px-4'>
          <h1 className="text-3xl font-bold">{product.nameBn}</h1>
          <p>প্রতি কেজি · {product.categoryNameBn}</p>
          <p>
            গতকালের তুলনায় আজ দাম {product.change?.dir === 'up' ? 'বেড়েছে' : 'কমেছে'} ·{' '}
            {Math.abs(product.today - product.yesterday)} টাকা
          </p>
        </div>
        </div>
     {/* 2nd div */}
     <div className='div2 flex flex-col bg-slate-100 border-0 shadow rounded-lg m-8 p-6'>
      <span>আজকের দাম</span>
      <span className='font-bold text-2xl'> {product.today.toLocaleString('bn-BD')} </span>
      <span>টাকা / কেজি</span>
      {/* <span className=''> {product.change.pct.toLocaleString('bn-BD')}%</span> */}
      <span className= {`bg-slate-100 btn rounded-2xl ${product.change.dir === 'down' ? 'text-red-600' : 'text-green-600' }`}>
              {product.change.dir === 'down' ? '▼' : '▲'} {(product.change.pct.toLocaleString('bn-BD'))}%</span>

     </div>
      </div>

      {/* 2nd div */}
      <div className=' mt-4 p-2 bg-white rounded'>
        <h2 className="text-2xl font-bold my-4">দামের সারসংক্ষেপ</h2>
        
        <div className='grid grid-cols-3 gap-4 rounded p-2'>
          
          {/* 1. সর্বনিম্ন দাম */}
          <div className='flex flex-col gap-2 border-0 shadow p-4 rounded-lg'>
            <span className="text-gray-600 font-medium">সর্বনিম্ন দাম</span>
            {/* lowestMarket null হতে পারে, তাই অপশনাল চেইনিং (?.) ব্যবহার করা হয়েছে */}
            <span className="text-2xl font-bold text-green-600">
              {lowestMarket?.min.toLocaleString('bn-BD')} টাকা
            </span>
            <span className="text-sm text-gray-500">বাজার: {lowestMarket?.market}</span>
          </div>

          {/* 2. সর্বোচ্চ দাম */}
          <div className='flex flex-col gap-2 border-0 shadow p-4 rounded-lg'>
            <span className="text-gray-600 font-medium">সর্বোচ্চ দাম</span>
            <span className="text-2xl font-bold text-red-600">
              {highestMarket?.max.toLocaleString('bn-BD')} টাকা
            </span>
            <span className="text-sm text-gray-500">বাজার: {highestMarket?.market}</span>
          </div>

          {/* 3. গড় দাম */}
          <div className='flex flex-col gap-2 border-0 shadow p-4 rounded-lg'>
            <span className="text-gray-600 font-medium">গড় দাম</span>
            <span className="text-2xl font-bold text-blue-600">
              {/* {averagePrice.toLocaleString('bn-BD')} টাকা */}
             {averagePrice.toLocaleString('bn-BD', { maximumFractionDigits: 0 })}  টাকা
            </span>
            <span className="text-sm text-gray-500">সব বাজারের গড়</span>
          </div>

        </div>
        {/* বাজারভিত্তিক আজকের দাম */}
        <div>
          <h2 className='font-bold text-2xl my-8'>বাজারভিত্তিক আজকের দাম</h2>
         {/* আপনার JSX এর ভেতরে যেখানে টেবিলটি বসাতে চান, সেখানে এটি বসান */}
<div className="overflow-x-auto mt-6 border rounded-lg">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
      
        <th className='font-bold text-xl'>বাজারের নাম</th>
        <th className='font-bold text-xl'>বিভাগ</th>
        <th className='font-bold text-xl' >সর্বনিম্ন দাম</th>
        <th  className='font-bold text-xl'>সর্বোচ্চ দাম</th>
        <th  className='font-bold text-xl'>গড়</th>
      </tr>
    </thead>
    
    {/* tbody এর ভেতরে map চালাতে হবে */}
    <tbody>
      {product.markets?.map((newMarket: MarketType) => (
        <tr key={newMarket.market} className="hover:bg-base-300">
          {/* <th>{index + 1}</th> */}
          <td>{newMarket.market}</td>
          <td>{newMarket.division}</td>
          <td className="text-green-600 font-semibold">{newMarket.min.toLocaleString('bn-BD')} টাকা</td>
          <td className="text-red-600 font-semibold">{newMarket.max.toLocaleString('bn-BD')} টাকা</td>
         <td className="text-blue-600 font-semibold">
            {((newMarket.min + newMarket.max) / 2).toLocaleString('bn-BD')} টাকা
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
      
    
    </div>
    </div>
   
   
  );
};

export default SingleProductPage;





// import React from 'react';
// import { notFound } from 'next/navigation';

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// const SingleProductPage = async ({ params }: PageProps) => {
//   const { slug } = await params;

//   const res = await fetch(
//     'https://openapi.programming-hero.com/api/bazardor/products',
//     { cache: 'no-store' }
//   );

//   // 👇 সরাসরি অ্যারে — allData.data না, allData নিজেই
//   const products = await res.json();

//   // slug দিয়ে প্রোডাক্ট খুঁজো
//   const product = products.find((p: any) => p.slug === slug);

//   if (!product) notFound();

//   // ==========================================
//   // 👇 দামের হিসাব বের করার লজিক (নতুন যোগ করা হয়েছে)
//   // ==========================================
//   let lowestMarket = null;
//   let highestMarket = null;
//   let totalMin = 0;
//   let totalMax = 0;

//   if (product.markets && product.markets.length > 0) {
//     product.markets.forEach((m: any) => {
//       // ১. সর্বনিম্ন দামের বাজার
//       if (!lowestMarket || m.min < lowestMarket.min) {
//         lowestMarket = m;
//       }
//       // ২. সর্বোচ্চ দামের বাজার
//       if (!highestMarket || m.max > highestMarket.max) {
//         highestMarket = m;
//       }
//       // ৩. গড় দামের জন্য যোগফল
//       totalMin += m.min;
//       totalMax += m.max;
//     });
//   }

//   // গড় দাম = (সব min এর যোগফল + সব max এর যোগফল) / (মোট মার্কেট সংখ্যা * ২)
//   const averagePrice = product.markets && product.markets.length > 0 
//     ? (totalMin + totalMax) / (product.markets.length * 2) 
//     : 0;

//   // ==========================================

//   return (
//     <div className="  border-red-600 container mx-auto bg-[#F0F5F0]">
//       <div className='flex gap-2 bg-white w-full border-2'>
//         <div>
//           {product?.image}
//         </div>
//         <div className=' p-4'>
//           <h1 className="text-3xl font-bold">{product.nameBn}</h1>
//           <p>প্রতি কেজি · {product.categoryNameBn}</p>
//           <p>গতকালের তুলনায় আজ দাম {product.change?.dir === 'up' ? 'বেড়েছে' : 'কমেছে'} · {Math.abs(product.today - product.yesterday)} টাকা</p>
//         </div>
//       </div>

//       {/* 2nd div */}
//       <div className='border-2 mt-4 p-2 bg-white'>
//         <h2 className="text-xl font-semibold mb-2">দামের সারসংক্ষেপ</h2>
        
//         {/* main div */}
//         <div className='grid grid-cols-3 gap-4 rounded p-2'>
          
//           {/* 1. সর্বনিম্ন দাম */}
//           <div className='flex flex-col gap-2 border-2 shadow p-4 rounded-lg'>
//             <span className="text-gray-600 font-medium">সর্বনিম্ন দাম</span>
//             <span className="text-2xl font-bold text-green-600">{lowestMarket?.min} টাকা</span>
//             <span className="text-sm text-gray-500">বাজার: {lowestMarket?.market}</span>
//           </div>

//           {/* 2. সর্বোচ্চ দাম */}
//           <div className='flex flex-col gap-2 border-2 shadow p-4 rounded-lg'>
//             <span className="text-gray-600 font-medium">সর্বোচ্চ দাম</span>
//             <span className="text-2xl font-bold text-red-600">{highestMarket?.max} টাকা</span>
//             <span className="text-sm text-gray-500">বাজার: {highestMarket?.market}</span>
//           </div>

//           {/* 3. গড় দাম */}
//           <div className='flex flex-col gap-2 border-2 shadow p-4 rounded-lg'>
//             <span className="text-gray-600 font-medium">গড় দাম</span>
//             <span className="text-2xl font-bold text-blue-600">{averagePrice.toFixed(0)} টাকা</span>
//             <span className="text-sm text-gray-500">সব বাজারের গড়</span>
//           </div>

//         </div>
//       </div>
      
//       {/* অন্যান্য তথ্য */}
//       <div className="mt-4">
//         <p>আজকের দাম: ৳{product.today} / {product.unit}</p>
//         <p>গতকাল: ৳{product.yesterday}</p>
//         <p>গত সপ্তাহ: ৳{product.lastWeek}</p>
//         <p>গত মাস: ৳{product.lastMonth}</p>
//       </div>
//     </div>
//   );
// };

// export default SingleProductPage;








// src/app/products/[slug]/page.tsx
// import React from 'react';
// import { notFound } from 'next/navigation';

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// const SingleProductPage = async ({ params }: PageProps) => {
//   const { slug } = await params;

//   const res = await fetch(
//     'https://openapi.programming-hero.com/api/bazardor/products',
//     { cache: 'no-store' }
//   );

//   // 👇 সরাসরি অ্যারে — allData.data না, allData নিজেই
//   const products = await res.json();

//   console.log('Total:', products.length);
//   console.log('Slugs:', products.map((p: any) => p.slug));

//   // slug দিয়ে প্রোডাক্ট খুঁজো
//   const product = products.find((p: any) => p.slug === slug);

//   if (!product) notFound();

//   return (
//     <div className="p-6">
//         <div className='flex gap-2'>
//           <div>
//             {product?.image}
//           </div>
//           <div className='border-2'>
//               <h1 className="text-3xl font-bold">{product.nameBn}</h1>
//               <p> প্রতি কেজি · চাল</p>
//               <p> গতকালের তুলনায় আজ দাম বেড়েছে · ২ টাকা </p>
//           </div>
             
//              </div>
//              {/* 2nd div */}
//              <div className='border-2'>

//                <h2>দামের সারসংক্ষেপ  </h2>
//                {/* main div */}
//                <div className='grid grid-cols-3 gap-8 rounded p-4'>
//                   {/* 1 */}
//                <div className='flex flex-col gap-2 border-2 shadow'>
//                 <span> সর্বনিম্ন দাম </span>
//                 <span> {product.today}   </span>
//                 <span> সবচেয়ে কম দামের বাজার </span>

//                </div>
//                {/* 2 */}
//                <div className='border-2 '>
//                    <span> সর্বনিম্ন দাম </span>
//                 <span> {product.today}   </span>
//                 <span> সবচেয়ে কম দামের বাজার </span>    
//                </div>
//                {/* 3 */}
//                <div className='border-2'>
//                   <span> সর্বনিম্ন দাম </span>
//                 <span> {product.today}   </span>
//                 <span> সবচেয়ে কম দামের বাজার </span>
//                </div>

//                </div>
               

//              </div>
     
//       <p>আজকের দাম: ৳{product.today} / {product.unit}</p>
//       <p>গতকাল: ৳{product.yesterday}</p>
//       <p>গত সপ্তাহ: ৳{product.lastWeek}</p>
//       <p>গত মাস: ৳{product.lastMonth}</p>
//     </div>
//   );
// };

// export default SingleProductPage;









// import React from 'react';
// import { notFound } from 'next/navigation';

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// interface Product {
//   id: number;
//   slug: string;
//   nameBn: string;
//   category: string;
//   // ... অন্যান্য ফিল্ড
// }

// const ProductDetailsPage = async ({ params }: PageProps) => {
//   const { slug } = await params;
//   console.log('Slug from URL:', slug);

//   try {
//     // 🔹 ধাপ ১: সব প্রোডাক্ট ফেচ করো
//     const allRes = await fetch(
//       'https://openapi.programming-hero.com/api/bazardor/products',
//       { cache: 'no-store' }
//     );

//     if (!allRes.ok) throw new Error('Failed to fetch products');

//     const allData = await allRes.json();

//     // 🔹 আপনার API রেসপন্স স্ট্রাকচার অনুযায়ী প্রোডাক্ট অ্যারে বের করুন
//     // console.log(allData) করে দেখে নিন আসল পাথ কোনটি
//     const products: Product[] =
//       allData?.data?.products ||
//       allData?.products ||
//       allData?.data ||
//       [];

//     // 🔹 ধাপ ২: slug দিয়ে প্রোডাক্ট খুঁজে বের করো
//     const matchedProduct = products.find((p) => p.slug === slug);

//     if (!matchedProduct) {
//       console.log('No product found for slug:', slug);
//       notFound(); // 404 পেজ
//     }

//     console.log('Matched product:', matchedProduct);
//     console.log('Matched ID:', matchedProduct.id);

//     // 🔹 ধাপ ৩ (ঐচ্ছিক): ID দিয়ে নির্দিষ্ট ডেটা ফেচ
//     // যেহেতু list থেকেই সব ডেটা পেয়ে গেছি, এটা দরকার নেই।
//     // কিন্তু আপনি চাইলে করতে পারেন:
//     /*
//     const res = await fetch(
//       `https://openapi.programming-hero.com/api/bazardor/products/${matchedProduct.id}`,
//       { cache: 'no-store' }
//     );
//     const productData = await res.json();
//     */

//     // সরাসরি matchedProduct ব্যবহার করে UI রেন্ডার করুন
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold">
//           {matchedProduct.nameBn} ({matchedProduct.categoryNameBn})
//         </h1>
//         <p>ID: {matchedProduct.id}</p>
//         <p>Slug: {matchedProduct.slug}</p>
//         <p>Today: ৳{matchedProduct.today}/{matchedProduct.unit}</p>
//         <p>Change: {matchedProduct.change.pct}% {matchedProduct.change.dir}</p>
//         {/* বাকি UI এখানে */}
//       </div>
//     );
//   } catch (error) {
//     console.error('Error:', error);
//     return <div>প্রোডাক্ট লোড করতে সমস্যা হয়েছে।</div>;
//   }
// };

// export default ProductDetailsPage;







// import React from 'react';

// const CategoryIdPage = async({params}:{params:{slug:id:number}}) => {
// const { slug:id } = await params;
// //  const res = await fetch( `https://api.api-store.workers.dev/api/bazardor/products/${id}`,
//   const res = await fetch( `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
//     {cache: 'no-store'}
//  )
//     const prorductsCategoryIdData = await res.json();
//     console.log(prorductsCategoryIdData, ' cat id data')
//     return (
//         <div>
//             new product id category
//         </div>
//     );
// };

// export default CategoryIdPage;

