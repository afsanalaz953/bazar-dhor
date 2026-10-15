"use client"
import React from 'react';
import Link from "next/link";
// import { useForm } from "react-hook-form";
import {authClient} from "@/lib/auth-client";
// import { FaArrowLeft, FaGithub, FaRegEyeSlash } from "react-icons/fa";

import { FcGoogle } from 'react-icons/fc';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';


const SignupPage = () => {
const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
e.preventDefault();

const formData = new FormData(e.target)
const user = Object.fromEntries(formData.entries()) as {name:string, email:string, password: string, 
  confirmPassword: string,};
console.log(user)

  // পাসওয়ার্ড মিলছে কিনা চেক
    if (user.password !== user.confirmPassword) {
      alert("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }
const {data, error} = await authClient.signUp.email({
   ...user,
 callbackURL: "/login",
});

console.log(data, "data");


console.log (error, 'error');

if (error) {
 toast.error(error?.message as string)
}
 if (data) {
  toast.success("Signup Successful")
   
    redirect("/login")
 } 


} 
 const handleGoogleSignin = async () => {
 const data = await authClient.signIn.social({
     provider: "google",
   });
 console.log(data, "GOOGLEdata");
 }
 
 const handleGithubSignin = async () => {
 const data = await authClient.signIn.social({
     provider: "github",
   });
 console.log(data, "Githubdata");
 }


    return (
<div className=' container mx-auto '>
            
 {/* <div className=' rounded-2xl w-120 container mx-auto p-20  flex gap-4 flex-col justify-center items-center'> */}
       <div className='container w-full flex flex-col justify-center items-center my-6'>
         <h1 className='font-bold text-3xl text-center'> অ্যাকাউন্ট তৈরি করুন </h1>
        <h2 className=' mx-0  text-lg whitespace-nowrap '> বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন। </h2>
       </div>
  <div className='formplus bg-white rounded-2xl w-120 container mx-auto  flex gap-4 flex-col justify-center items-center   '>
    <form onSubmit={onSubmit}  className='bg-white space-y-8 rounded-3xl my-4 '>

<fieldset className="fieldset  bg-white border-base-300 rounded-box w-xs border p-8 ">
  {/* <legend className="fieldset-legend mt-4">ইমেইল  </legend> */}

   <label className="label font-bold">নাম </label>
  <input type="text"  name='name' className="input w-full" placeholder="যেমন: রহিম উদ্দিন" />

  <label className="label font-bold">ইমেইল </label>
  <input type="email" name='email' className="input w-full" placeholder="you@example.com" />

  <label className="label font-bold">  পাসওয়ার্ড </label>
  <input type="password" name='password' className="input w-full" placeholder="কমপক্ষে ৮ অক্ষর  " />

  <label className="label font-bold">  পাসওয়ার্ড নিশ্চিত করুন </label>
  <input type="password" name='confirmPassword' className="input w-full" placeholder="আবার লিখুন  " />

  <button className="btn font-bold mt-4 bg-green-500"> অ্যাকাউন্ট তৈরি করুন </button>
</fieldset>
 </form> 

<div className="divider text-sm text-gray-400"> অথবা  </div>
{/* outside the form */}
<div className='social flex gap-3'>
<button
    type="button"
    onClick={handleGoogleSignin}

    className="flex border-0 shadow-lg items-center justify-center p-2 gap-2 w-50 text-sm cursor-pointer"
  >
    <FcGoogle size={22} />
    Google দিয়ে চালিয়ে যান
  </button>
  
 <button
    type="button"
    onClick={handleGithubSignin}
    className="flex border-0 shadow-lg items-center justify-center gap-2 w-50 p-2  text-sm cursor-pointer"
  >
    <FaGithub size={22}/>

    GitHub দিয়ে চালিয়ে যান
  </button>
</div>

<div className='flex gap-1 my-3 justify-center items-center'>
<span className='text-lg '>  অ্যাকাউন্ট আছে? </span>
<button className='text-sm text-green-600 font-bold'><Link href= "/signin"> সাইন ইন করুন</Link></button>

</div>


    
    </div>      
                
<div className='flex justify-center items-center mb-10 mt-4'>
  <Link href= "/">   ← হোম পেজে ফিরে যান </Link> 
</div>
        </div>  
    );
};

export default SignupPage;