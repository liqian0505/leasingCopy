package com.cvicse.leasing.controller;

import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.repository.ContractRepository;
import com.cvicse.leasing.service.ContractService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.WebApplicationContext;

import java.awt.*;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ContractControllerTests {

    @Test
    public void getContracts() throws Exception{
        standaloneSetup(new ContractController()).build()
                .perform(get("/api/contracts").accept(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("C1"));
    }


    @RestController
    @RequestMapping("/api/contracts")
    public static class ContractController {

        @Autowired
        private ContractService contractService;
        @Autowired
        ContractRepository repository;

        Contract c1, c2;

        private static final Logger logger = LoggerFactory.getLogger(com.cvicse.leasing.controller.ContractController.class);

        @GetMapping
        public List<Contract> getContracts() {
            contractService.createContract(new Contract("C1"));
            contractService.createContract(new Contract("C2"));
            logger.info("All contracts requested");
            return contractService.getAllContract();
        }

        @GetMapping("/{id}")
        public Contract getContract(@PathVariable String id) {
            logger.info("Get contract with contract.id " + id);
            return this.contractService.getContract(id);
        }

        @PostMapping
        public Contract createContract(@RequestBody Contract newContract) {
            logger.info("Create contract");
            return this.contractService.createContract(newContract);
        }

        @PutMapping("/{id}")
        public Contract updateContract(@RequestBody Contract newContract, @PathVariable String id) {
            logger.info("UpdateContract with contract.id " + id);
            return this.contractService.updateContract(newContract, id);
        }

        @DeleteMapping("/{id}")
        public void deleteContract(@PathVariable String id) {
            logger.info("Delete contract with contract.id " + id);
            this.contractService.deleteContract(id);
        }

    }
}
