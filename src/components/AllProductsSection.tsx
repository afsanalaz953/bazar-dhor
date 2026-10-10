import React from 'react';
import ProductsCard from '@/components/ProductsCard'
import { TMark } from '@/types/mark.types';

const AllProductsSection= async() => {
const res = await fetch( "https://api.abcz.workers.dev/api/bazardor/products")
    const allProductsData = await res.json();
    console.log(allProductsData, 'AllProductsdata')


    return (
        <div className='container mx-auto'>
            <h2 className='text-3xl font-bold'> সব পণ্য </h2>
            <p className='font-bold'> মোট  {allProductsData.length.toLocaleString('bn-BD')} টি পণ্য দেখানো হচ্ছে </p>
            <div className='grid grid-cols-3 gap-4 my-6'>
              {allProductsData.map((products: TMark) => 
            <div key= {products.id} >  <ProductsCard products={products} /> </div>)}
            {/*    <PlanCard plansdata={plansdata} /> */}

            </div>
            
        </div>
    );
};

export default AllProductsSection;