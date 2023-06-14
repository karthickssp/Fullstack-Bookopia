package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Register;
import com.repository.RegisterRepository;

@Service
public class RegisterService {
	
	@Autowired
	RegisterRepository registerRepository;
	
	public Optional<List<Register>> getAll()   
	{  
		return Optional.of(registerRepository.findAll());  
	}  
	
	public Optional<Register> getRegister(int id)   
	{  
		return registerRepository.findById(id); 
	}  
	
	public void deleteRegister(int id)   
	{  
		registerRepository.deleteById(id);  
	}  
	
	public Register saveRegister(Register r)   
	{  
		return registerRepository.save(r);  
	}
	
	public Register updateRegister(Register r)   
	{  
		registerRepository.save(r);  
		return r;  
	}
	

}
