import React, { useEffect, useMemo, useState } from 'react';
import ApiService from '../Service/ApiService';
import '../Styles/ViewData.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ViewData = () => {

  const {id} = useParams();
  const [book, setBook] = useState('');
  const Service = useMemo(() => new ApiService(), []);
  const navigate = useNavigate();

  const deleteBook = (booknum) => {
    alert('Confirm to delete the Book');
    navigate("/get");
    Service.deleteBook(booknum)
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await Service.getBookById(id);
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [id, Service]);

  if (!book) {
    return <div><center>The requested Book is not found!</center></div>;
  }

  return (
    <div className="view-book">
    <div className='view-form'>
      <h1>Book Data</h1>
      <div className='form-group'>
        <label>Book Name:
        <span className="space">{book.bookname}</span>
        </label>
      </div>
      <div className='form-group'>
        <label>Book Author:
        <span className="space">{book.bookauthor}</span>
        </label>
      </div>
      <div className='form-group'>
        <label>Book Category:
        <span className="space">{book.category}</span>
        </label>
      </div>
      <div className='form-group'>
        <label>Book Release Date: 
        <span className="space">{book.releasedate}</span>
        </label>
      </div>
      <div className='form-group'>
        <label>Book Rating:
        <span className="space">{book.rating}</span>
        </label>
      </div>
      <div className='form-group'>
        <label>Book Total Page:
        <span className="space">{book.totalpage}</span>
        </label>
      </div>
      <div className='form-group'>
        <label>Book Total Chapter:
        <span className="space">{book.totalchapter}</span>
        </label>
      </div>
      <div className="button-container">
        <Link to = {`/edit/${book.booknum}`}><button className="update"><UpgradeIcon/></button></Link>
        <button onClick={() => deleteBook(book.booknum)} className="delete"><DeleteForeverIcon/></button>
      </div>
      <Link to = "/get"><button className="back"><KeyboardBackspaceIcon/></button> </Link>

    </div>
    </div>
  );
};

export default ViewData;
