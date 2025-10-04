package com.example.demo.dto;

import com.example.demo.entity.Portfolio;
import com.example.demo.entity.PortfolioAsset;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class PortfolioResponse {
    private Long id;
    private String name;
    private Long userId;
    private LocalDateTime createdAt;
    private List<AssetResponse> assets;
    private Double totalValue;

    public static PortfolioResponse fromEntity(Portfolio portfolio) {
        PortfolioResponse response = new PortfolioResponse();
        response.setId(portfolio.getId());
        response.setName(portfolio.getName());
        response.setUserId(portfolio.getUser().getId());
        response.setCreatedAt(portfolio.getCreatedAt());

        List<AssetResponse> assetResponses = portfolio.getAssets().stream()
                .map(AssetResponse::fromEntity)
                .collect(Collectors.toList());
        response.setAssets(assetResponses);

        double totalValue = assetResponses.stream()
                .mapToDouble(AssetResponse::getTotalValue)
                .sum();
        response.setTotalValue(totalValue);

        return response;
    }
}
