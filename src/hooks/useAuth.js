import useSWR from "swr";
import axios from "axios";

// const fetchData = (url) => axios.get(url).then(res => res.data);
async function getUser(url){
    const response = await axios.get(url).then(res => res.data)
    // const userData = response.data[0];
    // console.log("entered");
    // console.log(userData); 
    // return userData;
}

function useAuth(email){
    const { data, error } = useSWR(`http://localhost:3001/userData?email=${email}`, getUser);
    return {
        userData: data || {},
        isLoading: !error && !data,
        isError: error
        
      };
      
}

export default useAuth;