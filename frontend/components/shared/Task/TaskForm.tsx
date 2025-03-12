import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateTaskMutation, useUpdateTaskMutation } from '@/redux/features/taskApislice'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import SelectBox from '../SelectBox'

interface TaskFormProps {
    data: {
        title: string,
        description: string,
        status: string | undefined
    }
    onClose: (open: boolean) => void
    type: "Create" | "Update",
    id?:string
}

const formSchema = z.object({
    title: z.string().min(2, { "message": "Please enter a title" }),
    description: z.string().min(2, { "message": "please enter a description" }),
    status: z.string().optional()
})

const TaskForm: React.FC<TaskFormProps> = ({
    data,
    onClose,
    type,
    id
}) => {
    const [CreateTask,{isLoading:creating}] = useCreateTaskMutation()
    const [UpdateTask,{isLoading:updating}] = useUpdateTaskMutation()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data
    })
    
    const statusData = [
        {name:"pending",value:"Pending"},
        {name:"completed",value:"Completed"},
    ]

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        if (type == "Create") {
            try{
              const response = await CreateTask({
                 title:values.title,
                 description:values.description
              }).unwrap()
              toast.success("Task Created!")
            }catch(error:any){
                const errorMessage = error?.data?.message || "Something went wrong"
                toast.error(errorMessage)
            }finally{
                onClose(false)
            }
        } else if (type == "Update") {
            try{
              const response = await UpdateTask({
                title:values.title,
                description:values.description,
                status:values.status as string,
                id:id as string
              }).unwrap()
              toast.success("Task Updated!")
            }catch(error:any){
                const errorMessage = error?.data?.message || "Something went wrong"
                toast.error(errorMessage)
            }finally{
                onClose(false)
            }
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-[#14367B]'>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter title" {...field} 
                                className='w-full bg-[#EEF2FC] text-[13px]'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-[#14367B]'>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter description"
                                  className='w-full bg-[#EEF2FC] text-[13px]'
                                  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {
                    type == "Update" && <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-[#14367B]'>Status</FormLabel>
                            <FormControl>
                                <SelectBox data={statusData} onChange={field.onChange}
                                value={field.value || ""} placeHolder='status' className='w-full text-[13px]'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                }

                <Button type="submit"
                 className='bg-[#14367B] text-white hover:bg-[#14367B]/80 transition-all duration-300 w-full' disabled={creating || updating}>
                    {
                        type == "Create" ? (
                          <>
                           {creating ? "Creating...":"Create"}
                          </>
                        ):(
                          <>
                          {updating ? "Updating...":"Update"}
                          </>
                        )
                    }
                </Button>
            </form>
        </Form>
    )
}

export default TaskForm