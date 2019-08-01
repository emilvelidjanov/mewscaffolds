package com.velidjanov.mew.mewscaffolds;

import com.velidjanov.mew.mewscaffolds.entity.User;
import com.velidjanov.mew.mewscaffolds.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;
import java.util.stream.Stream;

@SpringBootApplication
@Slf4j
public class MewscaffoldsApplication {

	private static String mailSuffix = "@gmail.com";

	public static void main(String[] args) {
		SpringApplication.run(MewscaffoldsApplication.class, args);
	}

	@Bean
	CommandLineRunner init(UserRepository userRepository) {
		return args -> {
			Stream.of("John", "Julie", "Jennifer", "Helen", "Rachel").forEach(name -> {
				User user = new User(name, name.toLowerCase() + mailSuffix);
				userRepository.saveAndFlush(user);
			});
			userRepository.findAll().forEach(user -> {
				log.info("id: {} name: {} email: {}", user.getId(), user.getName(), user.getEmail());
			});
		};
	}
}
