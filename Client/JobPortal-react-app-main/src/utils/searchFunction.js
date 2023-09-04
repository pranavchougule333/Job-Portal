import axios from "axios";

const searchFunction = async (type, value) => {
    // type => title, status, type
    const searchType = type.trim();
    if(searchType === "type") {
        return serachByTypeOfJob(value);
    }else if (searchType === "status") {
        return searchByStatus(value);
    }else if( searchType !== "" || !isNaN(searchType || searchType === "title")  ){
        return searchByText(value);
    }else {
        alert("put valid text");
    }

  }
 

  const serachByTypeOfJob = async(value) => {
    try {
        const response = await axios.get(`http://localhost:8080/jobseeker/get/jobtype/${value}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching by type:", error);
        return null;
      }
  }

  const searchByStatus = async(value) => {
    try {
        const jobSeekerId = getId;
        const response = await axios.get(`http://localhost:8080/jobseeker/get/${value}/${jobSeekerId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching by status:", error);
        return null;
      }
  }

  const searchByText = async(value) => {
    try {
      const response = await axios.get(`http://localhost:8080/jobseeker/get/title/${value}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching by status:", error);
      return null;
    }
  }

  const getId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
            let jobseekerId = 1;  // tesing only
            if(user != null ) {
               jobseekerId = user.jobSeekerId;
            }
    return  jobseekerId;      
  }
export default searchFunction;
