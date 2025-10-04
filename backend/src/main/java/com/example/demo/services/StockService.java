package com.example.demo.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class StockService {
    private static final Logger logger = Logger.getLogger(StockService.class.getName());
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${alpha.vantage.api.key}")
    private String apiKey;

    // Fallback mock prices for testing when API fails
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
            logger.info("Fetching real-time price for ticker: " + upperTicker);

            // Try to fetch from Alpha Vantage API first
            if (apiKey != null && !apiKey.equals("demo")) {
                try {
                    return fetchFromAlphaVantage(upperTicker);
                } catch (Exception e) {
                    logger.warning("Alpha Vantage API failed for " + upperTicker + ", falling back to mock data: "
                            + e.getMessage());
                }
            } else {
                logger.info("Using demo API key, falling back to mock data");
            }

            // Fallback to mock prices
            return getMockPrice(upperTicker);

        } catch (Exception e) {
            logger.severe("Error fetching price for " + ticker + ": " + e.getMessage());
            throw new RuntimeException("Failed to fetch price for " + ticker + ": " + e.getMessage());
        }
    }

    private Double fetchFromAlphaVantage(String ticker) throws Exception {
        String url = String.format(
                "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s",
                ticker, apiKey);

        logger.info("Calling Alpha Vantage API: " + url);
        String response = restTemplate.getForObject(url, String.class);

        if (response == null || response.contains("Error Message") || response.contains("Invalid API call")) {
            throw new RuntimeException("Alpha Vantage API returned error for ticker: " + ticker);
        }

        JsonNode root = objectMapper.readTree(response);
        JsonNode globalQuote = root.get("Global Quote");

        if (globalQuote == null || globalQuote.isNull()) {
            throw new RuntimeException("No data found for ticker: " + ticker);
        }

        JsonNode priceNode = globalQuote.get("05. price");
        if (priceNode == null || priceNode.isNull()) {
            throw new RuntimeException("Price not found in response for ticker: " + ticker);
        }

        double price = priceNode.asDouble();
        logger.info("Successfully fetched price for " + ticker + ": $" + price);
        return price;
    }

    private Double getMockPrice(String ticker) {
        if (MOCK_PRICES.containsKey(ticker)) {
            Double price = MOCK_PRICES.get(ticker);
            logger.info("Returning mock price for " + ticker + ": $" + price);
            return price;
        }

        // For unknown tickers, return a default price
        logger.warning("Unknown ticker " + ticker + ", returning default price");
        return 100.0;
    }

    public Map<String, Object> getStockInfo(String ticker) {
        try {
            String upperTicker = ticker.toUpperCase();
            Map<String, Object> stockInfo = new HashMap<>();

            // Get current price
            stockInfo.put("currentPrice", getCurrentPrice(upperTicker));
            stockInfo.put("ticker", upperTicker);
            stockInfo.put("timestamp", System.currentTimeMillis());

            // If using real API, try to get additional info
            if (apiKey != null && !apiKey.equals("demo")) {
                try {
                    String url = String.format(
                            "https://www.alphavantage.co/query?function=OVERVIEW&symbol=%s&apikey=%s",
                            upperTicker, apiKey);

                    String response = restTemplate.getForObject(url, String.class);
                    if (response != null && !response.contains("Error Message")) {
                        JsonNode root = objectMapper.readTree(response);
                        stockInfo.put("name", root.get("Name").asText());
                        stockInfo.put("sector", root.get("Sector").asText());
                        stockInfo.put("industry", root.get("Industry").asText());
                    }
                } catch (Exception e) {
                    logger.warning("Failed to fetch additional info for " + upperTicker + ": " + e.getMessage());
                }
            }

            return stockInfo;
        } catch (Exception e) {
            logger.severe("Error fetching stock info for " + ticker + ": " + e.getMessage());
            throw new RuntimeException("Failed to fetch stock info for " + ticker + ": " + e.getMessage());
        }
    }
}