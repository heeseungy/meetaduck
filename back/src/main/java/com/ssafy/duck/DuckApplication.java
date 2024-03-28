package com.ssafy.duck;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@EnableScheduling
@SpringBootApplication(exclude = ErrorMvcAutoConfiguration.class)
@ConfigurationPropertiesScan
public class DuckApplication {

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    static private String redirectURI;

    public static void main(String[] args) {
        System.out.println("redirectURI" + redirectURI);
        SpringApplication.run(DuckApplication.class, args);
    }

}
