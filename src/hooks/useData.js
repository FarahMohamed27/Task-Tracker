import useSWR from "swr";
import axios from "axios";

const fetchData = (url) => axios.get(url).then(res => res.data);


function useData(){
    const { data, error } = useSWR('http://localhost:3001/tasks', fetchData);
    return {
        tasks: data || [],
        isLoading: !error && !data,
        isError: error
        
      };
      
}

export default useData;