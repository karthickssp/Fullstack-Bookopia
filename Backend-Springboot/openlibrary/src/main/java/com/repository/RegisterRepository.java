package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.Register;

public interface RegisterRepository extends JpaRepository<Register,Integer>{
 /*
	@Query("select reg.password from Register reg where reg.username=?1")
	Iterable<Register> findAllUsernamePassword( String username);
	*/

}
