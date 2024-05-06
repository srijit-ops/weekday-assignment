import React, { useState } from "react";
import Styles from "../styles/JobCard.module.css";

function JobCard({
  name,
  jdLink,
  minExp,
  maxJdSalary,
  minJdSalary,
  location,
  role,
  logo,
  jobDetailsFromCompany,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={Styles.cardContainer}>
      <p
        className={Styles.postDate}
        style={{
          padding: "0.3rem 0.4rem",
          borderRadius: "0.6rem",
          border: "1px solid #e6e6e6",
          fontSize: "0.7rem",
          width: "fit-content",
          marginBottom: "0.9rem",
        }}
      >
        ⏳ Posted 10 days ago
      </p>
      <div className={Styles.detailHolder}>
        <div className={Styles.imgHolder}>
          <img
            src={logo}
            alt="logo"
            className={Styles.logo}
            style={{ width: 25, height: 25 }}
          />
        </div>
        <div>
          <p
            style={{
              color: "#8b8b8b",
              fontWeight: 600,
              fontSize: "0.9rem",
              marginBottom: "0.2rem",
            }}
          >
            {name}
          </p>
          <p style={{ fontSize: "0.9rem", marginBottom: "0.2rem" }}>{role}</p>
          <p style={{ fontSize: "0.8rem" }}>{location}</p>
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#4d596a",
            marginBottom: "0.6rem",
            marginTop: "0.6rem",
          }}
        >
          Estimated salary: {minJdSalary ? minJdSalary : 0}LPA-{maxJdSalary}LPA
          <span> ✅</span>
        </p>
      </div>
      <div className={expanded === false ? Styles.mask : Styles.noMask}>
        <p style={{ fontSize: "1rem", fontWeight: 500 }}>About company:</p>
        <p
          style={{
            fontWeight: 700,
            fontSize: "0.9rem",
            marginBottom: "0.4rem",
            marginTop: "0.4rem",
          }}
        >
          About us:
        </p>
        <p style={{ fontWeight: 400, color: "#000000de", fontSize: "0.8rem" }}>
          {jobDetailsFromCompany}
        </p>
      </div>
      <p
        style={{
          color: "#4943da",
          width: "100%",
          textAlign: "center",
          fontSize: "0.9rem",
          marginBottom: "0.7rem",
          marginTop: "0.3rem",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        Show {expanded === false ? "more" : "less"}
      </p>
      <p
        style={{
          color: "#8b8b8b",
          fontSize: "0.8rem",
          fontWeight: 600,
          marginTop: "0.4rem",
          marginBottom: "0.4rem",
        }}
      >
        Minimum experience
      </p>
      <p style={{ fontSize: "0.9rem", color: "000000de" }}>
        {minExp ? minExp : 0} years
      </p>
      <a
        href={jdLink}
        style={{
          borderRadius: "0.5rem",
          background: "#55efc4",
          padding: "0.5rem 1rem",
          color: "black",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          gap: "0.2rem",
          fontWeight: 600,
          fontSize: "0.9rem",
          marginTop: "0.9rem",
          marginBottom: "0.6rem",
        }}
      >
        <p>⚡ Easy Apply</p>
      </a>
      <button
        style={{
          background: "#4943da",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          display: "flex",
          justifyContent: "center",
          gap: "0.2rem",
          fontWeight: 600,
          fontSize: "0.9rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        <p>Unlock referal asks</p>
      </button>
    </div>
  );
}

export default JobCard;
