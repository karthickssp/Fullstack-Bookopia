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
  { id: 'rating', label: 'Book Rating', minWidth: 100 },
  { id: 'totalpage', label: 'Total Pages', minWidth: 100 },
  { id: 'totalchapter', label: 'Total Chapters', minWidth: 120 },
];

const GetData = () => {
  const Service = useMemo(() => new ApiService(), []);
  const [bookList, setBookList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [searchTermBook, setSearchTermBook] = useState('');
  const [searchTermAuthor, setSearchTermAuthor] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

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

  const handleSort = (column) => {
    if (column === sortedColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredBookList = bookList.filter((book) => {
    const lowerCaseSearchTermBook = searchTermBook.toLowerCase();
    const lowerCaseSearchTermAuthor = searchTermAuthor.toLowerCase();
    return (
      book.bookname.toLowerCase().includes(lowerCaseSearchTermBook) &&
      book.bookauthor.toLowerCase().includes(lowerCaseSearchTermAuthor)
    );
  });

  const sortedBookList = filteredBookList.sort((a, b) => {
    if (sortedColumn) {
      const valueA = typeof a[sortedColumn] === 'string'
        ? a[sortedColumn].toLowerCase()
        : a[sortedColumn];
      const valueB = typeof b[sortedColumn] === 'string'
        ? b[sortedColumn].toLowerCase()
        : b[sortedColumn];

      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div>
      <div id="topic">
        <Link to="/home" style={{ textDecoration: 'none' }}><h2>BOOKOPIA</h2></Link>
        <h2>Explore Books!</h2>
        <div id="add_actions-container">
          <Link to="/">
            <button id="add_actions">Logout</button>
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
        <TableContainer sx={{ maxHeight: 572, minHeight: 572}}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    <div
                      className="table-header"
                      onClick={() => handleSort(column.id)}
                    >
                      <span>{column.label}</span>
                      {sortedColumn === column.id && (
                        <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedBookList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booklist, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                    {columns.map((column) => {
                      const value = booklist[column.id];
                      return (
                        <TableCell key={column.id} align="center" >
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
        <TablePagination sx={{ width: '100%', overflow: 'hidden' }}
          rowsPerPageOptions={[6, 9, 12, 15, 20]}
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
