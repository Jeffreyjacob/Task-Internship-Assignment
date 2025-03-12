


export type UserType = {
  id:number,
  email:string,
  full_name:string
}

export type TaskType = {
    id:string,
    title:string,
    description:string
    user:UserType
    status:string,
    created_at:string
}