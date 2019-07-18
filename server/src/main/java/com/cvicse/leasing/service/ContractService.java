package com.cvicse.leasing.service;

import java.util.List;

import com.cvicse.leasing.exception.ContractNotFoundException;
import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.repository.ContractRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    private static final Logger logger = LoggerFactory.getLogger(ContractService.class);

    public List<Contract> getAllContract() {
        List<Contract> contracts = contractRepository.findAll();
        logger.info("contracts returned");
        return contracts;
    }

    public Contract getContract(String id) throws ContractNotFoundException {
        if(!this.contractRepository.findById(id).isPresent())
            throw new ContractNotFoundException("Contract Not Found in contractRepository.");
        return this.contractRepository.findById(id).get();
    }

    public Contract createContract(Contract newContract) {
        logger.info("contract saved");
        return contractRepository.save(newContract);
    }

    public Contract updateContract(Contract newContract, String id) {
        this.contractRepository.findById(id).ifPresent(contract -> {
            contract.content = newContract.content;
            this.contractRepository.save(contract);
        });
        return newContract;
    }

    public void deleteContract(String id) throws ContractNotFoundException {
        if(!this.contractRepository.findById(id).isPresent())
            throw new ContractNotFoundException("Contract Not Found in contractRepository.");
        logger.info("contract deleted");
        this.contractRepository.deleteById(id);
    }

}