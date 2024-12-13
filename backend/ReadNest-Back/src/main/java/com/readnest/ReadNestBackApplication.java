package com.readnest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.readnest")
public class ReadNestBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReadNestBackApplication.class, args);
    }

}
