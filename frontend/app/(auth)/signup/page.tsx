"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRegisterMutation } from '@/redux/features/userApislice'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'


const formSchema = z.object({
    full_name: z.string().min(2, { "message": "A name is required" }),
    email: z.string().email({ "message": "enter a valid email" }).min(2, { "message": "An email is required" }),
    password: z.string().min(7, { "message": "your password must be at least 7 characters" })
})


const page = () => {
    const [Register,{isLoading}] = useRegisterMutation()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
           const response = await Register({
            email:values.email,
            full_name:values.full_name,
            password:values.password
           }).unwrap()
           form.reset()
           toast.success("Registeration Successful!")
        }catch(error:any){
           const errorMessage = error?.data?.message || "Something went wrong"
           toast.error(errorMessage)
        }
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-full sm:w-[40%] max-sm:px-7 flex flex-col gap-y-4 pt-16'>
                <h3 className='text-[25px] font-semibold text-[#14367B]'>
                    Sign Up
                </h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-[#14367B]'>Full name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter full name" {...field}
                                            className='w-full bg-[#EEF2FC]' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                isLoading ? "Signing up...":"Sign up"
                            }
                        </Button>
                    </form>
                </Form>
                 
                 <div className='pt-3 flex text-[14px] font-light gap-x-1'>
                  <span>
                     Already have an account? 
                  </span>
                  <Link className='text-[#14367B] font-semibold'
                   href={"/login"}>
                    Login
                  </Link>
                 </div>
            </div>
        </div>
    )
}

export default page