import React, {useState} from "react";
import * as list from "../functions/RelojPro";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import { useSignIn, useIsAuthenticated, useSignOut } from "react-auth-kit";

let day= new Date();
let hourOfDay= day.getHours() ;
let coloring= list.color(hourOfDay);

function Log(props){
  return(
    <div className="log">
      <button onClick={props.back} id="buttonBack">Go Back</button>
      <input className="log-reg-inputs" name="username" onChange={props.onChange} placeholder="Username"/>
      <input type="password" className="log-reg-inputs" name="password" onChange={props.onChange} placeholder="Password"/>
      {props.error}
      <button className= "log-reg-buttons" onClick={props.logData}>Log In</button>
    </div>
  )
}

function Reg(props){
  return(
    <div className="reg">
      <button onClick={props.back} id="buttonBack">Go Back</button>
      <input type="email" className="log-reg-inputs" name="email" onChange={props.onChange} placeholder="Email"/>
      <input className="log-reg-inputs" name="username" onChange={props.onChange} placeholder="Username"/>
      <input type="password" className="log-reg-inputs" name="password" onChange={props.onChange} placeholder="Password"/>
      <input type="password" className="log-reg-inputs" name="confirmPassword" onChange={props.onChange} placeholder="Confirm Password"/>
      <p>{props.error}</p>
      <button className= "log-reg-buttons" onClick={props.registerData}>Register</button>
    </div>
  )
}



function LogReg(props){
  if(props.x==="log"){
   return(
    <Log back={props.back} onChange={props.logChange} error={props.error} logData={props.logData}/>
   )

  }
  else if(props.x==="reg"){
    return(
    <Reg back={props.back} onChange={props.regChange} error={props.error} registerData={props.registerData}/> 
    )
   }
 }


function GokuClock(){

const authenticate= useIsAuthenticated();

const [zoomToInit, setZoomToInit]= useState(!authenticate());
const [zoomLogReg, setZoomLogReg]= useState(false);
const [zoomHome, setZoomHome]= useState(true);
const [zoomLogOut, setZoomLogOut]= useState(authenticate());
const [logReg, setLog_Reg]= useState("");
const [regForm, setRegForm]= useState({
  email: "", username: "", password: "", confirmPassword:""
});
const [logForm, setLogForm]= useState({
username: "", password: ""
});
const [formError, setFormError]= useState("");
const [OutError, setOutError]= useState("");

const signIn= useSignIn();
const signOut= useSignOut();

const logOut= async()=>{
  await axios.get(process.env.REACT_APP_SERVER_URL+"/logout", {withCredentials:true} )
.then(response=>{
  setOutError(response.data);
})
.catch(err => console.log(err))
};

const RegPost= async()=>{
  if(regForm.email.replace(/\s+/g,"")===""|| regForm.username.replace(/\s+/g,"")==="" || regForm.password.replace(/\s+/g,"")==="" || regForm.confirmPassword.replace(/\s+/g,"")===""){
    setFormError("One of the fields is empty");
  }
  else{
    if(regForm.password===regForm.confirmPassword){
      const registerData= regForm;
      const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/register", registerData, {withCredentials:true});
      if(res.data){
      setFormError(res.data);
      }
      }
    else{
      setFormError("The passwords dont match!")
    }
  }
}

const LogPost= async()=>{
      const registerData= logForm;
      setFormError(<p>Login in process, please wait</p>);
       try{
        const res= await axios.post(process.env.REACT_APP_SERVER_URL+"/login", registerData, {withCredentials:true})
        if(res.data.message==="Succesfully Loged!"){
        setZoomToInit(false);
        setZoomLogOut(true);
        setFormError(<p>{res.data.message}</p>);
        clickBack();
          signIn({
            token: res.data.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: {username: registerData.username},
          });
        }
        else if(res.data.message==="Failed"){
            if (((registerData.password).replace(/\s+/g, "")==="") || (registerData.username).replace(/\s+/g, "")===""){
            setFormError(<p>One or all fields are empty</p>);
            }
            else{
            setFormError(<p>The information its not correct!</p>);
            }
        }
      }
      finally{}
    }


let c=`The current time is: ${list.FullTime()}`; 
const [time, setTime]= useState(c);

setInterval(()=> setTime(`The current time is: ${list.FullTime()}`), 1000);

const clickLog= ()=>{
  setLog_Reg("log");
  setZoomLogReg(true);
  setZoomHome(false);
}


const clickReg= ()=>{
  setLog_Reg("reg");
  setZoomLogReg(true);
  setZoomHome(false);
}
const regRchange= (event)=>{
  const {name, value}= event.target;
  setRegForm(function(prev){
   return{...prev, [name]:value}
  })
}

const logRChange= (event)=>{
  const {name, value}= event.target;
  setLogForm(function(prev){
   return{...prev, [name]:value}
  })
}

const clickBack= ()=>{
  setLog_Reg("");
  setZoomLogReg(false);
  setZoomHome(true);
  if(formError!==<p>Login in process, please wait</p>){
  setFormError("");
}
  setOutError("");
}

const SingOut = ()=>{
  logOut()
  signOut()
  setZoomLogOut(false);
  setZoomToInit(true);
}


return(
<div className="wrap1">
<Zoom in={zoomLogReg}>
  <div className="log-reg">
   <LogReg logData={LogPost} back={clickBack} logChange={logRChange} regChange={regRchange} x={logReg} error={formError} registerData={RegPost}/>
  </div>
</Zoom>  
<Zoom in={zoomHome}>
<div className="home">
<div>
 <h1>Take Notes at Anytime</h1>
 <h1>Anywhere</h1>
 </div>
 <Zoom in={zoomToInit}>
 <div className="log-reg-button">
 <button className="log-reg-buttons" onClick={clickLog}>Log In</button>
 <button className="log-reg-buttons" onClick={clickReg}>Register</button>
 </div>
 </Zoom>
</div>
</Zoom>
<div className="wrapper1">
<h1
  className="heading"
  style={{color: coloring}}
>
  {`Good ${list.greeting(hourOfDay)} `}
</h1>
<h1>{time}</h1>
<Zoom in={zoomLogOut}>
<button className="LogOut" onClick={SingOut}>Sing Out</button>
</Zoom>
<p className="logOuted">{OutError}</p>
</div>
</div> 
)
}

export default GokuClock;