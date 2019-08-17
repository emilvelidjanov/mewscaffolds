package com.velidjanov.mew.mewscaffolds;

import com.velidjanov.mew.mewscaffolds.entity.*;
import com.velidjanov.mew.mewscaffolds.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.transaction.Transactional;
import java.util.ArrayList;

@SpringBootApplication
@Slf4j
public class MewscaffoldsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MewscaffoldsApplication.class, args);
	}

	@Bean
	CommandLineRunner init(PrintRepository printRepository, ScaffoldRepository scaffoldRepository, LayerRepository layerRepository, FiberRepository fiberRepository) {
		return args -> {
			final String sep = " - ";
			Print print = new Print("Print 1");
			printRepository.saveAndFlush(print);
			printRepository.findAll().forEach(item -> {
				ArrayList<Scaffold> scaffolds = new ArrayList<>();
				scaffolds.add(new Scaffold(item.getName() + sep + "Scaffold 1"));
				scaffolds.add(new Scaffold(item.getName() + sep + "Scaffold 2"));
				item.setChildren(scaffolds);
				printRepository.saveAndFlush(item);
			});
			scaffoldRepository.findAll().forEach(item -> {
				ArrayList<Layer> layers = new ArrayList<>();
				layers.add(new Layer(item.getName() + sep + "Layer 1"));
				layers.add(new Layer(item.getName() + sep + "Layer 2"));
				layers.add(new Layer(item.getName() + sep + "Layer 3"));
				item.setChildren(layers);
				scaffoldRepository.saveAndFlush(item);
			});
			layerRepository.findAll().forEach(item -> {
				ArrayList<Fiber> fibers = new ArrayList<>();
				fibers.add(new Fiber(item.getName() + sep + "Fiber 1"));
				fibers.add(new Fiber(item.getName() + sep + "Fiber 2"));
				fibers.add(new Fiber(item.getName() + sep + "Fiber 3"));
				fibers.add(new Fiber(item.getName() + sep + "Fiber 4"));
				item.setChildren(fibers);
				layerRepository.saveAndFlush(item);
			});
			printRepository.findAll().forEach(item -> {
				log.info("Print: {}", item);
			});
			scaffoldRepository.findAll().forEach(item -> {
				log.info("Scaffold: {}", item);
			});
			layerRepository.findAll().forEach(item -> {
				log.info("Layer: {}", item);
			});
			fiberRepository.findAll().forEach(item -> {
				log.info("Fiber: {}", item);
			});
		};
	}
}
