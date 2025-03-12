"use client"
import SelectBox from '@/components/shared/SelectBox'
import Task from '@/components/shared/Task/Task'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetAllTaskQuery } from '@/redux/features/taskApislice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import React, { useState } from 'react'

const home = () => {
  const [status, setStatus] = useState<string>("All")
  const { data, isLoading } = useGetAllTaskQuery({
    status: status == "All" ? "" : status
  })
  const statusData = [
    { name: "pending", value: "Pending" },
    { name: "completed", value: "Completed" },
    { name: "all", value: "All" }
  ]
  const handleStatusChange = (status: string) => {
    setStatus(status)
  }
  return (
    <div className='w-full max-w-6xl mx-auto max-xl:px-7 pb-10'>
      <div className='pt-10 flex justify-between items-center'>
        <h6 className='text-[#14367B] text-[18px] font-semibold'>
          Tasks
        </h6>
        <SelectBox placeHolder='status' data={statusData}
          className='w-[150px]' onChange={handleStatusChange} value={status} />
      </div>
      <div className='pt-8'>
        {
          isLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-7 gap-y-5'>
              { 
                [1, 2, 3, 4, 5, 6].map((skeleton) => (
                  <Skeleton className='w-full h-[200px]' />
                ))
              }
            </div>
          ) : (
            <>
              {
                data && data?.length > 0 ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-7 gap-y-5'>
                    {data?.map((task, index) => (
                      <Task task={task} key={index} />
                    ))}
                  </div>
                ) :
                  (
                    <div className='w-full h-full flex justify-center items-center'>
                      <p className='text-[14px] text-[#5C5C5C]'>
                        No Tasks Found
                      </p>
                    </div>
                  )
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default home