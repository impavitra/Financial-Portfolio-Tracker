import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import { clsx } from "clsx";

export default function PortfolioCard({ portfolio }) {
  const totalValue = portfolio.totalValue || 0;
  const assetCount = portfolio.assets?.length || 0;

  // Calculate day change (mock data - in real app this would come from API)
  const dayChange = Math.random() * 200 - 100; // Random change between -100 and +100
  const dayChangePercent = totalValue > 0 ? (dayChange / totalValue) * 100 : 0;
  const isPositive = dayChange >= 0;

  return (
    <Link
      to={`/portfolio/${portfolio.id}`}
      className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      <div className="card-body">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {portfolio.name}
            </h3>
            <p className="text-sm text-gray-500">
              {assetCount} asset{assetCount !== 1 ? "s" : ""}
            </p>
          </div>
          <BarChart3 className="w-8 h-8 text-primary-600" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Value</span>
            <span className="text-2xl font-bold text-gray-900">
              $
              {totalValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Day Change</span>
            <div
              className={clsx(
                "flex items-center gap-1 text-sm font-medium",
                isPositive ? "text-success-600" : "text-error-600"
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>
                {isPositive ? "+" : ""}${Math.abs(dayChange).toFixed(2)}(
                {isPositive ? "+" : ""}
                {dayChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          {assetCount > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Top Holdings</span>
                <div className="flex -space-x-1">
                  {portfolio.assets.slice(0, 3).map((asset, index) => (
                    <div
                      key={asset.id}
                      className="w-6 h-6 bg-primary-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-primary-700"
                      title={asset.ticker}
                    >
                      {asset.ticker.charAt(0)}
                    </div>
                  ))}
                  {assetCount > 3 && (
                    <div className="w-6 h-6 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                      +{assetCount - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
