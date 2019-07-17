package com.cvicse.leasing;

import java.util.List;

import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.model.Template;
import com.cvicse.leasing.repository.ContractRepository;

//import org.javers.core.Javers;
//import org.javers.core.metamodel.object.CdoSnapshot;
//import org.javers.core.metamodel.object.SnapshotType;
//import org.javers.repository.jql.QueryBuilder;
import com.cvicse.leasing.repository.TemplateRepository;
import org.javers.core.Changes;
import org.javers.core.Javers;
import org.javers.repository.jql.JqlQuery;
import org.javers.repository.jql.QueryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LeasingApplication implements CommandLineRunner {
//	public static void main(String[] args) {
//		SpringApplication.run(LeasingApplication.class, args);
//	}

	@Autowired
	private TemplateRepository repository;

	@Autowired
	private ContractRepository contractRepository;

	@Autowired
	private Javers javers;

	private static final Logger logger = LoggerFactory.getLogger(LeasingApplication.class);


	public static void main(String[] args) {
		SpringApplication.run(LeasingApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		repository.save(new Template("Template 1"));
		repository.save(new Template("Template 2"));

		contractRepository.deleteAll();
		contractRepository.save(new Contract("Contract 1"));
		contractRepository.save(new Contract("Contract 2"));
		Contract c = contractRepository.findByContent("Contract 1");
		c.content = "ABC";
		contractRepository.save(c);
		c.content = "DEF";

		contractRepository.save(c);
		System.out.println(contractRepository.findByContent("DEF").id);
		JqlQuery jqlQuery=QueryBuilder.byInstance(c).build();
		Changes changes = javers.findChanges(jqlQuery);
		System.out.println(changes.prettyPrint());
//		QueryBuilder queryBuilder = QueryBuilder.byInstance(c).withSnapshotType(SnapshotType.INITIAL);
//
//		List<CdoSnapshot> changes = javers.findSnapshots(queryBuilder.build());
//
//		logger.info("Found the initial version: ");
//		for (CdoSnapshot change : changes) {
//			logger.info("Contract snapshot: {}", change);
		}

}
