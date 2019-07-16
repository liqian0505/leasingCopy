package com.cvicse.leasing.service;

import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.repository.ContractRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;


/**
* @authored by TC.
*/
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
        contract1.setId("1");
        Contract contract2 = new Contract("C2");
        contract2.setId("2");
        List<Contract> allContracts = Arrays.asList(contract1, contract2);
        Mockito.when(repository.findById(contract1.getId())).thenReturn(Optional.of(contract1));
        Mockito.when(repository.findById(contract2.getId())).thenReturn(Optional.of(contract2));
        Mockito.when(repository.findById("wrong_id")).thenReturn(null);
        Mockito.when(repository.save(new Contract("C2"))).thenReturn(contract2);
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
    public void givenRightContractId_thenReturnContract(){
        Contract contract =contractService.getContract("1");
        assertThat(contract).extracting("name").contains("C1");
    }

    @Test
    public void createNewContract_thenReturnTheContract(){
        Contract contract = contractService.createContract(new Contract("C2"));
        assertThat(contract).extracting("name").contains("C2");
    }

    @Test
    public void updateExistedContract_withExistedId_andNewName_thenReturnTheContract(){
        Contract contract =contractService.updateContract(new Contract("C3"),"1");
        assertThat(contract.name.equals("C3")).isTrue();
    }

//    @Test
//    public void deleteContract(){
//        contractService.deleteContract(repository.findByName("C1").id);
//        assertThat(repository.findByName("C1")).isNull();
//    }
}
