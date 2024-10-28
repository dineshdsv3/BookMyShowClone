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


export const LoginUser = async (values) => {
    try {
        const response = await axiosInstance.post("/users/login", values);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}