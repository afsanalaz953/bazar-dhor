import React from 'react';

const CategoryIdPage = async({params}:{params:{id:number}}) => {
const { id } = await params;
 const res = await fetch( `https://api.api-store.workers.dev/api/bazardor/products/${id}`,
    {cache: 'no-store'}
 )
    const prorductsCategoryIdData = await res.json();
    console.log(prorductsCategoryIdData, ' cat id data')
    return (
        <div>
            new product id category
        </div>
    );
};

export default CategoryIdPage;