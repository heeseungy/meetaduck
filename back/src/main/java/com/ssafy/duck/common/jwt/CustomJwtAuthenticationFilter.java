package com.ssafy.duck.common.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//@Component
@RequiredArgsConstructor
public class CustomJwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProperties jwtProperties;

    private String extractJwtToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.replace("Bearer ", "");// "Bearer " 이후의 토큰 문자열을 반환합니다.
        }
        return null;
    }

    private boolean isValidJwtToken(String jwtToken) {
        String nickname
                = JWT
                .require(Algorithm.HMAC512(jwtProperties.getSecretKey()))
                .build().verify(jwtToken)
                .getSubject();

        if (nickname != null) {
            return true;
        } else return false;
    }

    private boolean isFilterNotNeeded(HttpServletRequest request) {
        String requestUri = request.getRequestURI();
        System.out.println(requestUri);
        return requestUri.contains("/api/users/login");
//        return requestUri.contains("/api/users/login") || requestUri.contains("/api/test/dummy");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        System.out.println("CustomJwtAuthenticationFilter");

        if (isFilterNotNeeded(request)) {
            filterChain.doFilter(request, response);
        }

        String jwtToken = extractJwtToken(request);

        if (jwtToken != null && isValidJwtToken(jwtToken)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
