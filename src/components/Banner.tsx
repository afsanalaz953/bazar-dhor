import Image from 'next/image';


const Banner = () => {
    return (
        <div className='my-10 flex gap-15 bg-white rounded mx-auto container justify-between'>
            <div className='space-y-8 m-4'>
                <button className=' btn rounded-2xl bg-[#05893E] w-60'>   </button>
               <h1 className='text-3xl font-bold'>আজকের বাজারের দাম এক নজরে</h1>
            <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, 
                <br />সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <button className='btn p-3 bg-[#05893E]'>সব পণ্য দেখুন</button>
            </div>
            <div>
                   <Image
      src="/assets/bazar-hero.png"
      alt="Profile picture"
      width={400}
      height={400}
      priority
    />
            </div>
           
        </div>
    );
};

export default Banner;