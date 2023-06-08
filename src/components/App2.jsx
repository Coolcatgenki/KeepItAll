import React, {useState, useEffect} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mui/material/Icon';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from "axios";
import {useAuthHeader} from 'react-auth-kit'



function InsertNotes(){
  const x= useAuthHeader();
  console.log(x())

  const[note, setNote]=useState({title:"", content:"", date:"2023-01-01"});
  const[displayedNotes, setDisplayedNotes]= useState([]);
  const[zoom, setZoom]= useState(false);
  const[error, setError]=useState("");

  const Posted= async(processing)=>{
    await axios.get(process.env.REACT_APP_SERVER_URL+"/events", {headers: {"Authorization": `${x()}`}}, {withCredentials:true})
  .then(res=>{
    if(processing){
      setDisplayedNotes([...res.data]);
    }
  })
  .catch(err => console.log(err))
  };
  
  
  useEffect( () => {
    let processing = true
    Posted(processing)
    return () => {
        processing = false
    }
  },[])

  const PostData= async()=>{
    if(((note.content).replace(/\s+/g, "")!=="")&& (note.title).replace(/\s+/g, "")!==""){
      const postingData={
        content: note.content,
        title: note.title,
        date: note.date,
      };
      await axios.post(process.env.REACT_APP_SERVER_URL+"/toPostEvent", postingData, {headers: {"Authorization": `${x()}`}}, {withCredentials:true})
       .then(res =>setError(<p>{res.data}</p>))
      }
      else {
        setError(<p>There is no content on the textfield</p>)
       }
        let processing = true
        Posted(processing)
        return () => {
            processing = false
        }
      }
  
  function handleChange(event){
    event.preventDefault()
    const {name, value}=event.target;
    setNote((prev)=>{
           return {...prev, [name]:value}
      })      
    }

  function display(){
    if(((note.content).replace(/\s+/g, "")!=="")&& (note.title).replace(/\s+/g, "")!==""){
      setNote({title:"", content:"", date:"2023-01-01"}); 
      PostData();
    } 
  }

  function Note(props){
    return(<div className="noteD">
        <div className="INTI">
        <h1>{props.title}</h1>
        </div>
         <p className="INCI">{props.content}</p>
         <p>{props.date}</p>
         <button className="buti" onClick={()=>{props.Onclick(props.id)}}><DeleteIcon /></button>
    </div>)
  }
  
  async function DeleteNote(id){
    const reported={
      id:id,
    }
    await axios.post(process.env.REACT_APP_SERVER_URL+"/deleteEvent", reported, {headers: {"Authorization": `${x()}`}}, {withCredentials:true})
        .then(res =>setError(<p>{res.data}</p>))
        let processing = true
        Posted(processing)
        return () => {
            processing = false
        }
  }
  function startAp(){
    setZoom(true);
  }
return(
   <div>
      <form  className="TheForm">
      {zoom?null:<input placeholder="Take note" onClick={startAp}></input>}
      <Zoom in={zoom}>
      <div className="note">
        <input type="text" id="ee" name="title" className="INT" onChange={handleChange} value={note.title} placeholder="Event Name"/>
        <textarea cols="40" id="aa" rows="5" type="text" name="content" className="INC" onChange={handleChange} value={note.content} placeholder="Info"></textarea>
        <input type="date" name="date" value={note.date} onChange={handleChange}/>
        <Fab onClick={display} id="butt"><Icon baseClassName="fas" className="fa-plus-circle">+</Icon></Fab>
      </div>
      </Zoom>
      {error}
      </form>
      <div className="noteWrapper">
        {displayedNotes.map((note,id)=>{
            return( 
            <Note title={note.title} content={note.content} key={id} id={id} date={note.date} Onclick={DeleteNote}/>
        )})}
      </div>

  </div>
  )
}

export default InsertNotes;