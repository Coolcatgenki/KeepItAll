import React, { useState, useEffect }from "react";
import axios from "axios";

export default function App(){
let [item, setItem]= useState({content:"", clicked:false});
const [realItem, setRealItem]= useState([]);
let [error, setError]= useState("");
const Posted= async(processing)=>{
  await axios.get(process.env.REACT_APP_SERVER_URL+"/items", {withCredentials:true}, {Authorization: `{_auth}`})
.then(res=>{
  if(processing){
    setRealItem(()=>[...res.data]);
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

const Clean= async() =>{
  await axios.get(process.env.REACT_APP_SERVER_URL+"/delete", {withCredentials:true}, {Authorization: `{_auth}`})
.then(res=>{
    setError("");
    setRealItem(()=>[...res.data]);
    let processing = true
    Posted(processing)
    return () => {
    processing = false
    }
  })
.catch(err => console.log(err))
}

const PostData= async()=>{
  if(item.content.replace(/\s+/g, "")!==""){
    const postingData={
      content: item.content,
      clicked: item.clicked
    };
    await axios.post(process.env.REACT_APP_SERVER_URL+"/toPost", postingData, {withCredentials:true}, {Authorization: `{_auth}`} )
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
       function handleEvent(event){       
         const {value}= event.target;
          const newV= value;
           setItem(prevValue=>{ return{...prevValue, content: newV}});
       }
       
       
       function Click(event){
        event.preventDefault();
        setItem((prev)=>{return {...prev, content:""}});
        PostData();
       }


       function CreateLi(props){

        return(
        <div onClick={()=> props.onClick(props.id)}>
        <li style={props.style?{textDecoration:"line-through"}:null}> {`${props.content}`} </li>
       </div>
        );
        }

        
       async function lineThrough(id){
        const reported={
          id:id,
        }
        await axios.post(process.env.REACT_APP_SERVER_URL+"/toMark", reported, {withCredentials:true}, {Authorization: `{_auth}`})
        .then(res =>setError(<p>{res.data}</p>))
        let processing = true
        Posted(processing)
        return () => {
            processing = false
        }
        }

return(
     <>
    <form onSubmit={Click}>
      <h1>The Notes</h1>
      <input type="text" onChange={handleEvent} value={item.content}/>
      <ul>
         {realItem.map((item,index)=>{
             return(<CreateLi onClick={lineThrough} style={item.clicked} id={index} key={index} content={item.content}/>)
         })}
      </ul>
      <p className="list-info">{error}</p>
    <button className="button-list-add" >Add note</button>
    <a className="button-list-clean" onClick={Clean}>Clean All</a>
    </form>
    </>
)
}