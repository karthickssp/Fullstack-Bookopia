import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
    <div className="group-page">
        <h2>WELCOME TO OPEN LIBRARY</h2>
        <div className="maintain-page">
        <br/>
        <p className='text'>This section offers a user-friendly interface for maintain a curated and 
        personalized collection of book details.Users can add, edit, and also remove books 
        to create a collection that helps other user to gain the knowledge.</p>
        <Link to ="/get"><button className="maintain">Maintain Books</button></Link>
        </div>
        <br/>
        <div className="explore-page">
        <br/>
        <p className='text'>This section offers a user-friendly interface for accessing book details, 
        searching for books and authors, and sorting books based on various criteria. 
        It aims to enhance the user's book browsing and exploration experience 
        </p> 
        <Link to="/sort"><button className="explore">Explore Books</button></Link>
        </div>
    </div>
    </div>
  )
}

export default Home
