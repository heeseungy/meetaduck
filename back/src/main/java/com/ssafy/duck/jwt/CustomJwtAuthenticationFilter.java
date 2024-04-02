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

    // JWT 토큰을 요청 헤더에서 추출하는 메소드입니다.
    private String extractJwtToken(HttpServletRequest request) {
        logger.debug(" request: {}", request);

        String authHeader = request.getHeader("Authorization");

        logger.debug("authHeader: {}", authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // "Bearer " 이후의 토큰 문자열을 반환합니다.
            return authHeader.replace("Bearer ", "");
        }
        return "";
    }

    // 전달받은 JWT 토큰이 유효한지 검사하는 메소드입니다.
    private boolean isValidJwtToken(String jwtToken) {
        String nickname
                = JWT
                .require(Algorithm.HMAC512(jwtProperties.getSecretKey()))
                .build().verify(jwtToken)
                .getSubject();

        // 유효한 토큰일 경우 토큰에서 추출한 닉네임(주제)이 null이 아니어야 합니다.
        return nickname != null;
    }

    // 필터링하지 않아도 되는 요청인지 판단하는 메소드입니다.
    // 예를 들어, 로그인 경로는 필터링에서 제외할 수 있습니다.
    private boolean isFilterNotNeeded(HttpServletRequest request) {
        String requestUri = request.getRequestURI();
        System.out.println(requestUri);

        return requestUri.contains("/api/users/login") || requestUri.contains("/wss");
}


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        System.out.println("CustomJwtAuthenticationFilter");

        // OPTIONS 요청은 CORS 사전 요청으로, 별도의 인증 없이 통과시킵니다.
        if (request.getMethod().equals("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (isFilterNotNeeded(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 요청에서 JWT 토큰을 추출합니다.
        String jwtToken = extractJwtToken(request);
        System.out.println("jwtToken: " + jwtToken);

        // 추출한 토큰이 없거나 유효하지 않은 경우, 401 Unauthorized 응답을 반환합니다.
        if (jwtToken.equals("") || !isValidJwtToken(jwtToken)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 유효한 토큰이 있는 경우, 요청을 계속 진행시킵니다.
        filterChain.doFilter(request, response);
    }
}
