package com.example.demo.dto;

import com.example.demo.entity.PortfolioAsset;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AssetResponse {
    private Long id;
    private String ticker;
    private Double quantity;
    private Double currentPrice;
    private Double totalValue;
    private LocalDateTime addedAt;

    public static AssetResponse fromEntity(PortfolioAsset asset) {
        AssetResponse response = new AssetResponse();
        response.setId(asset.getId());
        response.setTicker(asset.getTicker());
        response.setQuantity(asset.getQuantity());
        response.setCurrentPrice(asset.getCurrentPrice());
        response.setTotalValue(asset.getTotalValue());
        response.setAddedAt(asset.getAddedAt());
        return response;
    }
}
