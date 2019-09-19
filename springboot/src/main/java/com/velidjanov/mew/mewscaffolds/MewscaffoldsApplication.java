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
			Print print = new Print("Print 1");
			printRepository.saveAndFlush(print);
			printRepository.findAll().forEach(item -> {
				ArrayList<Scaffold> scaffolds = new ArrayList<>();
				scaffolds.add(new Scaffold("Scaffold 1"));
				scaffolds.add(new Scaffold("Scaffold 2"));
				item.setChildren(scaffolds);
				printRepository.saveAndFlush(item);
			});
			scaffoldRepository.findAll().forEach(item -> {
				Double baseAngle = 0.0d;
				Double angleIncrement = 22.5d;
				ArrayList<Layer> layers = new ArrayList<>();
				for (int i = 1; i < 9; i++) {
					Layer layer = new Layer("Layer " + i);
					layer.setAngle(baseAngle);
					baseAngle += angleIncrement;
					layers.add(layer);
				}
				item.setChildren(layers);
				scaffoldRepository.saveAndFlush(item);
			});
			layerRepository.findAll().forEach(item -> {
				ArrayList<Fiber> fibers = new ArrayList<>();
				for (int i = 1; i < 32; i++) {
					Fiber fiber = new Fiber("Fiber " + i);
					fiber.setLength(30.0d);
					fiber.setDistanceToNextFiber(1.0d);
					fibers.add(fiber);
				}
				item.setChildren(fibers);
				layerRepository.saveAndFlush(item);
			});
			printRepository.findAll().forEach(item -> {
				log.debug("Print: {}", item);
			});
			scaffoldRepository.findAll().forEach(item -> {
				log.debug("Scaffold: {}", item);
			});
			layerRepository.findAll().forEach(item -> {
				log.debug("Layer: {}", item);
			});
			fiberRepository.findAll().forEach(item -> {
				log.debug("Fiber: {}", item);
			});
		};
	}
}
