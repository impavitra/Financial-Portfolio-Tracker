package com.example.demo.controller;

import com.example.demo.dto.AddAssetRequest;
import com.example.demo.dto.CreatePortfolioRequest;
import com.example.demo.dto.PortfolioResponse;
import com.example.demo.services.PortfolioService;
import com.example.demo.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
@RequiredArgsConstructor
public class PortfolioController {
    private final PortfolioService portfolioService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<PortfolioResponse> createPortfolio(
            @Valid @RequestBody CreatePortfolioRequest request,
            HttpServletRequest httpRequest) {
        String username = jwtUtil.extractUsername(httpRequest.getHeader("Authorization").substring(7));
        PortfolioResponse portfolio = portfolioService.createPortfolio(username, request.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(portfolio);
    }

    @GetMapping
    public ResponseEntity<List<PortfolioResponse>> getUserPortfolios(HttpServletRequest httpRequest) {
        String username = jwtUtil.extractUsername(httpRequest.getHeader("Authorization").substring(7));
        List<PortfolioResponse> portfolios = portfolioService.getUserPortfolios(username);
        return ResponseEntity.ok(portfolios);
    }

    @PostMapping("/{portfolioId}/assets")
    public ResponseEntity<String> addAsset(
            @PathVariable Long portfolioId,
            @Valid @RequestBody AddAssetRequest request,
            HttpServletRequest httpRequest) {
        String username = jwtUtil.extractUsername(httpRequest.getHeader("Authorization").substring(7));
        portfolioService.addAsset(portfolioId, request.getTicker(), request.getQuantity(), username);
        return ResponseEntity.ok("Asset added successfully");
    }

    @DeleteMapping("/{portfolioId}/assets/{ticker}")
    public ResponseEntity<String> removeAsset(
            @PathVariable Long portfolioId,
            @PathVariable String ticker,
            HttpServletRequest httpRequest) {
        String username = jwtUtil.extractUsername(httpRequest.getHeader("Authorization").substring(7));
        portfolioService.removeAsset(portfolioId, ticker, username);
        return ResponseEntity.ok("Asset removed successfully");
    }

    @GetMapping("/{portfolioId}")
    public ResponseEntity<PortfolioResponse> getPortfolio(
            @PathVariable Long portfolioId,
            HttpServletRequest httpRequest) {
        String username = jwtUtil.extractUsername(httpRequest.getHeader("Authorization").substring(7));
        PortfolioResponse portfolio = portfolioService.getPortfolioDetails(portfolioId, username);
        return ResponseEntity.ok(portfolio);
    }
}
