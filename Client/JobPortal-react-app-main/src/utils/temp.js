const jobSeekerId = 123; // Replace with the actual job seeker ID
const fileInput = document.getElementById('file-input'); // Your file input element

const reader = new FileReader();
reader.onload = function(event) {
  const pdfData = new Uint8Array(event.target.result);

  axios.post(`/upload/resume/${jobSeekerId}`, pdfData, {
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  })
  .then(response => {
    console.log('Upload successful:', response.data);
  })
  .catch(error => {
    console.error('Upload failed:', error);
  });
};

reader.readAsArrayBuffer(fileInput.files[0]);
