package com.cvicse.leasing.repository;

import com.cvicse.leasing.model.Contract;

import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.mongodb.repository.MongoRepository;

@JaversSpringDataAuditable
public interface ContractRepository extends MongoRepository<Contract, String> {

    public Contract findByName(String name);



}