import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ResolveComplaints = ({user}) => {
    const [complaints, setComplaints] = useState([]);

    const getComplaints = async() => {
        const res = await axios.get('https://nitc-mess-manager.herokuapp.com/resolveComplaints/add',{params:{
            mess: user.mess
        }});
        if (res.data.length !== 0){
            setComplaints(res.data);
        }else{
            setComplaints([])
        }
        
    }

    const resolve = (id) => {
        axios.post("https://nitc-mess-manager.herokuapp.com/resolveComplaints/update", {id})
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        // getComplaints()
                        alert("Resolved Successfully");
                        break;
                    default:
                        alert("Something went wrong");
                        break;
                }
            })
            .catch((e) =>{ 
                console.log("error catch ->" + e)
            })
    }

    useEffect(() => {
        getComplaints()
    })

    return (
        <div>
            <a style={{color:"white", fontSize:30}}><b>Complaints</b></a><br/>
            {complaints.length === 0 ? <a style={{color:"white"}}>No Complaints</a> : <div></div>}
            <ul style={{color:"white"}}>
                {complaints.map((complaint) => {
                    return(
                        <li key={complaint._id}>
                        Roll No: {complaint.roll} <br/>
                        type: {complaint.type} <br/>
                        detail: {complaint.detail}<br/>
                        <button  onClick={() => {resolve(complaint._id)}} className="btn btn-primary btn-block submit-btn">Resolved</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ResolveComplaints
