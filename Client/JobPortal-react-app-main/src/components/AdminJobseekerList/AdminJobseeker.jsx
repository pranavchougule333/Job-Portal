import React from 'react'
import { toast } from 'react-toastify';

function AdminJobseeker({handleDeleteJobSeeker, JobSeekers}) {

  const handleDelete = (id) => {
    
    handleDeleteJobSeeker(id);
  }
  return (
    <div>
      <table className='tableAdmin'>
        <thead>
          <tr>
            <th>JobSeekerId</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {JobSeekers.map(jobSeeker => (
            <tr key={jobSeeker.jobSeekerId}>
              <td>{jobSeeker.jobSeekerId}</td>
              <td>{jobSeeker.firstName}</td>
              <td>{jobSeeker.lastName}</td>
              <td>{jobSeeker.email}</td>
              <td>
                <button
                  className="delete-buttonAdmin"
                  onClick={() =>  {
                  console.log(jobSeeker.jobSeekerId)
                    handleDelete(jobSeeker.jobSeekerId) }
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminJobseeker