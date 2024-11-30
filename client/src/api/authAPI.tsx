import { UserLogin } from "../interfaces/UserLogin";
import request from "../requests";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  
  const { data } = await request.post("/auth/login", userInfo)
  return data;
  
}



export { login };
