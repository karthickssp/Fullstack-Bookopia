import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../Service/ApiService';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';
import '../Styles/GetData.css';

const columns = [
  { id: 'booknum', label: 'Book Number', minWidth: 120 },
  { id: 'bookname', label: 'Book Name', minWidth: 170 },
  { id: 'bookauthor', label: 'Book Author', minWidth: 170 },
  { id: 'category', label: 'Book Category', minWidth: 170 },
  { id: 'releasedate', label: 'Book Release Date', minWidth: 170 },
  { id: 'actions', label: 'Veiw', minWidth: 120 },
];

const GetData = () => {
  const Service = useMemo(() => new ApiService(), []);
  const [bookList, setBookList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchTermBook, setSearchTermBook] = useState('');
  const [searchTermAuthor, setSearchTermAuthor] = useState('');

  const getAllBook = useCallback(() => {
    Service.getAllBook()
      .then((response) => {
        setBookList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Service]);

  useEffect(() => {
    getAllBook();
  }, [getAllBook]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchBook = (e) => {
    setSearchTermBook(e.target.value);
  };

  const handleSearchAuthor = (e) => {
    setSearchTermAuthor(e.target.value);
  };

  const filteredBookList = bookList.filter((book) => {
    const lowerCaseSearchTermBook = searchTermBook.toLowerCase();
    const lowerCaseSearchTermAuthor = searchTermAuthor.toLowerCase();
    return (
      book.bookname.toLowerCase().includes(lowerCaseSearchTermBook) &&
      book.bookauthor.toLowerCase().includes(lowerCaseSearchTermAuthor)
    );
  });

  return (
    <div>
      <div id="topic">
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <h2>BOOKOPIA</h2>
        </Link>
        <h2>List of Books!</h2>
        <div id="add_actions-container">
          <Link to="/add">
            <button id="add_actions">Add</button>
          </Link>
        </div>
      </div>

      <div className="search-container-wrapper">
        <div className="search-container">
          <TextField
            type="text"
            label="Search by book"
            value={searchTermBook}
            onChange={handleSearchBook}
          />
        </div>
        <div className="search-container">
          <TextField
            type="text"
            label="Search by author"
            value={searchTermAuthor}
            onChange={handleSearchAuthor}
          />
        </div>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 572, minHeight: 572 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booklist, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = booklist[column.id];
                      return (
                        <TableCell key={column.id} align="center">
                          {column.id !== 'actions' ? (
                            value
                          ) : (
                            <>
                              <Link to={`/view/${booklist.booknum}`}>
                                <button id="view_action">
                                  <VisibilityIcon />
                                </button>
                              </Link>
                            </>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ width: '100%', overflow: 'hidden' }}
          rowsPerPageOptions={[5, 7, 10, 15, 20]}
          component="div"
          count={filteredBookList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default GetData;
