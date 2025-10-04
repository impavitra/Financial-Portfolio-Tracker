package com.example.demo.services;

import com.example.demo.dto.PortfolioResponse;
import com.example.demo.entity.Portfolio;
import com.example.demo.entity.PortfolioAsset;
import com.example.demo.entity.User;
import com.example.demo.repo.PortfolioAssetRepository;
import com.example.demo.repo.PortfolioRepository;
import com.example.demo.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final PortfolioAssetRepository assetRepository;
    private final StockService stockService;
    private final UserRepository userRepository;

    @Transactional
    public PortfolioResponse createPortfolio(String username, String name) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        Portfolio portfolio = new Portfolio();
        portfolio.setName(name);
        portfolio.setUser(user);
        portfolio = portfolioRepository.save(portfolio);

        return PortfolioResponse.fromEntity(portfolio);
    }

    public List<PortfolioResponse> getUserPortfolios(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        List<Portfolio> portfolios = portfolioRepository.findByUserId(user.getId());

        return portfolios.stream()
                .map(portfolio -> {
                    // Fetch current prices for all assets
                    for (PortfolioAsset asset : portfolio.getAssets()) {
                        try {
                            Double price = stockService.getCurrentPrice(asset.getTicker());
                            asset.setCurrentPrice(price);
                        } catch (Exception e) {
                            asset.setCurrentPrice(0.0);
                        }
                    }
                    return PortfolioResponse.fromEntity(portfolio);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void addAsset(Long portfolioId, String ticker, Double quantity, String username) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));

        // Check if user owns this portfolio
        if (!portfolio.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Access denied: Portfolio does not belong to user");
        }

        try {
            Double currentPrice = stockService.getCurrentPrice(ticker);

            // Check if asset already exists
            Optional<PortfolioAsset> existingAsset = assetRepository.findByPortfolioIdAndTicker(portfolioId, ticker);

            if (existingAsset.isPresent()) {
                // Update existing asset quantity
                PortfolioAsset asset = existingAsset.get();
                asset.setQuantity(asset.getQuantity() + quantity);
                asset.setCurrentPrice(currentPrice); // Update to latest price
                assetRepository.save(asset);
            } else {
                // Create new asset
                PortfolioAsset asset = new PortfolioAsset();
                asset.setPortfolio(portfolio);
                asset.setTicker(ticker.toUpperCase());
                asset.setQuantity(quantity);
                asset.setCurrentPrice(currentPrice);

                portfolio.getAssets().add(asset);
                portfolioRepository.save(portfolio);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch stock price for " + ticker + ": " + e.getMessage());
        }
    }

    @Transactional
    public void removeAsset(Long portfolioId, String ticker, String username) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));

        // Check if user owns this portfolio
        if (!portfolio.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Access denied: Portfolio does not belong to user");
        }

        PortfolioAsset asset = assetRepository.findByPortfolioIdAndTicker(portfolioId, ticker)
                .orElseThrow(() -> new RuntimeException("Asset not found in portfolio"));

        assetRepository.delete(asset);
    }

    public PortfolioResponse getPortfolioDetails(Long portfolioId, String username) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));

        // Check if user owns this portfolio
        if (!portfolio.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Access denied: Portfolio does not belong to user");
        }

        // Fetch current prices for all assets
        for (PortfolioAsset asset : portfolio.getAssets()) {
            try {
                Double price = stockService.getCurrentPrice(asset.getTicker());
                asset.setCurrentPrice(price);
            } catch (Exception e) {
                asset.setCurrentPrice(0.0);
            }
        }

        return PortfolioResponse.fromEntity(portfolio);
    }
}