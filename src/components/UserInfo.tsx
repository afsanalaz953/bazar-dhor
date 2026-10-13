"use client"

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";

const UserInfo = () => {
const { data: session,  } = authClient.useSession();
console.log (session, "session")

const user = session?.user;
console.log (user, "session");



    return (
        <div>
            {user? ( <div className='flex gap-2 items-center'>
           
    <div className=' avatar rounded-full flex gap-2'> 
        <Image src={user?.image as string  }
        // referrerPolicy='no-referrer'
      alt=" author"
      width={50}
      height={50} 
      />  
      <h2>Hi,{user?.name}</h2> 
                  </div>
                  <div></div>
        
                    <button className='btn rounded p-4 bg-[#05893E]' 
                    onClick={async () => await authClient.signOut()} >
                       সাইন আউট</button>
   </div>)
   
                  :( <div className='flex gap-3'>
                    <button className='btn rounded p-4 bg-[#05893E]'>
                        <Link href = {"/signin"}>সাইন ইন </Link></button>
         

                    <button className='btn rounded p-4 bg-[#05893E]'>
                        <Link href ={"/signup"}>সাইন আপ</Link>
                        </button>
                    
                    </div>)}

            
             {/* <div className='flex gap-3'>
                <button className='btn rounded p-4 bg-[#05893E]'>সাইন ইন </button>
                <button className='btn rounded p-4 bg-[#05893E]'>সাইন আপ</button>
            </div> */}
        </div>
    );
};

export default UserInfo;