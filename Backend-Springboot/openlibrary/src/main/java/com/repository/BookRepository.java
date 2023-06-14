package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Book;
public interface BookRepository extends JpaRepository<Book,Integer>{
	
	/*
	List<Book> findByBookname(String name);
	List<Book> findByBookauthor(String author);
	List<Book> findByBooknameStartingWith(String letter);
	List<Book> findByRatingGreaterThan(double rank);
*/
}