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
	CommandLineRunner init(PrintRepository printRepository, ScaffoldRepository scaffoldRepository, LayerRepository layerRepository) {
		return args -> {
			Print print = new Print("Print 1");
			printRepository.saveAndFlush(print);
			printRepository.findAll().forEach(item -> {
				ArrayList<Scaffold> scaffolds = new ArrayList<>();
				Scaffold scaffold1 = new Scaffold("Scaffold 1");
                scaffold1.setPositionX(0d);
                scaffold1.setPositionY(0d);
                scaffolds.add(scaffold1);
                Scaffold scaffold2 = new Scaffold("Scaffold 2");
                scaffold1.setPositionX(0d);
                scaffold1.setPositionY(0d);
                scaffolds.add(scaffold2);
				item.setChildren(scaffolds);
				printRepository.saveAndFlush(item);
			});
			scaffoldRepository.findAll().forEach(item -> {
				Double baseAngle = 0.0d;
				Double angleIncrement = 22.5d;
				ArrayList<Layer> layers = new ArrayList<>();
				for (int i = 1; i < 9; i++) {
					Layer layer = new Layer(15d, 0.5d);
					layer.setWidth(15d);
					layer.setName("Layer " + i);
					baseAngle += angleIncrement;
					layer.setAngle(baseAngle);
					layer.setIsSinusoidal(item.getName().equals("Scaffold 2"));
					layer.setAmplitude(0.5);
                    layer.setPhase(1d);
                    layer.setPhaseShift(0d);
					layers.add(layer);
				}
				item.setChildren(layers);
				scaffoldRepository.saveAndFlush(item);
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
		};
	}
}
