import React, { useEffect, useState } from "react";
import "./ResumeUploader.css"; // Import your CSS file
import axios from "axios";
import { toast } from "react-toastify";

const ResumeUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [id, setId] = useState(0);

  const handleFileChange = (e) => {
    // const file = e.target.files[0];
    // console.log("file is set");
    // setSelectedFile(file);
    alert("change is done")
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    let jobseekerId = 1; // tesing only
    if (user != null) {
      jobseekerId = user.jobSeekerId;
      setId(jobseekerId);
    }
  }, []);

  const removeResume = async () => {
    const url = `http://localhost:8080/jobseeker/remove/resume/${id}`;
    axios
      .delete(url)
      .then((response) => {
       // alert(response.data);
        toast.warning(response.data)
      })
      .catch((error) => {
        alert("There was a problem with the GET request:", error);
      });
  };

  // const uploadResume = async () => {
  //   console.log("inside");
  //   if (selectedFile) {
  //     const url =`http://localhost:8080/jobseeker/new/${id}`;
  //     //  `http://localhost:8080/jobseeker/upload/resume/${id}`;
  //     axios
  //       .post(url)
  //       .then((response) => {
  //         alert(response.data);
  //       })
  //       .catch((error) => {
  //         alert("There was a problem with the GET request:", error);
  //       });
  //     setSelectedFile(null);
  //   }else {
  //     console.log("inside else part");
  //   }
  // };

  const uploadResume = async () => {
    if (selectedFile) {
      try {
        const fileArrayBuffer = await selectedFile.arrayBuffer(); // Convert File to ArrayBuffer
        const pdfData = new Uint8Array(fileArrayBuffer); // Convert ArrayBuffer to Uint8Array
  
        const url = `http://localhost:8080/jobseeker/new/${id}`; // Modify the URL accordingly
        
        const response = await axios.post(url, pdfData, {
          headers: {
            'Content-Type': 'application/octet-stream' // Set appropriate content type
          }
        });
  
        //alert("resume updated succefully");
        toast.success("Resume Updated Succefully")
        setSelectedFile(null);
      } catch (error) {
        //alert("There was a problem with the POST request:", error);
        toast.error("Something went wrong!!")
      }
    } else {
     // console.log("No file selected.");
      toast.warning("No file selected!!")
    }

    setSelectedFile(null);
  };


  return (
    <div className="resume-uploader">
      <input type="file" accept=".pdf" onInput={handleFileChange} />
      <div className="buttons">
        <button className="update-button" onClick={uploadResume}>
          Update Resume
        </button>
        <button className="remove-button" onClick={removeResume}>
          Remove Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeUploader;
