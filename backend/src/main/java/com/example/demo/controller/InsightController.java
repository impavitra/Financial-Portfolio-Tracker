package com.example.demo.controller;

import com.example.demo.services.InsightService;
import com.example.demo.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/portfolios")
@RequiredArgsConstructor
public class InsightController {
    private final InsightService insightService;
    private final JwtUtil jwtUtil;

    @GetMapping("/{portfolioId}/insights")
    public ResponseEntity<Map<String, Object>> getInsights(
            @PathVariable Long portfolioId,
            HttpServletRequest httpRequest) {
        String username = jwtUtil.extractUsername(httpRequest.getHeader("Authorization").substring(7));
        return ResponseEntity.ok(insightService.getInsights(portfolioId, username));
    }
}