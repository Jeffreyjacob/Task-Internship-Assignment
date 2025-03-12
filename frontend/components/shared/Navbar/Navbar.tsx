"use client"
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { LogOut,Loader2} from "lucide-react"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLogoutMutation } from '@/redux/features/userApislice'
import { toast } from 'sonner'
import { logout } from '@/redux/features/userSlice'
import CreateTaskDialog from '../Task/CreateTaskDialog'

const Navbar = () => {
    const router = useRouter()
    const { isAuthenticated,userinfo,refreshToken} = useAppSelector((state) => state.user)
    const [Logout,{isLoading}] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const handleLogout = async()=>{
        try{
           const response = await Logout({
             refresh:refreshToken as string
           }).unwrap()
           toast.success(response.message)
           dispatch(logout())
        }catch(error:any){
            const errorMessage = error?.data?.bad_token || "Something went wrong"
            toast.error(errorMessage)
        }
    }
    return (
        <div className='w-full sticky top-0 z-50 bg-[#CAD9F6] py-5'>
            <div className='w-full max-w-6xl mx-auto max-xl:px-7 flex justify-between items-center'>
                <h6 className='text-[#14367B] text-[17px] font-semibold'>
                    Task Manager
                </h6>
                <div>
                    {
                        isAuthenticated ? (
                            <div className='flex gap-x-3 items-center'>
                                <CreateTaskDialog/>
                                <Avatar>
                                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                    <AvatarFallback className=' capitalize font-semibold text-[#14367B]'>
                                        {userinfo?.full_name[0][0]}
                                    </AvatarFallback>
                                </Avatar>
                               {
                                isLoading ? (
                                    <Loader2 className=' animate-spin w-5 h-5'/> 
                                ):(
                                    <LogOut className='w-5 h-5 text-red-500 cursor-pointer' onClick={handleLogout} />
                                )
                               }
                            </div>
                        ) : (
                            <div className='flex gap-x-4'>
                                <Button className='bg-[#14367B] text-white hover:bg-[#14367B]/80 transition-all duration-300' onClick={() => router.push("/login")}>
                                    Login
                                </Button>
                                <Button className='bg-[#14367B] text-white hover:bg-[#14367B]/80 transition-all duration-300' onClick={() => router.push("/signup")}>
                                    Signup
                                </Button>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar