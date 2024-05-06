import React, { useState, useEffect } from "react";
import Select from "react-select";

const FilterSection = ({ setFilters }) => {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [roles, setRoles] = useState("");
  const [minBasePay, setMinBasePay] = useState(null);
  const [locationType, setLocationType] = useState("");
  const [minExperience, setMinExperience] = useState(null);

  // Update filters whenever any filter changes
  useEffect(() => {
    const filtersData = [];
    if (companyName) filtersData.push({ companyName });
    if (location) filtersData.push({ location });
    if (roles) filtersData.push({ jobRole: roles.value });
    if (minBasePay)
      filtersData.push({ minJdSalary: parseInt(minBasePay.value) });
    if (locationType) filtersData.push({ locationType: locationType.value });
    if (minExperience)
      filtersData.push({ minExp: parseInt(minExperience.value) });
    setFilters(filtersData);
  }, [
    companyName,
    location,
    roles,
    minBasePay,
    locationType,
    minExperience,
    setFilters,
  ]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.1rem",
      }}
    >
      <Select
        placeholder={"Remote/ onsite"}
        options={[
          { value: "remote", label: "Remote" },
          { value: "onsite", label: "Onsite" },
        ]}
        value={locationType}
        onChange={setLocationType}
        styles={{ marginBottom: "0.4rem", marginTop: "0.5rem" }}
      />

      <Select
        placeholder={"Select min experience"}
        options={[
          { value: 1, label: "1" },
          { value: 2, label: "2" },
          { value: 3, label: "3" },
          { value: 4, label: "4" },
          { value: 5, label: "5" },
          { value: 6, label: "6" },
          { value: 7, label: "7" },
          { value: 8, label: "8" },
          { value: 9, label: "9" },
        ]}
        value={minExperience}
        onChange={setMinExperience}
        styles={{ marginBottom: "0.4rem", marginTop: "0.5rem" }}
      />
      <Select
        // isMulti
        placeholder={"Select role"}
        options={[
          { value: "backend", label: "Backend" },
          { value: "frontend", label: "Frontend" },
          { value: "tech lead", label: "Tech lead" },
          { value: "ios", label: "IOS" },
          { value: "android", label: "Android" },
        ]}
        value={roles}
        onChange={setRoles}
        styles={{ marginBottom: "0.4rem", marginTop: "0.5rem" }}
      />
      <Select
        placeholder={"Select Min base pay"}
        options={[
          { value: "10", label: "10L" },
          { value: "20", label: "20L" },
          { value: "30", label: "30L" },
          { value: "40", label: "40L" },
          { value: "50", label: "50L" },
          { value: "60", label: "60L" },
          { value: "70", label: "70L" },
        ]}
        value={minBasePay}
        onChange={setMinBasePay}
        styles={{ marginBottom: "0.4rem", marginTop: "0.5rem" }}
      />

      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Search company"
        style={{
          padding: "0.4rem",
          marginBottom: "0.4rem",
          marginTop: "0.5rem",
        }}
      />

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Search loaction"
        style={{
          padding: "0.4rem",
          marginBottom: "0.4rem",
          marginTop: "0.5rem",
        }}
      />
    </div>
  );
};

export default FilterSection;
