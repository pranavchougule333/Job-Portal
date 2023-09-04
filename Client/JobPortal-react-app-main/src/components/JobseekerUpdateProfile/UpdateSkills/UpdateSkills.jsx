import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./UpdateSkills.css";

const UpdateSkills = ({ jobseekerSkills, selectedSkills, setSelectedSkills, selectedSkill, setSelectedSkill, updateSkills }) => {

  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    setSelectedSkills(jobseekerSkills);
  }, [jobseekerSkills]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSelect = (value) => {
    if (value) {
      const isSkillSelected = selectedSkills.some(item => item.name === value);
      if (!isSkillSelected) {
        allSkills.forEach(skill => {
          if(skill.name === value) {
            setSelectedSkills([...selectedSkills, skill]);
          }
        })
        
      }
    }

    setSelectedSkill({});
  };

  const handleRemove = (value) => {
    const updatedItems = selectedSkills.filter(item => item.name !== value);
     setSelectedSkills(updatedItems);
  };

  const fetchSkills = async () => {
    const allSkillsEndpoint = 'http://localhost:8080/skill/get/all/skills';
    try {
      const response = await axios.get(allSkillsEndpoint);
      setAllSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
    setSelectedSkills(jobseekerSkills);
  };

  return (
    <div className="updateSkills-dropdown-wrapper hello">
      <ul className='updateSkills-selected-items'>
        {selectedSkills?.map((item,index) => (
            <li key={index} className="selected-item" >
              {item.name}
              <span
                onClick={() => handleRemove(item.name)}
                className="updateSkills-remove-symbol"
              >
                &#10060; {/* Cross symbol */}
              </span>
            </li>
        ))}
        </ul>
      <div className="updateSkills-dropdown">
        <select
          value={selectedSkill.name || ''}
          onChange={(e) => setSelectedSkill({ name: e.target.value })}
        >
          <option value="" disabled>Select a skill</option>
          {allSkills?.map(option => (
            <option key={option.skillId} value={option.name}>{option.name}</option>
          ))}
        </select>
        <button onClick={() => handleSelect(selectedSkill.name)}>Add</button>
      </div>
      <button onClick={updateSkills}>Update Skills </button>
    </div>
  );
};

export default UpdateSkills;
