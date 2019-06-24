package com.cvicse.leasing;

import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.repository.ContractRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LeasingApplication implements CommandLineRunner{

	@Autowired
	private ContractRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(LeasingApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		// save a couple of customers
		repository.save(new Contract("C1"));
		repository.save(new Contract("C2"));

		// fetch all contracts
		System.out.println("Contract found with findAll():");
		System.out.println("-------------------------------");
		for (Contract contract : repository.findAll()) {
			System.out.println(contract);
		}
		System.out.println();

		// fetch an individual customer
		System.out.println("Contract found with findByName('C1'):");
		System.out.println("--------------------------------");
		System.out.println(repository.findByName("C1"));

	}

}
