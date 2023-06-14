import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ApiService from '../Service/ApiService';
import '../Styles/EditData.css';
const UpdateData=()=> {

    const Service = useMemo(() => new ApiService(), []);
    const nav = useNavigate();
    const[bookname,setbookname] = useState('');
    const[bookauthor,setbookauthor] = useState('');
    const[category,setcategory] = useState('');
    const[releasedate,setreleasedate] = useState('');
    const[rating,setrating] = useState('');
    const[totalpage,settotalpage] = useState('');
    const[totalchapter,settotalchapter] = useState('');
    const {id} = useParams();

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
    const updateBook=(e) => {
        e.preventDefault()
        if(bookname.length===0||bookauthor.length===0||category.length===0||releasedate.length===0
            ||rating.length===0||totalpage.length===0||totalchapter.length===0)
        {
            alert("Enter All fields are madantory!!")
        }
        else{
          e.preventDefault()
          const Book={bookname,bookauthor,category,releasedate,rating,totalpage,totalchapter};
          console.log(Book);
              Service.updateBook(id,Book).then((response)=>{
                  nav('/get')
              }).catch(error=>{
                  console.log(error)
              })
          }
        } 

        useEffect(() => {
            Service.getBookById(id).then((response) =>{
                window.scrollTo(0, 0); 
                setbookname(response.data.bookname)
                setbookauthor(response.data.bookauthor)
                setcategory(response.data.category)
                setreleasedate(response.data.releasedate)
                setrating(response.data.rating)
                settotalpage(response.data.totalpage)
                settotalchapter(response.data.totalchapter)
            }).catch(error => {
                console.log(error)
            })
        },[id, Service])
  return (
    <div className="edit-page">
      <form className="edit-form" action="" >
        <h2>Update Book Details</h2>
          <div className="form-group">
            <label htmlFor="Bookname"><strong>Book Name:</strong></label>
            <input 
            type="text" placeholder='Enter the BookName' value={bookname} onChange={(e)=>setbookname(e.target.value)} name="bookname"/>
          </div>
          <div className="form-group">
            <label htmlFor="Bookname"><strong>Book Author:</strong></label>
            <input 
            type="text" placeholder='Enter the BookAuthor' value={bookauthor} onChange={(e)=>setbookauthor(e.target.value)} name="Bookauthor"/>
          </div>
          <div className="form-group">
            <label htmlFor="Category"><strong>Book Category:</strong></label>
            <input 
            type="text" placeholder='Enter the BookCategory' value={category} onChange={(e)=>setcategory(e.target.value)} name="Category"/>
          </div>
          <div className="form-group">
            <label htmlFor="Releasedate"><strong>Book ReleaseDate:</strong></label>
            <input 
            type="date" placeholder='Enter the Book ReleaseDate' value={releasedate} onChange={(e)=>setreleasedate(e.target.value)} name="Releasedate"/>
          </div>
          <div className="form-group">
            <label htmlFor="Rating"><strong>Book Rating:</strong></label>
            <input 
            type="number" placeholder='Enter the Book Rating' value={rating} onChange={handleRatingChange} name="Rating"/>
          </div>
          <div className="form-group">
            <label htmlFor="Totalpage"><strong>Total Pages:</strong></label>
            <input 
            type="number" placeholder='Enter the Total pages' value={totalpage} onChange={handleTotalpageChange} name="totalpage"/>
          </div>
          <div className="form-group">
            <label htmlFor="Totalchapter"><strong>Total Chapter:</strong></label>
            <input 
            type="number" placeholder='Enter the Total Chapters' value={totalchapter} onChange={handleTotalchapterChange} name="totalchapter"/>
          </div>
         <Link to="/get"><button id="add-btn" onClick={updateBook} type="submit" value="Submit">Update</button> </Link>
         <Link to="/get"><button id="cancel-btn" >Cancel </button></Link>
        </form>
      </div>
       
  )
}

export default UpdateData