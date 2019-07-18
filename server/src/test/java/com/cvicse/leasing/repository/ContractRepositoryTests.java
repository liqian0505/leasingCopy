package com.cvicse.leasing.repository;

import static org.assertj.core.api.Assertions.*;

import com.cvicse.leasing.model.Contract;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ContractRepositoryTests {

    @Autowired
    ContractRepository repository;

    Contract c1, c2;

    @Before
    public void setUp() {

        repository.deleteAll();

        c1 = repository.save(new Contract("C1"));
        c2 = repository.save(new Contract("C2"));
    }

    @Test
    public void setsIdOnSave() {

        Contract c1 = repository.save(new Contract("C1"));

        assertThat(c1.id).isNotNull();
    }

    @Test
    public void findsByName() {

        Contract result = repository.findByContent("C1");

        assertThat(result).extracting("name").contains("C1");
    }

}
