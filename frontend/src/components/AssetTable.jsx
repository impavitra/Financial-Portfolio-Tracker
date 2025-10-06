import { useState } from "react";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { clsx } from "clsx";

export default function AssetTable({ assets, onRemoveAsset, loading = false }) {
  const [removingAsset, setRemovingAsset] = useState(null);

  const handleRemoveAsset = async (ticker) => {
    setRemovingAsset(ticker);
    try {
      await onRemoveAsset(ticker);
    } finally {
      setRemovingAsset(null);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="skeleton w-16 h-4 rounded"></div>
                <div className="skeleton w-20 h-4 rounded"></div>
                <div className="skeleton w-24 h-4 rounded"></div>
                <div className="skeleton w-20 h-4 rounded"></div>
                <div className="skeleton w-16 h-4 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!assets || assets.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No assets in this portfolio
          </h3>
          <p className="text-gray-500">
            Add your first stock or ETF to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-gray-900">
          Portfolio Assets
        </h3>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Day Change
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset) => {
              const totalValue = asset.totalValue || 0;
              // Mock day change data
              const dayChange = Math.random() * 20 - 10;
              const dayChangePercent =
                asset.currentPrice > 0
                  ? (dayChange / asset.currentPrice) * 100
                  : 0;
              const isPositive = dayChange >= 0;

              return (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-primary-700">
                          {asset.ticker.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {asset.ticker}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${asset.currentPrice?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${totalValue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={clsx(
                        "flex items-center text-sm",
                        isPositive ? "text-success-600" : "text-error-600"
                      )}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      <span>
                        {isPositive ? "+" : ""}${Math.abs(dayChange).toFixed(2)}
                        ({isPositive ? "+" : ""}
                        {dayChangePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleRemoveAsset(asset.ticker)}
                      disabled={removingAsset === asset.ticker}
                      className="text-error-600 hover:text-error-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {removingAsset === asset.ticker ? (
                        <div className="loading-spinner w-4 h-4" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <div className="space-y-3 p-4">
          {assets.map((asset) => {
            const totalValue = asset.totalValue || 0;
            // Mock day change data
            const dayChange = Math.random() * 20 - 10;
            const dayChangePercent =
              asset.currentPrice > 0
                ? (dayChange / asset.currentPrice) * 100
                : 0;
            const isPositive = dayChange >= 0;

            return (
              <div key={asset.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-primary-700">
                        {asset.ticker.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {asset.ticker}
                      </div>
                      <div className="text-sm text-gray-500">
                        {asset.quantity} shares
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveAsset(asset.ticker)}
                    disabled={removingAsset === asset.ticker}
                    className="text-error-600 hover:text-error-900 disabled:opacity-50 disabled:cursor-not-allowed p-1"
                  >
                    {removingAsset === asset.ticker ? (
                      <div className="loading-spinner w-4 h-4" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Current Price</div>
                    <div className="font-medium text-gray-900">
                      ${asset.currentPrice?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Total Value</div>
                    <div className="font-medium text-gray-900">
                      ${totalValue.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Day Change</span>
                    <div
                      className={clsx(
                        "flex items-center text-sm font-medium",
                        isPositive ? "text-success-600" : "text-error-600"
                      )}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      <span>
                        {isPositive ? "+" : ""}${Math.abs(dayChange).toFixed(2)}
                        ({isPositive ? "+" : ""}
                        {dayChangePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
