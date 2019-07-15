package com.cvicse.leasing.service;

import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.repository.ContractRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ContractServiceTests {

    @Autowired
    ContractService contractService;

    @MockBean
    ContractRepository repository;

    @Before
    public void setUp(){
        repository.deleteAll();
        Contract contract1=new Contract("C1");
        Contract contract2 = new Contract("C2");

        List<Contract> allContracts = Arrays.asList(contract1, contract2);
        Mockito.when(repository.findByName(contract1.name)).thenReturn(contract1);
        Mockito.when(repository.findByName(contract2.name)).thenReturn(contract2);
        Mockito.when(repository.findByName("wrong_name")).thenReturn(null);
        Mockito.when(repository.findAll()).thenReturn(allContracts);
    }

    @Test
    public void given2Contracts_when_getAllContracts_thenReturn2Records() {
        Contract contract1=new Contract("C1");
        Contract contract2 = new Contract("C2");
        List<Contract> contractList= contractService.getAllContract();
        assertThat(contractList).hasSize(2).extracting(Contract::getName).contains(contract1.getName(),contract2.getName());
    }

    @Test
    public void getContract(){
        Contract contract =contractService.getContract(repository.findByName("C1").id);
        assertThat(contract).extracting("name").contains("C1");
    }

    @Test
    public void createContract(){
        Contract contract = contractService.createContract(new Contract("C3"));
        assertThat(contract.id).isNotNull();
    }

    @Test
    public void updateContract(){
        Contract contract =contractService.updateContract(new Contract("C4"),repository.findByName("C1").id);
        assertThat(contract.name.equals("C4")).isTrue();
    }

    @Test
    public void deleteContract(){
        contractService.deleteContract(repository.findByName("C1").id);
        assertThat(repository.findByName("C1")).isNull();
    }
}
