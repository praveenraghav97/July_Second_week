import axios from "axios";
const USER_API_BASE_URL = "http://localhost:8081/api/v1/users";
class UserService{
    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }
    createUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }
    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }
    updateUser(user, userId){
        return axios.post(USER_API_BASE_URL+ '/'+ userId, user);
    }
}

export default new UserService()