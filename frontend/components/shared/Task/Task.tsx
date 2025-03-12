import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { TaskType } from '@/lib/type'
import { cn } from '@/lib/utils'
import { useAppSelector } from '@/redux/store'
import { SquarePen, Trash2 } from 'lucide-react'
import React from 'react'
import UpdateTaskDialog from './UpdateTaskDialog'
import DeleteTaskPopOver from './DeleteTaskPopOver'

interface TaskProps {
    task: TaskType
}

const Task: React.FC<TaskProps> = ({
    task
}) => {
    const { isAuthenticated } = useAppSelector((state) => state.user)
    return (
        <Card className='w-full p-4 flex flex-col gap-y-3 transition-all duration-300'>
            <div className='flex flex-col gap-y-1'>
                <Label className='text-[#14367B] font-semibold text-[15px]'>
                    Title
                </Label>
                <p className='text-[#5C5C5C] text-[12px]'>
                    {task.title}
                </p>
            </div>
            <div className='flex flex-col gap-y-1'>
                <Label className='text-[#14367B] font-semibold text-[15px]'>
                    Description
                </Label>
                <p className='text-[#5C5C5C] text-[12px]'>
                    {task.description}
                </p>
            </div>
            <div className='flex flex-col gap-y-1'>
                <Label className='text-[#14367B] font-semibold text-[15px]'>
                    Status
                </Label>
                <p className={cn('bg-[#FFE4C2] text-[#8F4F00] w-fit px-2 py-1 rounded-xl text-[12px]', {
                    "bg-[#CAD9F6] text-[#14367B]": task.status == "Completed"
                })}>
                    {task.status}
                </p>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-x-2'>
                    {
                        isAuthenticated && (
                            <>
                               <UpdateTaskDialog id={task.id}/>
                               <DeleteTaskPopOver id={task.id}/>
                            </>
                        )
                    }
                </div>
                <Avatar className='bg-[#14367B] w-[30px] h-[30px]'>
                    <AvatarFallback className='text-white bg-[#14367B]'>
                        {task.user.full_name[0][0]}
                    </AvatarFallback>
                </Avatar>
            </div>
        </Card>
    )
}

export default Task