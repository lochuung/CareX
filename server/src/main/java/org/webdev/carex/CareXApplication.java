package org.webdev.carex;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
<<<<<<< HEAD
import org.webdev.carex.service.UserService;
=======
import org.springframework.scheduling.annotation.EnableScheduling;
import org.webdev.carex.service.PostService;
import org.webdev.carex.service.UserService;
import org.webdev.carex.service.WorkshopService;
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
import org.webdev.carex.service.YogaService;

@SpringBootApplication
@EnableScheduling
public class CareXApplication {

	public static void main(String[] args) {

		SpringApplication.run(CareXApplication.class, args);
	}

	@Bean
<<<<<<< HEAD
	CommandLineRunner runner(UserService userService, YogaService yogaService) {
		return args -> {
			userService.createData();
			yogaService.createData();
=======
	CommandLineRunner runner(UserService userService, YogaService yogaService, WorkshopService workshopService, PostService postService) {
		return args -> {
			userService.createData();
			yogaService.createData();
			workshopService.createWorkshop();
			postService.createPost();
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
		};
	}
}
