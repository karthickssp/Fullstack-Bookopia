import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/AddData.css';

function AddData() {
    const nav = useNavigate();
    const[bookname,setbookname] = useState('');
    const[bookauthor,setbookauthor] = useState('');
    const[category,setcategory] = useState('');
    const[releasedate,setreleasedate] = useState('');
    const[rating,setrating] = useState('');
    const[totalpage,settotalpage] = useState('');
    const[totalchapter,settotalchapter] = useState('');

    const handleRatingChange = (e) => {
      let inputValue = e.target.value;
      inputValue = inputValue.replace(/[^\d.]/g, '');
      inputValue = inputValue.match(/^\d{0,1}\.?\d{0,1}/)[0];
      if(inputValue<10)
        setrating(inputValue);
      else
        alert("Enter the valid Rating which is less than 10...");
    }
    const handleTotalpageChange = (e) => {
      let inputValue = e.target.value; 
      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.slice(0, 4);
      settotalpage(inputValue);
    }
    const handleTotalchapterChange = (e) => {
      let inputValue = e.target.value; 
      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.slice(0, 3);
      settotalchapter(inputValue);
    }
    const senddb=(e)=>{
        e.preventDefault()
        if(bookname.length===0||bookauthor.length===0||category.length===0||releasedate.length===0
            ||rating.length===0||totalpage.length===0||totalchapter.length===0)
        {
          alert("Enter All fields are madantory!!")
        }
        else{
          e.preventDefault()
          const BookList={bookname,bookauthor,category,releasedate,rating,totalpage,totalchapter};
          fetch("http://localhost:8080/library",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(BookList) 
          }
          ).then(()=>{
              console.log("New Book is Added sucessfully")
              nav("/get")
          })
      }
    }
    return (
      <div className="add-page">
      <form className="add-form" action="" >
        <h2>Book Details</h2>
          <div className="form-group">
            <label htmlFor="bookname"><strong>Book Name:</strong></label>
            <input 
            type="text" placeholder='Enter the BookName' value={bookname} onChange={(e)=>setbookname(e.target.value)} name="bookname"/>
          </div>
          <div className="form-group">
            <label htmlFor="bookauthor"><strong>Book Author:</strong></label>
            <input 
            type="text" placeholder='Enter the BookAuthor' value={bookauthor} onChange={(e)=>setbookauthor(e.target.value)} name="bookauthor"/>
          </div>
          <div className="form-group">
            <label htmlFor="category"><strong>Book Category:</strong></label>
            <input 
            type="text" placeholder='Enter the BookCategory' value={category} onChange={(e)=>setcategory(e.target.value)} name="category"/>
          </div>
          <div className="form-group">
            <label htmlFor="releasedate"><strong>Book ReleaseDate:</strong></label>
            <input 
            type="date" placeholder='Enter the Book ReleaseDate' value={releasedate} onChange={(e)=>setreleasedate(e.target.value)} name="releasedate"/>
          </div>
          <div className="form-group">
            <label htmlFor="rating"><strong>Book Rating:</strong></label>
            <input 
            type="number" placeholder='Enter the Book Rating' value={rating} onChange={handleRatingChange} name="rating"/>
          </div>
          <div className="form-group">
            <label htmlFor="totalpage"><strong>Total Pages:</strong></label>
            <input maxLength="4"
            type="number" placeholder='Enter the Total pages' value={totalpage} onChange={handleTotalpageChange} name="totalpage"/>
          </div>
          <div className="form-group">
            <label htmlFor="totalchapter"><strong>Total Chapter:</strong></label>
            <input maxLength="4"
            type="number" placeholder='Enter the Total Chapters' value={totalchapter} onChange={handleTotalchapterChange} name="totalchapter"/>
          </div>
         <Link to="/get"><button id="add-btn" onClick={senddb} type="submit" value="SAVE">Save</button> </Link>
         <Link to="/get"><button id="cancel-btn" >Cancel </button></Link>
        </form>
      </div>
  )
}

export default AddData;