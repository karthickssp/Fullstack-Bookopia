package com.control;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.entity.Register;
import com.service.RegisterService;

@RestController
@RequestMapping("/register")
@CrossOrigin("http://localhost:3000")
public class RegisterController {
	
	@Autowired
	RegisterService registerservice;
	
	@GetMapping("/getregister")  
	public Optional<List<Register>> GetAllBooks()   
	{  
		return registerservice.getAll();  
	}  

	@GetMapping("/register/{code}") 
	public ResponseEntity<Optional<Register>> GetBooks(@PathVariable("bookno") int id)
	{  
		Optional<Register> re = registerservice.getRegister(id); 
		return ResponseEntity.ok(re);
	}  

	@DeleteMapping("/register/{code}")  
	public ResponseEntity<Map<String, Boolean>> DeleteBook(@PathVariable("bookno") int id)   
	{  
		registerservice.deleteRegister(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}  

	@PostMapping("/create")  
	public Register SaveBook(@RequestBody Register r)   
	{  
		return registerservice.saveRegister(r);  
	}  
	
	@PutMapping("/register")  
	public ResponseEntity<Register> Update(@PathVariable Long id,@RequestBody Register r)   
	{  
		Register re = registerservice.updateRegister(r);  
		return ResponseEntity.ok(re); 
	} 
	
	
}