import React from 'react'
import '../App.css'

export default function Header() {
    return (
        <div className="Header" style={{ backgroundImage: "url(https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)" }}>
            <div>
                <div className="Title">Siya Foods</div>
                <div className="SubTitle">By Siya Developers</div>
            </div>
        </div>
    )
}
