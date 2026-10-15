"use client"

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
// import Image from "next/image";
import DropDownHover from "./DropDownHover";

const UserInfo = () => {
const { data: session,  } = authClient.useSession();
console.log (session, "session")

const user = session?.user;
console.log (user, "session");



    return (
        <div>
            {user? ( <div className='flex gap-2 items-center'>
           
 {/* <div className="avatar flex gap-3">
    
     <div className="w-10 rounded-full">
    <Image
    alt="Tailwind-CSS-Avatar-component" 
    src= {user?.image as string}
     width={10}
      height={10} 
    />
  
  </div>   
           
  </div> */}
          
         < DropDownHover />     
          
 
  
      <h2>{user?.name}</h2> 
                  </div>)
                 
        
                    
//    </div>)
   
                  :( <div className='flex gap-3'>
                  
                        <Link className='btn rounded p-4 bg-[#05893E]'  href = {"/signin"}>সাইন ইন </Link>
         

                    
                        <Link  className='btn rounded p-4 bg-[#05893E]'   href ={"/signup"}>সাইন আপ</Link>
                      
                    
                    </div>)}

            
             {/* <div className='flex gap-3'>
                <button className='btn rounded p-4 bg-[#05893E]'>সাইন ইন </button>
                <button className='btn rounded p-4 bg-[#05893E]'>সাইন আপ</button>
            </div> */}
        </div>
    );
};

export default UserInfo;