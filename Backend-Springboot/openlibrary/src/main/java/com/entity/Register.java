package com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="register")
public class Register {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	@Column(name="firstname")
	private String Firstname;
	@Column(name="lastname")
	private String Lastname;
	@Column(name="username")
	private String Email;
	@Column(name="mobile")
	private Long Mobile;
	@Column(name="dob")
	private String Dob;
	@Column(name="password")
	private String Password;
	
	public Register()
	{
		
	}

	public Register(int id, String firstname, String lastname, String email, Long mobile, String dob, String password) {
		super();
		this.id = id;
		Firstname = firstname;
		Lastname = lastname;
		Email = email;
		Mobile = mobile;
		Dob = dob;
		Password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstname() {
		return Firstname;
	}

	public void setFirstname(String firstname) {
		Firstname = firstname;
	}

	public String getLastname() {
		return Lastname;
	}

	public void setLastname(String lastname) {
		Lastname = lastname;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public Long getMobile() {
		return Mobile;
	}

	public void setMobile(Long mobile) {
		Mobile = mobile;
	}

	public String getDob() {
		return Dob;
	}

	public void setDob(String dob) {
		Dob = dob;
	}

	public String getPassword() {
		return Password;
	}

	public void setPassword(String password) {
		Password = password;
	}

	@Override
	public String toString() {
		return "Register [id=" + id + ", Firstname=" + Firstname + ", Lastname=" + Lastname + ", Email=" + Email
				+ ", Mobile=" + Mobile + ", Dob=" + Dob + ", Password=" + Password + "]";
	}
	

}
