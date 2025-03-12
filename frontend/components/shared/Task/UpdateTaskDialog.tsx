import { useGetTaskByIdQuery } from '@/redux/features/taskApislice'
import React, { useState } from 'react'
import TaskForm from './TaskForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { SquarePen } from 'lucide-react'

interface UpdateTaskDialogProps {
    id: string
}

const UpdateTaskDialog: React.FC<UpdateTaskDialogProps> = ({
    id
}) => {
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useGetTaskByIdQuery({
        id: id
    })
    const handleOnClose = (open: boolean) => {
        setOpen(open)
    }
    const defaultValues = {
        title: data?.title || "",
        description: data?.description || "",
        status: data?.status
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className='flex gap-x-1 text-[13px] text-[#14367B] cursor-pointer'>
                    <SquarePen className='w-5 h-5' />
                    Edit
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-[#14367B] font-semibold'>Update Task</DialogTitle>
                </DialogHeader>
                <TaskForm data={defaultValues} onClose={handleOnClose}
                    type='Update' id={id} />
            </DialogContent>
        </Dialog>
    )
}

export default UpdateTaskDialog