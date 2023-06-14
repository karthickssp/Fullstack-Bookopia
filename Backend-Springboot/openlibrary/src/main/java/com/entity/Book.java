package com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="openlibrary")

public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="booknum")
	private int Booknum;
	@Column(name="bookname")
	private String Bookname;
	@Column(name="bookauthor")
	private String Bookauthor;
	@Column(name="category")
	private String Category;
	@Column(name="releasedate")
	private String Releasedate;
	@Column(name="rating")
	private Double Rating;
	@Column(name="totalpage")
	private int Totalpage;
	@Column(name="totalchapter")
	private int Totalchapter;
	
	public int getBooknum() {
		return Booknum;
	}
	public void setBooknum(int booknum) {
		Booknum = booknum;
	}
	public String getBookname() {
		return Bookname;
	}
	public void setBookname(String bookname) {
		Bookname = bookname;
	}
	public String getBookauthor() {
		return Bookauthor;
	}
	public void setBookauthor(String bookauthor) {
		Bookauthor = bookauthor;
	}
	public String getCategory() {
		return Category;
	}
	public void setCategory(String category) {
		Category = category;
	}
	public String getReleasedate() {
		return Releasedate;
	}
	public void setReleasedate(String releasedate) {
		Releasedate = releasedate;
	}
	public Double getRating() {
		return Rating;
	}
	public void setRating(Double rating) {
		Rating = rating;
	}
	public int getTotalpage() {
		return Totalpage;
	}
	public void setTotalpage(int totalpage) {
		Totalpage = totalpage;
	}
	public int getTotalchapter() {
		return Totalchapter;
	}
	public void setTotalchapter(int totalchapter) {
		Totalchapter = totalchapter;
	}
	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}