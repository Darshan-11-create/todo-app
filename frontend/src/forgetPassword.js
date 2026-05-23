import React, { useState } from 'react'
import './ChangePassword.css';
export default function PasswordChanger(){
    const [userName,setUserName]=useState("");
    const[newPassword,setNewPassword]=useState("");
    async function changer(e){
        e.preventDefault();
        if(userName==="" || newPassword==="")
        {
            alert("UserName or Password Must Not Be Empty")
            return;
        }
        const res=await fetch(`https://todo-backend-l770.onrender.com/forgetPassword?username=${userName}&password=${newPassword}`,{
            method:"PUT",
            headers:{
                'Content-type':'application/json'
            }
        })
        if(res.ok){
            window.location.href='/login'
        }
        else{
            const response="UserName DoesNot Exist"
            alert(response)
        }
    }
    return(
       <div className="cp-wrapper">
      <div className="cp-card">
        <div className="cp-header">
          <div className="cp-icon">🔐</div>
          <h2 className="cp-title">Change Password</h2>
          <p className="cp-subtitle">Secure your account</p>
        </div>
 
        <form className="cp-form" onSubmit={changer}>
          <div className="cp-field">
            <label className="cp-label">Username</label>
            <div className="cp-input-wrap">
              <span className="cp-input-icon">👤</span>
              <input
                className="cp-input"
                type="text"
                placeholder="Enter your username"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
 
          <div className="cp-field">
            <label className="cp-label">New Password</label>
            <div className="cp-input-wrap">
              <span className="cp-input-icon">🔑</span>
              <input
                className="cp-input"
                type="password"
                placeholder="Enter new password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
 
          <button className="cp-btn" type="submit">
            <span className="cp-btn-text">Change Password</span>
            <span className="cp-btn-arrow">→</span>
          </button>
        </form>
      </div>
    </div>
    )
}