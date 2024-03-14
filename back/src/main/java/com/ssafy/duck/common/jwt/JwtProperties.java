package com.ssafy.duck.common.jwt;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class JwtProperties {

    @Value("${spring.security.jwt.secret-key}")
    String SECRET_KEY;
    static String TOKEN_PREFIX = "Bearer ";
    static String HEADER_STRING = "Authorization";

    public String getSecretKey() {
        return SECRET_KEY;
    }

    public static String getTokenPrefix() {
        return TOKEN_PREFIX;
    }

    public static String getHeaderString() {
        return HEADER_STRING;
    }
}
