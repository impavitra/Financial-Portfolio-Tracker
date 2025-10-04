package com.example.demo.services;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class StockService {
    private static final Logger logger = Logger.getLogger(StockService.class.getName());

    // Mock prices for testing
    private static final Map<String, Double> MOCK_PRICES = new HashMap<>();

    static {
        MOCK_PRICES.put("IBM", 288.37);
        MOCK_PRICES.put("AAPL", 150.25);
        MOCK_PRICES.put("MSFT", 300.75);
        MOCK_PRICES.put("GOOGL", 2800.50);
        MOCK_PRICES.put("TSLA", 250.00);
        MOCK_PRICES.put("AMZN", 3200.00);
        MOCK_PRICES.put("META", 350.75);
        MOCK_PRICES.put("VTI", 220.50);
        MOCK_PRICES.put("SPY", 450.25);
    }

    public Double getCurrentPrice(String ticker) {
        try {
            String upperTicker = ticker.toUpperCase();
            logger.info("Fetching price for ticker: " + upperTicker);

            // Return mock price if available
            if (MOCK_PRICES.containsKey(upperTicker)) {
                Double price = MOCK_PRICES.get(upperTicker);
                logger.info("Returning mock price for " + upperTicker + ": " + price);
                return price;
            }

            // For unknown tickers, return a default price
            logger.warning("Unknown ticker " + upperTicker + ", returning default price");
            return 100.0;

        } catch (Exception e) {
            logger.severe("Error fetching price for " + ticker + ": " + e.getMessage());
            throw new RuntimeException("Failed to fetch price for " + ticker + ": " + e.getMessage());
        }
    }
}