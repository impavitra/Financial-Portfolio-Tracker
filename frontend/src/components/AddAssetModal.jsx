import { useState } from "react";
import { X, Search, Plus } from "lucide-react";
import { stockAPI } from "../services/api";
import toast from "react-hot-toast";

export default function AddAssetModal({
  isOpen,
  onClose,
  onAddAsset,
  portfolioId,
}) {
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [stockInfo, setStockInfo] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSearch = async () => {
    if (!ticker.trim()) {
      setErrors({ ticker: "Please enter a ticker symbol" });
      return;
    }

    setSearching(true);
    setErrors({});

    try {
      const response = await stockAPI.getStockInfo(ticker.toUpperCase());
      setStockInfo(response.data);
      setErrors({});
    } catch (error) {
      setErrors({ ticker: "Stock not found or API error" });
      setStockInfo(null);
    } finally {
      setSearching(false);
    }
  };

  const handleAddAsset = async () => {
    if (!ticker.trim() || !quantity) {
      setErrors({
        ticker: !ticker.trim() ? "Please enter a ticker symbol" : "",
        quantity: !quantity ? "Please enter a quantity" : "",
      });
      return;
    }

    if (isNaN(quantity) || parseFloat(quantity) <= 0) {
      setErrors({ quantity: "Please enter a valid quantity" });
      return;
    }

    setLoading(true);

    try {
      await onAddAsset(portfolioId, ticker.toUpperCase(), parseFloat(quantity));
      toast.success("Asset added successfully!");
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add asset");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTicker("");
    setQuantity("");
    setStockInfo(null);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Asset</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Ticker Search */}
          <div className="form-group">
            <label className="form-label">Stock Symbol</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                placeholder="e.g., AAPL, MSFT, GOOGL"
                className={`form-input flex-1 ${errors.ticker ? "error" : ""}`}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={searching}
                className="btn btn-secondary"
              >
                {searching ? (
                  <div className="loading-spinner w-4 h-4" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.ticker && <p className="form-error">{errors.ticker}</p>}
          </div>

          {/* Stock Info Display */}
          {stockInfo && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">
                {stockInfo.name || stockInfo.ticker}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Symbol:</span>
                  <span className="ml-2 font-medium">{stockInfo.ticker}</span>
                </div>
                <div>
                  <span className="text-gray-600">Price:</span>
                  <span className="ml-2 font-medium">
                    ${stockInfo.currentPrice?.toFixed(2) || "N/A"}
                  </span>
                </div>
                {stockInfo.sector && (
                  <div className="col-span-2">
                    <span className="text-gray-600">Sector:</span>
                    <span className="ml-2 font-medium">{stockInfo.sector}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quantity Input */}
          <div className="form-group">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter number of shares"
              step="0.01"
              min="0.01"
              className={`form-input ${errors.quantity ? "error" : ""}`}
            />
            {errors.quantity && <p className="form-error">{errors.quantity}</p>}
          </div>

          {/* Total Value Preview */}
          {stockInfo &&
            quantity &&
            !isNaN(quantity) &&
            parseFloat(quantity) > 0 && (
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Value:</span>
                  <span className="text-lg font-semibold text-primary-700">
                    $
                    {(stockInfo.currentPrice * parseFloat(quantity)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button onClick={handleClose} className="btn btn-secondary">
            Cancel
          </button>
          <button
            onClick={handleAddAsset}
            disabled={loading || !stockInfo || !quantity}
            className="btn btn-primary"
          >
            {loading ? (
              <div className="loading-spinner w-4 h-4" />
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Asset
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
