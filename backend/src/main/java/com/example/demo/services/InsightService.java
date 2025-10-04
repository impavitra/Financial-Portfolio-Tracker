package com.example.demo.services;

import com.example.demo.dto.PortfolioResponse;
import com.example.demo.entity.Portfolio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class InsightService {
    private final PortfolioService portfolioService;

    public Map<String, Object> getInsights(Long portfolioId, String username) {
        PortfolioResponse portfolio = portfolioService.getPortfolioDetails(portfolioId, username);

        int assetCount = portfolio.getAssets().size();
        double totalValue = portfolio.getTotalValue();

        // Calculate diversification score based on number of assets and value
        // distribution
        double diversificationScore = calculateDiversificationScore(portfolio);

        // Generate recommendations based on portfolio analysis
        List<String> recommendations = generateRecommendations(portfolio, diversificationScore);

        // Calculate risk assessment
        String riskLevel = calculateRiskLevel(portfolio);

        // Mock AI-driven insights
        Map<String, Object> insights = new HashMap<>();
        insights.put("diversificationScore", Math.round(diversificationScore * 100.0) / 100.0);
        insights.put("riskLevel", riskLevel);
        insights.put("totalValue", totalValue);
        insights.put("assetCount", assetCount);
        insights.put("recommendations", recommendations);
        insights.put("analysis", generateAnalysis(portfolio));
        insights.put("suggestedAssets", getSuggestedAssets(portfolio));

        return insights;
    }

    private double calculateDiversificationScore(PortfolioResponse portfolio) {
        if (portfolio.getAssets().isEmpty()) {
            return 0.0;
        }

        // Simple diversification score based on number of assets
        // In a real implementation, this would consider sector distribution,
        // correlation, etc.
        int assetCount = portfolio.getAssets().size();
        double baseScore = Math.min(100, assetCount * 15);

        // Bonus for having different types of assets (stocks, ETFs, etc.)
        Set<String> sectors = new HashSet<>();
        portfolio.getAssets().forEach(asset -> {
            // Mock sector classification based on ticker
            if (asset.getTicker().startsWith("AAPL") || asset.getTicker().startsWith("MSFT")) {
                sectors.add("Technology");
            } else if (asset.getTicker().startsWith("JNJ") || asset.getTicker().startsWith("PFE")) {
                sectors.add("Healthcare");
            } else if (asset.getTicker().startsWith("JPM") || asset.getTicker().startsWith("BAC")) {
                sectors.add("Financial");
            } else {
                sectors.add("Other");
            }
        });

        double sectorBonus = sectors.size() * 5;
        return Math.min(100, baseScore + sectorBonus);
    }

    private List<String> generateRecommendations(PortfolioResponse portfolio, double diversificationScore) {
        List<String> recommendations = new ArrayList<>();

        if (diversificationScore < 50) {
            recommendations.add("Consider adding more diverse assets to improve portfolio diversification");
            recommendations.add("Look into ETFs for broad market exposure");
        }

        if (portfolio.getAssets().size() < 3) {
            recommendations.add("Add at least 3-5 different assets for better risk distribution");
        }

        if (portfolio.getTotalValue() < 1000) {
            recommendations.add("Consider increasing your investment amount for better impact");
        }

        if (recommendations.isEmpty()) {
            recommendations.add("Portfolio shows good diversification. Consider rebalancing quarterly");
        }

        return recommendations;
    }

    private String calculateRiskLevel(PortfolioResponse portfolio) {
        if (portfolio.getAssets().isEmpty()) {
            return "Low";
        }

        // Simple risk assessment based on number of assets and total value
        int assetCount = portfolio.getAssets().size();
        double totalValue = portfolio.getTotalValue();

        if (assetCount >= 5 && totalValue >= 10000) {
            return "Low";
        } else if (assetCount >= 3 && totalValue >= 5000) {
            return "Medium";
        } else {
            return "High";
        }
    }

    private Map<String, Object> generateAnalysis(PortfolioResponse portfolio) {
        Map<String, Object> analysis = new HashMap<>();

        if (portfolio.getAssets().isEmpty()) {
            analysis.put("summary", "Empty portfolio - start by adding your first investment");
            analysis.put("strengths", Arrays.asList("Clean slate to build from"));
            analysis.put("weaknesses", Arrays.asList("No diversification", "No returns potential"));
        } else {
            analysis.put("summary", String.format("Portfolio with %d assets worth $%.2f",
                    portfolio.getAssets().size(), portfolio.getTotalValue()));
            analysis.put("strengths", Arrays.asList("Multiple assets for diversification", "Real-time price tracking"));
            analysis.put("weaknesses", Arrays.asList("Limited historical data", "No sector analysis"));
        }

        return analysis;
    }

    private List<String> getSuggestedAssets(PortfolioResponse portfolio) {
        List<String> suggestions = new ArrayList<>();

        // Mock AI suggestions based on current portfolio
        Set<String> currentTickers = new HashSet<>();
        portfolio.getAssets().forEach(asset -> currentTickers.add(asset.getTicker()));

        if (!currentTickers.contains("AAPL")) {
            suggestions.add("AAPL - Apple Inc. (Technology)");
        }
        if (!currentTickers.contains("VTI")) {
            suggestions.add("VTI - Vanguard Total Stock Market ETF (Broad Market)");
        }
        if (!currentTickers.contains("JNJ")) {
            suggestions.add("JNJ - Johnson & Johnson (Healthcare)");
        }
        if (!currentTickers.contains("JPM")) {
            suggestions.add("JPM - JPMorgan Chase & Co. (Financial)");
        }

        return suggestions.subList(0, Math.min(3, suggestions.size()));
    }
}