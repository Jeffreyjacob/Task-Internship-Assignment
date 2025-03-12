"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/redux/features/userApislice'
import { finishInitialLoad, setAuth } from '@/redux/features/userSlice'
import { useAppDispatch } from '@/redux/store'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email({ "message": "enter a valid email" }).min(2, { "message": "An email is required" }),
    password: z.string().min(7, { "message": "your password must be at least 7 characters" })
})

const page = () => {
    const [Login,{isLoading}] = useLoginMutation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            const response = await Login({
                email:values.email,
                password: values.password
            }).unwrap()
            console.log(response)
            dispatch(setAuth({
                accessToken:response.access,
                refreshToken:response.refresh,
                userinfo:{
                    email:response.email,
                    full_name:response.full_name,
                    id:response.id
                }
            }))
            form.reset()
            dispatch(finishInitialLoad())
            router.push("/")
        }catch(error:any){
            const errorMessage = error?.data?.message || "Something went wrong"
            toast.error(errorMessage)
        }
    }
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-full sm:w-[40%] max-sm:px-7 flex flex-col gap-y-4 pt-16'>
                <h3 className='text-[25px] font-semibold text-[#14367B]'>
                    Login
                </h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[#14367B]'>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter email" {...field}
                                            className='w-full bg-[#EEF2FC]' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[#14367B]'>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="enter password" {...field}
                                            className='w-full bg-[#EEF2FC]' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit"
                            className='bg-[#14367B] hover:bg-[#14367B]/80 w-full mt-5' disabled={isLoading}>
                             {
                                isLoading ? "Loading...":"Login"
                             }
                        </Button>
                    </form>
                </Form>

                <div className='pt-3 flex text-[14px] font-light gap-x-1'>
                    <span>
                        Don't have an account?
                    </span>
                    <Link className='text-[#14367B] font-semibold'
                        href={"/signup"}>
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page