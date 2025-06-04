
import axiosInstance from "../helper/axiosInterceptor";

import API_PATHS from "./apiPath";

//For login
const LoginUser = async (body) => {
  try {
    const response = await axiosInstance.post(`${API_PATHS.LOGIN}`, body);
    console.log(response);
  
    if (response.data.message !== "success") {
      throw new Error(response.data.message || "Login failed");
    }

    return response.data;
  } catch (error) { 
    throw error.response.data || { message: "Login failed" };
  }
};

// for forget password
const forget = async (rawData)=>{
  try {
    const response =  await axiosInstance.post(`${API_PATHS.FORGOT_PASSWORD}`, rawData);
    return response.data;
  } catch (error) {
     console.log(error);
     throw error.response.data || { message: "send verification link failed" };
  }
    
}

// for register
const register = async (body)=>{
  try {
     const response = await axiosInstance.post(API_PATHS.REGISTER, body);
     return response.data;
  } catch (error) {
    throw error.response.data || { message: "registration failed" };
  
  }
}

// for email verification
const verifyEmail = async(token,id)=>{
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.VERIFY_EMAIL}?token=${token}&userId=${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data || { message: "email verification failed" };
    }
}

// for resetPassword

const resetPassword = async(rawBody)=>{
  try {
     const response = await axiosInstance.post(API_PATHS.RESET_PASSWORD, rawBody);
     return response.data;
  } catch (error) {
    throw error.response.data || { message: "reset password failed" };
  }
}


// dynamic export
export const authServices = {
   
   LoginUser:LoginUser,
   forget:forget,
   register:register,
   verifyEmail:verifyEmail,
   resetPassword:resetPassword

} 
