import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePortfolio } from "../contexts/PortfolioContext";
import { portfolioAPI } from "../services/api";
import Header from "../components/Header";
import AssetTable from "../components/AssetTable";
import PortfolioChart from "../components/PortfolioChart";
import AddAssetModal from "../components/AddAssetModal";
import InsightsPanel from "../components/InsightsPanel";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  ArrowLeft,
  Plus,
  TrendingUp,
  DollarSign,
  BarChart3,
  Lightbulb,
  AlertCircle,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Portfolio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addAsset, removeAsset } = usePortfolio();

  const [portfolio, setPortfolio] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioData();
  }, [id]);

  const fetchPortfolioData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await portfolioAPI.getPortfolio(id);
      setPortfolio(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch portfolio");
    } finally {
      setLoading(false);
    }
  };

  const fetchInsights = async () => {
    setInsightsLoading(true);
    try {
      const response = await portfolioAPI.getInsights(id);
      setInsights(response.data);
      setShowInsightsModal(true);
    } catch (err) {
      toast.error("Failed to fetch insights");
    } finally {
      setInsightsLoading(false);
    }
  };

  const handleAddAsset = async (portfolioId, ticker, quantity) => {
    try {
      await addAsset(portfolioId, ticker, quantity);
      // Refresh portfolio data
      await fetchPortfolioData();
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveAsset = async (ticker) => {
    try {
      await removeAsset(id, ticker);
      // Refresh portfolio data
      await fetchPortfolioData();
    } catch (error) {
      toast.error("Failed to remove asset");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-error-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Portfolio Not Found
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-primary"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const assets = portfolio?.assets || [];
  const totalValue = portfolio?.totalValue || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {portfolio?.name}
              </h1>
              <p className="text-gray-600">
                {assets.length} asset{assets.length !== 1 ? "s" : ""} • Created{" "}
                {new Date(portfolio?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchInsights}
              disabled={insightsLoading}
              className="btn btn-secondary"
            >
              {insightsLoading ? (
                <div className="loading-spinner w-4 h-4" />
              ) : (
                <Lightbulb className="w-4 h-4" />
              )}
              Get Insights
            </button>
            <button
              onClick={() => setShowAddAssetModal(true)}
              className="btn btn-primary"
            >
              <Plus className="w-4 h-4" />
              Add Asset
            </button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Value
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    $
                    {totalValue.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="p-2 bg-success-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-success-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Assets
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {assets.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="p-2 bg-warning-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-warning-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Avg. Value
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    $
                    {assets.length > 0
                      ? (totalValue / assets.length).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <AssetTable
            assets={assets}
            onRemoveAsset={handleRemoveAsset}
            loading={loading}
          />

          {assets.length > 0 && (
            <PortfolioChart assets={assets} type="doughnut" />
          )}
        </div>
      </div>

      {/* Add Asset Modal */}
      <AddAssetModal
        isOpen={showAddAssetModal}
        onClose={() => setShowAddAssetModal(false)}
        onAddAsset={handleAddAsset}
        portfolioId={id}
      />

      {/* Insights Modal */}
      {showInsightsModal && insights && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-primary-600" />
                Portfolio Insights
              </h2>
              <button
                onClick={() => setShowInsightsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 min-h-0">
              <InsightsPanel insights={insights} />
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={() => setShowInsightsModal(false)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowInsightsModal(false);
                  fetchInsights();
                }}
                className="btn btn-primary"
              >
                Refresh Insights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
