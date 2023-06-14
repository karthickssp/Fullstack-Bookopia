package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.entity.Book;
import com.repository.BookRepository;
@Service
public class BookService {
	
	@Autowired
	private BookRepository booksRepository; 
	
	public List<Book> getallBook()   
	{  
		return booksRepository.findAll();  
	}  
	
	public Optional<Book> getBookbyId(int id)   
	{  
		return booksRepository.findById(id);
	}  
	
	public ResponseEntity<Book> UpdateBook(int id, Book book)   
	{
		Optional<Book> oldbook = booksRepository.findById(book.getBooknum());
		if(oldbook.isPresent()) {
			Book newbook = oldbook.get();
			newbook.setBooknum(book.getBooknum());
			newbook.setBookname(book.getBookname());
			newbook.setBookauthor(book.getBookauthor());
			newbook.setCategory(book.getCategory());
			newbook.setReleasedate(book.getReleasedate());
			newbook.setRating(book.getRating());
			newbook.setTotalpage(book.getTotalpage());
			newbook.setTotalchapter(book.getTotalchapter());
			Book booknew = booksRepository.save(newbook);
			return new ResponseEntity<Book>(booknew, HttpStatus.OK);
		}
			
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	} 
	
	public String DeleteBookbyId(int id)   
	{  
		booksRepository.deleteById(id);
		return id + ": Book Deleted!!";
	}
	
	public String DeleteallBook()
	{
		booksRepository.deleteAll();
		return "All Books Deleted";
	}
	
	public String saveBook(Book book)   
	{  
		booksRepository.save(book); 
		return " Book Added!!";
	}
	
	
	public Iterable<Book> sortBook(String feild)
	{
		return booksRepository.findAll(Sort.by(feild));
	}
	
	public Iterable<Book> BookDescendingsort(String feild)
	{
		return booksRepository.findAll(Sort.by(Direction.DESC,feild));
	}
	
	public Page<Book> pagingbook(int pageno,int pagesize) 
	{
		Pageable paging = PageRequest.of(pageno, pagesize);
		return booksRepository.findAll(paging);
	}
	
	public Page<Book> pagingAndSortingBook(int pageno,int pageSize,String feild) 
	{
		Pageable paging = PageRequest.of(pageno, pageSize).withSort(Sort.by(feild));
		return booksRepository.findAll(paging);
	}
	
	/*
	public List<Book> SearchAuthor(String author)   
	{  
		return booksRepository.findByBookauthor(author);  
	}  
	
	public List<Book> SearchBook(String name)   
	{  
		return booksRepository.findByBookname(name);
	}  
	
	public List<Book> RankingBook(Double rank)   
	{  
		return booksRepository.findByRatingGreaterThan(rank);
	}
	
	public List<Book> StartingBook(String letter)
	{
		return booksRepository.findByBooknameStartingWith(letter);
	}
	*/
}