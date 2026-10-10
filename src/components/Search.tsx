"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SortDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sort") ?? "default";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={sortBy}
      onChange={(e) => handleChange(e.target.value)}
      className="select select-bordered "
    >
      <option value="default">ডিফল্ট</option>
      <option value="asc">দাম: কম থেকে বেশি</option>
      <option value="desc">দাম: বেশি থেকে কম</option>
    </select>
  );
};

export default SortDropdown;





// "use client";

// import React, { useState } from "react";
// import { toBnUnit } from "@/components/StringBn";
// import { TMark } from "@/types/mark.types";

// type SortCategoryProps = {
//  categoryData: TMark[];
// };

// const SortCategory = ({ categoryData }: SortCategoryProps) => {
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

// //   if (!allSortCategory) {
// //     return <div className="text-center py-10">Loading...</div>;
// //   }

//   const displayedCategory = sortOrder
//     ? [...categoryData].sort((a, b) => {
//         return sortOrder === "asc"
//           ? Number(a.today) - Number(b.today)
//           : Number(b.today) - Number(a.today);
//       })
//     // : ;

//   return (
//     <>
//       {/* sort div */}
//       <div className="p-3 shadow bg-white mt-4 flex gap-2 justify-end items-center">
//         <p>সাজান:</p>
//         <div className="dropdown dropdown-end">
//           <div
//             tabIndex={0}
//             role="button"
//             className="btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
//           >
//             {sortOrder === "asc"
//               ? "দাম: কম থেকে বেশি ⬆️"
//               : sortOrder === "desc"
//               ? "দাম: বেশি থেকে কম ⬇️"
//               : "ডিফল্ট ⬇️"}
//           </div>
//           <ul
//             tabIndex={-1}
//             className="dropdown-content menu bg-white rounded-lg shadow-lg z-10 w-52 p-2"
//           >
//             <li
//               onClick={() => setSortOrder(null)}
//               className="cursor-pointer hover:bg-gray-100 p-2 rounded"
//             >
//               <a>ডিফল্ট</a>
//             </li>
//             <li
//               onClick={() => setSortOrder("asc")}
//               className="cursor-pointer hover:bg-gray-100 p-2 rounded"
//             >
//               <a>দাম: কম থেকে বেশি</a>
//             </li>
//             <li
//               onClick={() => setSortOrder("desc")}
//               className="cursor-pointer hover:bg-gray-100 p-2 rounded"
//             >
//               <a>দাম: বেশি থেকে কম</a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* card div */}
//        {/* <div className="m-6 pb-20">
//         <h2 className="font-bold">
//           মোট {displayedCategory.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
//         </h2>

//         <div className="grid grid-cols-3 gap-4 my-6">
//           {displayedCategory.map((cat, id) => (
//             <div key={id} className="card bg-base-100 shadow-sm">
//               <div className="card-body"> */}
//                 {/* intro */}
//                 {/* <div className="flex gap-2 justify-start">
//                   <div className="bg-slate-100 w-6 h-6 rounded">
//                     {cat.image}
//                   </div>
//                   <div>
//                     <h2 className="font-bold text-lg">{cat.nameBn}</h2>
//                     <span>প্রতি {toBnUnit(cat?.unit)}</span>
//                   </div>
//                 </div>

//                 {/* price */}
//                 {/* <div className="flex justify-between">
//                   <div className="mt-2 flex flex-col">
//                     <span>আজকের দাম</span>
//                     <span className="font-bold text-lg">
//                       {cat.today.toLocaleString("bn-BD")} টাকা
//                     </span>
//                   </div>

//                   <button
//                     className={`bg-slate-100 btn rounded-2xl ${
//                       cat.change.dir === "down"
//                         ? "text-red-600"
//                         : "text-green-600"
//                     }`}
//                   >
//                     {cat.change.dir === "down" ? "▼" : "▲"}{" "}
//                     {cat.change.pct.toLocaleString("bn-BD")}%
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))} 
//         </div>
//       </div>  */}
//     </>
//   );
// };

// export default SortCategory;






// "use client"


// import React from 'react';
// import {useState} from 'react'

// const Search = () => {
//     const {sortBy, setSortBy} = useState<"pct">("pct")
//     console.log(sortBy, 'sortBy')


// // sorted price

//     return (
//         <div>
//             <select 
//             value={sortBy}
//            onChange={(e) => setSortBy(e.target.value as 'pct')}
//             defaultValue="ডিফল্ট" className="select select-success">
//   <option disabled={true}>ডিফল্ট</option>
//   <option>দাম: কম থেকে বেশি</option>
//   <option> দাম: বেশি থেকে কম </option>
  
// </select>
//             {/* <div className="dropdown dropdown-start">
//   <div tabIndex={0} role="button" className="btn  m-1">ডিফল্ট ⬇️</div>
//   <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
//     <li><a>দাম: কম থেকে বেশি</a></li>
//     <li><a>দাম: বেশি থেকে কম</a></li>
//   </ul>
// </div> */}
//         </div>
//     );
// };

// export default Search;