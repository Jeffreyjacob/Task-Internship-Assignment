import { UserType } from "@/lib/type";
import { apiSlice } from "@/services/apiservice";

interface SignUpInfo{
    email:string,
    full_name:string,
    password:string
}

interface LoginResponse{
    access:string,
    refresh:string,
    email:string,
    full_name:string,
    id:number
}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation<{email:string,full_name:string},SignUpInfo>({
           query:({email,full_name,password})=>({
             url:'/user/register/',
             method:"POST",
             body:{email,full_name,password}
           })
        }),
        login: builder.mutation<LoginResponse,{email:string,password:string}>({
            query:({email,password}) =>({
              url:"/user/login/",
              method:"POST",
              body:{email,password}
            })
        }),
        getUser: builder.query<UserType,void>({
           query:()=>({
             url:"/user",
             method:"GET"
           })
        }),
        logout: builder.mutation<{message:string},{refresh:string}>({
          query:({refresh})=>({
            url:"/user/logout/",
            method:"POST",
            body:{refresh}
          })
        })
    })
})

export const {
   useRegisterMutation,
   useLoginMutation,
   useGetUserQuery,
   useLogoutMutation,
} = authApiSlice