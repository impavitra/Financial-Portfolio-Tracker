package com.example.demo.controller;

import com.example.demo.services.StockService;
import com.example.demo.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
public class StockController {
    private final StockService stockService;
    private final JwtUtil jwtUtil;

    @GetMapping("/{ticker}/price")
    public ResponseEntity<Map<String, Object>> getStockPrice(
            @PathVariable String ticker,
            HttpServletRequest httpRequest) {
        // Validate JWT token (username extraction validates the token)
        jwtUtil.extractUsername(httpRequest.getHeader("Authorization").substring(7));
        Map<String, Object> stockInfo = stockService.getStockInfo(ticker);
        return ResponseEntity.ok(stockInfo);
    }

    @GetMapping("/{ticker}/info")
    public ResponseEntity<Map<String, Object>> getStockInfo(
            @PathVariable String ticker,
            HttpServletRequest httpRequest) {
        // Validate JWT token (username extraction validates the token)
        jwtUtil.extractUsername(httpRequest.getHeader("Authorization").substring(7));
        Map<String, Object> stockInfo = stockService.getStockInfo(ticker);
        return ResponseEntity.ok(stockInfo);
    }
}
