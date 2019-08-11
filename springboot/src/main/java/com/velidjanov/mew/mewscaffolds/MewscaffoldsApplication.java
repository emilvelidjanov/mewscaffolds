package com.velidjanov.mew.mewscaffolds;

import com.velidjanov.mew.mewscaffolds.entity.*;
import com.velidjanov.mew.mewscaffolds.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@SpringBootApplication
@Slf4j
public class MewscaffoldsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MewscaffoldsApplication.class, args);
	}

	@Bean
	CommandLineRunner init(PrintRepository printRepository, ScaffoldRepository scaffoldRepository, LayerRepository layerRepository, FiberRepository fiberRepository) {
		return args -> {
			Print print = new Print("Print 1");
			printRepository.saveAndFlush(print);
			printRepository.findAll().forEach(item -> {
				ArrayList<Scaffold> scaffolds = new ArrayList<>();
				scaffolds.add(new Scaffold("Scaffold 1"));
				scaffolds.add(new Scaffold("Scaffold 2"));
				scaffoldRepository.saveAll(scaffolds);
				item.setScaffolds(scaffolds);
				printRepository.saveAndFlush(item);
			});
			printRepository.findAll().forEach(item -> {
				log.info("Print: {}", item);
			});
			scaffoldRepository.findAll().forEach(item -> {
				log.info("Scaffold: {}", item);
			});
		};
	}
}
