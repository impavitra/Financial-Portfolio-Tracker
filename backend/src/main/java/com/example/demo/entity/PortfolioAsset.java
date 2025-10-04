package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "portfolio_assets")
@Getter
@Setter
@ToString(exclude = { "portfolio" })
public class PortfolioAsset {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "portfolio_id", nullable = false)
	private Portfolio portfolio;

	@NotBlank(message = "Ticker symbol is required")
	@Size(max = 10, message = "Ticker symbol must not exceed 10 characters")
	private String ticker;

	@NotNull(message = "Quantity is required")
	@Positive(message = "Quantity must be positive")
	private Double quantity;

	@Positive(message = "Current price must be positive")
	private Double currentPrice;

	@Column(name = "added_at", nullable = false, updatable = false)
	private LocalDateTime addedAt = LocalDateTime.now();

	@Transient
	public Double getTotalValue() {
		return quantity != null && currentPrice != null
				? quantity * currentPrice
				: 0.0;
	}
}