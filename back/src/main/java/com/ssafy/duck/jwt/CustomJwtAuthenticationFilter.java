package com.ssafy.duck.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomJwtAuthenticationFilter extends OncePerRequestFilter {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    private final JwtProperties jwtProperties;

    private String extractJwtToken(HttpServletRequest request) {
        logger.debug(" request: {}", request);

        String authHeader = request.getHeader("Authorization");

        logger.debug("authHeader: {}", authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.replace("Bearer ", "");// "Bearer " 이후의 토큰 문자열을 반환합니다.
        }
        return "";
    }

    private boolean isValidJwtToken(String jwtToken) {
        String nickname
                = JWT
                .require(Algorithm.HMAC512(jwtProperties.getSecretKey()))
                .build().verify(jwtToken)
                .getSubject();

        return nickname != null;
    }

    private boolean isFilterNotNeeded(HttpServletRequest request) {
        String requestUri = request.getRequestURI();
        System.out.println(requestUri);
        return requestUri.contains("/api/users/login") || requestUri.contains("/wss");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        System.out.println("CustomJwtAuthenticationFilter");

        if (request.getMethod().equals("OPTIONS")) {
            filterChain.doFilter(request, response);
        }

        System.out.println("isFilterNotNeeded : " + isFilterNotNeeded(request));

        if (isFilterNotNeeded(request)) {
            filterChain.doFilter(request, response);
        }

        String jwtToken = extractJwtToken(request);
        System.out.println("jwtToken: " + jwtToken);
        if (jwtToken.equals("")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        if (jwtToken != null && isValidJwtToken(jwtToken)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
