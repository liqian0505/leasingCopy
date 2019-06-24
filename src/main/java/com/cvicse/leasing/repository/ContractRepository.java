package com.cvicse.leasing.repository;

import com.cvicse.leasing.model.Contract;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContractRepository extends MongoRepository<Contract, String> {

    public Contract findByName(String name);

}