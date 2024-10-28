import { axiosInstance } from ".";


export const RegisterUser = async (values) => {
    try {
        const response = await axiosInstance.post("/users/register", values);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}