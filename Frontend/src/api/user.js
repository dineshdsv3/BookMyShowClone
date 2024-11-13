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



export const GetCurrentUser = async (values) => {
    try {
        const response = await axiosInstance.get("/users/getUserDetails");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const ForgetPassword = async (values) => {
    try {
        const response = await axiosInstance.post("/users/forgetPassword", values);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ResetPassword = async (values) => {
    try {
        const response = await axiosInstance.post("/users/resetPassword", values);
        return response.data;
    } catch (error) {
        return error;
    }
};