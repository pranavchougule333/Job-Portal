import React, { useState, useEffect } from 'react';
import "./EducationDetailsUpdate.css";

const EducationDetailsUpdate = ({ jobseekerEducation, educationalDetails, setEducationalDetails, initialDetail, updateEducationDetails }) => {

  
  useEffect(() => {
    if (jobseekerEducation && jobseekerEducation.length > 0) {
      setEducationalDetails(jobseekerEducation);
    } else {
      setEducationalDetails([initialDetail]);
    }
  }, [jobseekerEducation]);

  const handleAddDetail = () => {
    if (!educationalDetails.some(detail => areInputsEmpty(detail))) {
      setEducationalDetails([...educationalDetails, initialDetail]);
    }
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = educationalDetails.filter((detail, i) => i !== index);
    setEducationalDetails(updatedDetails);
  };

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...educationalDetails];
  if (field === 'admissionDate' || field === 'completionDate') {
    updatedDetails[index][field] = value; // Convert date format for backend
  } else {
    updatedDetails[index][field] = value;
  }
  setEducationalDetails(updatedDetails);
  };

  const isPercentageValid = (percentage) => {
    const numericPercentage = parseFloat(percentage);
    return !isNaN(numericPercentage) && numericPercentage >= 0 && numericPercentage <= 100;
  };

  const areInputsEmpty = (detail) => {
    return Object.values(detail).every(value => value === '');
  };

  const canUpdate = () => {
    return educationalDetails.every(detail =>
      !areInputsEmpty(detail) && isPercentageValid(detail.percentage)
    );
  };

  return (
    <>
    {educationalDetails.length === 0 && <h1>At least add one educational detail</h1> }
    <div className="educationDetailsUpdate-educational-details">
      {educationalDetails.map((detail, index) => (
        <div key={index} className="detail">
          <input
            type="text"
            placeholder="Qualification"
            value={detail?.qualification}
            onChange={(e) => handleInputChange(index, 'qualification', e.target.value)}
            // required
          />
          <input
            type="text"
            placeholder="Institute"
            value={detail?.institute}
            onChange={(e) => handleInputChange(index, 'institute', e.target.value)}
            // required
          />
          <input
      type="date"
      placeholder="Admission Date"
      value={detail?.admissionDate} 
      onChange={(e) => handleInputChange(index, 'admissionDate', e.target.value)}
      required
      style={{ appearance: 'textfield' }}
    />
          <input
      type="date"
      placeholder="Admission Date"
      value={detail?.completionDate} 
      onChange={(e) => handleInputChange(index, 'completionDate', e.target.value)}
      required
    />
          <input
            type="number"
            placeholder="Percentage"
            value={detail?.percentage}
            onChange={(e) => handleInputChange(index, 'percentage', e.target.value)}
            required
          />
          <button onClick={() => handleRemoveDetail(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddDetail} disabled={educationalDetails.some(detail => areInputsEmpty(detail))}>Add</button>
      <button className='educationDetailsUpdate-update-btn' onClick={updateEducationDetails} disabled={!canUpdate()}>Update Education details</button>
    </div>

    </>
  );
};

export default EducationDetailsUpdate;
