import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { backendUrl } from '../App';
import NavBar from './NavBar';
import SingleEvent from './SingleEvent';

const MyEvents = () => {
  const navigate = useNavigate();
  const token = useSelector(state => state.token);
  const [myEvents,setMyEvents] = useState([]);
  const fetchMyEvents = async ()=> {
    if(!token) {return navigate('/login')}
    const res = await fetch(`${backendUrl}/event/myevents`,{
        method:'get',
        headers:{
            token:token
        },
    })
    const data = await res.json();
    console.log(data);
    
    if(data && data[0] &&data[0]['_id']) setMyEvents(data);
  }

  useEffect(()=>{
    fetchMyEvents();
  },[])
  console.log(myEvents);
  return (
    <>
    <NavBar />
    <div className="container mt-3">
        <h2>My Events</h2>
        <div className="row d-flex justify-content-between">
        {myEvents.map(event=> {
            return <SingleEvent key={event._id} event={event}/>
        })}
        </div>
    </div>
    </>
  )
}

export default MyEvents