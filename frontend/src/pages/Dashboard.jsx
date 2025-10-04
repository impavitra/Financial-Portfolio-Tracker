import { useState, useEffect } from "react";
import { usePortfolio } from "../contexts/PortfolioContext";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import PortfolioCard from "../components/PortfolioCard";
import CreatePortfolioModal from "../components/CreatePortfolioModal";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  Plus,
  TrendingUp,
  DollarSign,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const { portfolios, loading, error, fetchPortfolios, createPortfolio } =
    usePortfolio();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleCreatePortfolio = async (name) => {
    try {
      await createPortfolio(name);
      toast.success("Portfolio created successfully!");
      setShowCreateModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create portfolio"
      );
    }
  };

  // Calculate total portfolio value
  const totalValue = portfolios.reduce(
    (sum, portfolio) => sum + (portfolio.totalValue || 0),
    0
  );
  const totalAssets = portfolios.reduce(
    (sum, portfolio) => sum + (portfolio.assets?.length || 0),
    0
  );

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600">
            Manage your investment portfolios and track your financial growth.
          </p>
        </div>

        {/* Stats Overview */}
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
                    {totalAssets}
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
                    Portfolios
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {portfolios.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolios Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Portfolios
            </h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              <Plus className="w-4 h-4" />
              Create Portfolio
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-error-50 border border-error-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-error-600 mr-2" />
                <p className="text-error-800">{error}</p>
              </div>
            </div>
          )}

          {portfolios.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No portfolios yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first portfolio to start tracking your investments.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4" />
                Create Your First Portfolio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.id} portfolio={portfolio} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {portfolios.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <TrendingUp className="w-5 h-5 text-primary-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">View Analytics</p>
                    <p className="text-sm text-gray-500">
                      Check portfolio performance
                    </p>
                  </div>
                </button>

                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <BarChart3 className="w-5 h-5 text-success-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Add Assets</p>
                    <p className="text-sm text-gray-500">Buy stocks and ETFs</p>
                  </div>
                </button>

                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <DollarSign className="w-5 h-5 text-warning-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      Track Performance
                    </p>
                    <p className="text-sm text-gray-500">Monitor your gains</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Portfolio Modal */}
      <CreatePortfolioModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePortfolio={handleCreatePortfolio}
      />
    </div>
  );
}
