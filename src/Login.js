import { useState} from "react"
import { Route,Routes,NavLink, useNavigate } from "react-router-dom"
import "./Login.css"
import Home from "./home"
export function LoginForm(){
    const navigate= useNavigate() 
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");

    async function LoginCheker(e){
      e.preventDefault();
      const userLogin={
        userName:name,
        password:password
      }
      try{
        const res=await fetch(`http://localhost:8080/login`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userLogin)
        })
        const body=await res.text();
       if(res.status==200){
        localStorage.setItem("id",body);
        console.log(body);
       alert("Login Successfull");
        navigate("/home")  
       }
       else{
        alert(body)
       }
    }
      catch(err){
        console.log(err)
        alert("Server error");
      }
      
    }
    return(
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <input type="text" placeholder="Username" 
                value={name}
                onChange={(e)=>{
                    setName(e.target.value)
                }}
                />
                <input type="password" placeholder="Password" 
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                />
                <NavLink to="/forgetPassword">ForgetPassword</NavLink>
                <button  onClick={LoginCheker}>Login</button>
            </div>
        </div>
    )
}
export function RegisterForm(){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");  
    async function registerHandler(e){
        e.preventDefault();
        const user={
            userName:name,
            email:email,
            password:password
        }
   try{
    const res=await fetch(`http://localhost:8080/Register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    const val=await res.text();
    console.log(val)
     if(val==="true")
      alert("Registration Successfull Please Use Login Button TO Login")
     else
        alert("UserName Already Exists")
    }
    catch(err){
        console.log(err)
        alert("Error Tyr Again After Some Time")
    }

      }
    return(
        <div className="login-container">
            <div className="login-box">
                <h2>Register</h2>
                <form className="register-form" onSubmit={registerHandler}>
                    <input type="text" placeholder="Username" 
                     value={name}
                     onChange={(e)=>{
                        setName(e.target.value)
                     }}
                    />
                    <input type="email" placeholder="Email" 
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    />
                    <input type="password" placeholder="Password" 
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    />
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
    )
}
function LoginRegistration(){
    return(
        <div className="login">
           <ul className="Logins"> 
               <li className="linker"><NavLink to="/login">Login</NavLink></li>
               <li className="linker"><NavLink to="/register">Register</NavLink></li>
            </ul>
        </div>
    )
} export default LoginRegistration;