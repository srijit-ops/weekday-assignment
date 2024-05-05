import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const FilterSection = ({ setFilters }) => {
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [experience, setExperience] = useState([]);

  // Update filters whenever any filter changes
  useEffect(() => {
    const filtersData = [];
    if (companyName) filtersData.push({ companyName });
    if (location) filtersData.push({ location });
    if (techStack.length > 0) filtersData.push({ techStack });
    if (experience.length > 0) filtersData.push({ experience });

    setFilters(filtersData);
  }, [companyName, location, techStack, experience, setFilters]);

  return (
    <div>
      <h2>Search by Company Name:</h2>
      <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

      <h2>Search by Location:</h2>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

      <h2>Filter by Tech Stack:</h2>
      <Select
        isMulti
        options={[
          { value: 'python', label: 'Python' },
          { value: 'java', label: 'Java' },
          { value: 'javascript', label: 'JavaScript' },
        ]}
        value={techStack}
        onChange={setTechStack}
      />

      <h2>Filter by Experience:</h2>
      <Select
        isMulti
        options={[
          { value: 'fresher', label: 'Fresher' },
          { value: 'junior', label: 'Junior' },
          { value: 'senior', label: 'Senior' },
        ]}
        value={experience}
        onChange={setExperience}
      />
    </div>
  );
};

export default FilterSection;
