package com.example.demo.repo;

import com.example.demo.entity.Portfolio;
import com.example.demo.entity.PortfolioAsset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PortfolioAssetRepository extends JpaRepository<PortfolioAsset, Long> {
    Optional<PortfolioAsset> findByPortfolioIdAndTicker(Long portfolioId, String ticker);
}