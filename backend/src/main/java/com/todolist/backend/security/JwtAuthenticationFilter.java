package com.todolist.backend.security;

import com.todolist.backend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwt;
    private final UserRepository users;

    public JwtAuthenticationFilter(JwtService jwt, UserRepository users) {
        this.jwt = jwt;
        this.users = users;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, jakarta.servlet.ServletException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        String email;
        try {
            email = jwt.extractSubject(token);
        } catch (Exception e) {
            chain.doFilter(request, response);
            return;
        }

        if (getContext().getAuthentication() == null) {
            var user = users.findByEmail(email).orElse(null);
            if (user != null) {
                var auth = new UsernamePasswordAuthenticationToken(
                        email, null);
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(request, response);
    }
}
