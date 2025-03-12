import { TaskType } from "@/lib/type";
import { apiSlice } from "@/services/apiservice";


interface CreateTaskInput {
    title: string,
    description: string
}

interface UpdateTaskInput {
    title: string,
    description: string,
    status: string,
    id: string
}


export const TaskSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllTask: builder.query<TaskType[], { status: string }>({
            query: ({ status }) => ({
                url: "/task",
                method: "GET",
                params: { status }
            }),
            providesTags: (result: any, error: any) => [
                { type: "getAllTask" }
            ],
            keepUnusedDataFor:0
        }),
        getTaskById: builder.query<TaskType, { id: string }>({
            query: ({ id }) => ({
                url: `/task/${id}`,
                method: "GET",
            }),
            providesTags: (result: any, error: any) => [
                { type: "getTaskById" }
            ]
        }),
        createTask: builder.mutation<void, CreateTaskInput>({
            query: ({ title, description }) => ({
                url: "/task/create/",
                method: "POST",
                body: { title, description }
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(TaskSlice.endpoints.getAllTask.initiate({ status: "" }, { forceRefetch: true }));
                    dispatch(TaskSlice.endpoints.getAllTask.initiate({ status: "Pending" }, { forceRefetch: true }));
                    dispatch(TaskSlice.endpoints.getAllTask.initiate({ status: "Completed" }, { forceRefetch: true }));
                } catch (error) {
                    console.error("Error during deleting task")
                }
            }
        }),
        updateTask: builder.mutation<void, UpdateTaskInput>({
            query: ({ title, description, status, id }) => ({
                url: `/task/update/${id}/`,
                method: "PUT",
                body: { title, description, status }
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(TaskSlice.endpoints.getAllTask.initiate({ status: "" }, { forceRefetch: true }));
                    dispatch(TaskSlice.endpoints.getAllTask.initiate({ status: "Pending" }, { forceRefetch: true }));
                    dispatch(TaskSlice.endpoints.getAllTask.initiate({ status: "Completed" }, { forceRefetch: true }));
                    if (args.id) {
                        dispatch(TaskSlice.endpoints.getTaskById.initiate({ id: args.id }, { forceRefetch: true }));
                    }
                } catch (error) {
                    console.error("Error during deleting task")
                }
            }
        }),
        deleteTask: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/task/delete/${id}/`,
                method: "DELETE"
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled
                    dispatch(TaskSlice.endpoints.getAllTask.initiate({ status: "" }, { forceRefetch: true }));
                    dispatch(TaskSlice.endpoints.getAllTask.initiate({ status: "Pending" }, { forceRefetch: true }));
                    dispatch(TaskSlice.endpoints.getAllTask.initiate({ status: "Completed" }, { forceRefetch: true }));
                } catch (error) {
                    console.error("Error during deleting task")
                }
            }
        })
    })
})


export const {
    useGetAllTaskQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = TaskSlice