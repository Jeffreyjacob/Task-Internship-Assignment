import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteTaskMutation } from '@/redux/features/taskApislice'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface DeleteTaskPopOverProps {
    id: string
}

const DeleteTaskPopOver: React.FC<DeleteTaskPopOverProps> = ({
    id
}) => {
    const [DeleteTask,{isLoading}] = useDeleteTaskMutation()
    const [open,setOpen] = useState(false)
    const handleDeleteTask = async()=>{
        try{
          const response = await DeleteTask({
            id:id
          }).unwrap()
          toast.success("Task Deleted!")
          setOpen(false)
        }catch(error:any){
            const errorMessage = error?.data?.message || "Something went wrong"
            toast.error(errorMessage)
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button className='flex gap-x-1 text-[13px] text-red-600 cursor-pointer'>
                    <Trash2 className='w-5 h-5' />
                    Delete
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this task
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button disabled={isLoading}
                     className='bg-[#14367B] hover:bg-[#14367B]/80' onClick={handleDeleteTask}>
                       {
                        isLoading ? "Deleting...":"Continue"
                       }
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteTaskPopOver