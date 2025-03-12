"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import TaskForm from './TaskForm'

const CreateTaskDialog = () => {
    const [open,setOpen] = useState(false)
    const handleOnClose = (open:boolean)=>{
        setOpen(open)
    }
    const defaultValues = {
        title:"",
        description:"",
        status:""
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='bg-[#14367B] hover:bg-[#14367B]/80 text-[13px]'>
                    Create Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-[#14367B] font-semibold'>Create Task</DialogTitle>
                </DialogHeader>
                 <TaskForm data={defaultValues} onClose={handleOnClose}
                  type='Create'/>
            </DialogContent>
        </Dialog>

    )
}

export default CreateTaskDialog