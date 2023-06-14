package com.control;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Book;
import com.service.BookService;

@RequestMapping("/library")
@CrossOrigin("http://localhost:3000")
@RestController
public class BookController {
	
	@Autowired
	private BookService bookservice;

	@GetMapping()
	public ResponseEntity<List<Book>> getBook()   
	{
		try
		{
			List<Book>Booklist = new ArrayList<>();
			bookservice.getallBook().forEach(Booklist::add);
			if(Booklist.isEmpty())
			{
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(Booklist, HttpStatus.OK);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("{id}") 
	public ResponseEntity<Book> getBookById(@PathVariable int id)
	{  
		Optional<Book>Bookdata = bookservice.getBookbyId(id);
		if(Bookdata.isPresent())
		{
			return new ResponseEntity<>(Bookdata.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}  
	
	@PostMapping()
	public void saveBook(@RequestBody Book book)   
	{  
		 bookservice.saveBook(book);  
	}  
	
	@PutMapping("{id}")  
	public ResponseEntity<Book> UpdateBook(@PathVariable int id,@RequestBody Book book)   
	{  
		book.setBooknum(id);
		return bookservice.UpdateBook(id, book);
	} 
	
	@DeleteMapping("{id}")  
	public ResponseEntity<HttpStatus> DeleteBookbyid(@PathVariable int id)   
	{  
		bookservice.DeleteBookbyId(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping()  
	public ResponseEntity<HttpStatus> DeleteAllBook()   
	{  
		bookservice.DeleteallBook();
		return new ResponseEntity<>(HttpStatus.OK);
	} 
	
	//sorting
	@GetMapping("/sort/{feild}")
	public Iterable<Book> getBookSort(@PathVariable("feild") String feild)
	{
		return bookservice.sortBook(feild);
	}
	
	@GetMapping("/dsort/{feild}")
	public Iterable<Book> getDesBookSort(@PathVariable("feild") String feild)
	{
		return bookservice.BookDescendingsort(feild);
	}
	
	//paging
	@GetMapping("/page/{pageno}/{pagesize}")
	public Page <Book> getBookPage(@PathVariable("pageno") int pageno,@PathVariable("pagesize") int pagesize)
	{
		return bookservice.pagingbook(pageno,pagesize);
	} 
	
	//page and sort
	@GetMapping("/ps/{pageno}/{pagesize}/{feild}")
	public Page<Book> BookPageSort(@PathVariable ("pageno") int pageno,@PathVariable ("pagesize") int pagesize,@PathVariable ("feild")String feild)
	{
		return bookservice.pagingAndSortingBook(pageno, pagesize,feild);
	}
	/*
	//books by author
	@GetMapping("a/{author}")
	public Iterable<Book> getAuthorBook(@PathVariable("author") String author)
	{
		return bookservice.SearchAuthor(author);
	}
	
	@GetMapping("b/{name}")
	public Iterable<Book> getBookname(@PathVariable("name") String name)
	{
		return bookservice.SearchBook(name);
	}
	
	@GetMapping("bs/{letter}")
	public Iterable<Book> getstartBookname(@PathVariable("letter") String letter)
	{
		return bookservice.StartingBook(letter);
	}
	
	@GetMapping("r/{rank}")
	public Iterable<Book> getRankBook(@PathVariable("rank") double rank)
	{
		return bookservice.RankingBook(rank);
	}
*/
}