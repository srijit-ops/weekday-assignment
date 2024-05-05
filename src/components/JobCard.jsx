import React from 'react'
import Styles from "../styles/JobCard.module.css"

function JobCard({name, jdLink, minExp, about, maxJdSalary, minJdSalary, location, role, logo, jobDetailsFromCompany}) {
  return (
    <div className={Styles.cardContainer}>
      <p className={Styles.postDate}>Posted 10 days ago</p>
      <div className={Styles.detailHolder}>
        <div className={Styles.imgHolder}>
        <img src={logo} alt='logo' className={Styles.logo} style={{width:25, height:25}}/>
        </div>
        <div>
          <p>{name}</p>
          <p>{role}</p>
          <p>{location}</p>
        </div>
      </div>
      <div>
        <p>Estimated salary: {minJdSalary?minJdSalary:0}LPA-{maxJdSalary}LPA</p>
      </div>
      <p>About company:</p>
      <p>About us:</p>
      <p>{jobDetailsFromCompany}</p>
      <p>Minimum experience</p>
      <p>{minExp}</p>
      <a href={jdLink} style={{borderRadius:"0.5rem", background:"#55efc4", padding:"0.5rem 1rem", color:"black", textDecoration:"none", display:"flex", justifyContent:"center", gap:"0.2rem", fontWeight:600}}>
        <p>Easy apply</p>
      </a>
      <button>
        <p>Unlock referal asks</p>
      </button>
    </div>
  )
}

export default JobCard