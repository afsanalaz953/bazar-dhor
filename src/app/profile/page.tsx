"use client"

import { authClient } from '@/lib/auth-client';
import React from 'react';
import toast from 'react-hot-toast';
import {  useRouter } from 'next/navigation';

import { MdOutlineSubdirectoryArrowLeft } from 'react-icons/md';
import Image from 'next/image';

const ProfilePage = () => {
    // strat
    
  const { data: session, isPending } = authClient.useSession();
  console.log (session, "profilesession")

  const router = useRouter();
  const user = session?.user;
  console.log (user, "profilesession");



  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target)
const newUserData = Object.fromEntries(formData.
    entries()) as {nmae:string, image:string};
console.log(newUserData, ' new user')
    // const name = e.target.name:string.value   
    // const image =e.target.image.value  
  
  await authClient.updateUser({
    ...newUserData   
})

  toast.success('update successful.', {
            duration: 2000,
            position: 'top-center',
        });
        

  };
    // end
    return (
        <div className='flex flex-col gap-4'>
            <div className='  w-200 container mx-auto mt-20'>
             <h1 className='text-2xl font-bold'> আমার প্রোফাইল </h1>
             <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।   </p>
            </div>
    
        <div className='grid grid-cols-2 justify-between gap-40  w-200 container mx-auto bg-white shadow rounded-2xl p-10'>  
          <div className='flex gap-4'>
              <div className="avatar flex gap-3">
                <div className="w-10 rounded-2xl">
               <Image
               alt="Tailwind-CSS-Avatar-component" 
               src= {user?.image as string}
                width={100}
                 height={100} 
               />
             </div>            
             </div>            
           <div className='flex flex-col   '>
           <span> {user?.name}  </span>
           <span>  {user?.email} </span>

           </div>

          </div>
          
         <div>
              <button className='btn rounded btn-outline border-red-500  w-30' 
                     onClick={async () => {await authClient.signOut();
                        router.push("/");
                     }} >
                        <span className='flex gap-2'>
                    <span className='text-red-600'> <MdOutlineSubdirectoryArrowLeft /></span>
                   <span >  সাইন আউট </span>
                        </span>
                        
                    
                    </button> 
         </div>
         
         
        </div>
       
{/* update div */}

        <div className='flex flex-col gap-4'>
        
            {isPending ? (
            <div className='flex gap-2 items-center justify-center p-20'>
                <span className="loading loading-spinner text-success"></span>
                <span>Loading user data...</span>
            </div>
        ) : (

          <div className='bg-white rounded-xl w-200 mx-auto  gap-2 mb-20'>  
             <h2 className='font-bold  text-start mx-4 p-4 text-lg'>তথ্য  </h2>       
    <form onSubmit={onSubmit} className='container mx-auto w-180  '>
       <fieldset className="fiedset  ">
              <legend className="fieldset-legend font-bold mx-2 ">নাম  </legend>
              <input type="text" name="name" className="input w-160 mx-2" placeholder="" defaultValue={user?.name || ''} />
            </fieldset>
            
            {/* <fieldset className="fieldset ">
              <legend className="fieldset-legend font-black"> Image Url </legend>
              <input type= "url" name="image" className="input" placeholder="Photo Url" defaultValue={user?.image || ''}  />
            </fieldset> */}
            
             
            <br />
            <button type="submit"   className='btn bg-[#05893E] mx-2 w-160 font-bold'> আপডেট</button>
            <br />
            <br />

            {/* <button className='btn btn-default bg-green-300'> <Link href= "/profile">Profile</Link></button> */}
           
 </form>
            
        </div>

  )}      
 </div>





        </div>
    );
};

export default ProfilePage;
