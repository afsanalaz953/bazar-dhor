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
      <div className=' w-full bg-white rounded shadow lg:flex justify-between '>
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
     <div className='div2 flex flex-col sm:w-40 bg-slate-100 border-0 shadow rounded-lg m-8 p-6'>
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
        
        <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-4 rounded p-2'>
          
          {/* 1. সর্বনিম্ন দাম */}
          <div className='flex flex-col gap-2 border-0 shadow p-4 rounded-lg sm:text-center'>
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
<div className="overflow-x-auto mt-6 border shadow rounded-lg m-6">
  <table className="table w-full ">
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






