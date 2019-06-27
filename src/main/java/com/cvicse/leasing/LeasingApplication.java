package com.cvicse.leasing;

import java.util.List;

import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.repository.ContractRepository;

import org.javers.core.Javers;
import org.javers.core.metamodel.object.CdoSnapshot;
import org.javers.core.metamodel.object.SnapshotType;
import org.javers.repository.jql.QueryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LeasingApplication implements CommandLineRunner {

	@Autowired
	private ContractRepository repository;

	@Autowired
	private Javers javers;

	private static final Logger logger = LoggerFactory.getLogger(LeasingApplication.class);


	public static void main(String[] args) {
		SpringApplication.run(LeasingApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		repository.save(new Contract("Contract 1"));
		repository.save(new Contract("Contract 2"));

		Contract c = repository.findByName("Contract 1");
		c.name = "ABC";
		repository.save(c);
		c.name = "DEF";

		repository.save(c);

		QueryBuilder queryBuilder = QueryBuilder.byInstance(c).withSnapshotType(SnapshotType.INITIAL);

		List<CdoSnapshot> changes = javers.findSnapshots(queryBuilder.build());

		logger.info("Found the initial version: ");
		for (CdoSnapshot change : changes) {
			logger.info("Contract snapshot: {}", change);
		}

	}

}
