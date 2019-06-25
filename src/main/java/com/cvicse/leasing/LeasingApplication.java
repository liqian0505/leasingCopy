package com.cvicse.leasing;

import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.repository.ContractRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LeasingApplication implements CommandLineRunner {

	@Autowired
	private ContractRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(LeasingApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		repository.save(new Contract("Contract 1"));
		repository.save(new Contract("Contract 2"));

	}

}
