import { Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export default function PortfolioChart({ assets, type = "pie" }) {
  if (!assets || assets.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No data to display
          </h3>
          <p className="text-gray-500">
            Add assets to your portfolio to see the allocation chart.
          </p>
        </div>
      </div>
    );
  }

  // Calculate total value
  const totalValue = assets.reduce(
    (sum, asset) => sum + (asset.totalValue || 0),
    0
  );

  // Prepare chart data
  const chartData = {
    labels: assets.map((asset) => asset.ticker),
    datasets: [
      {
        data: assets.map((asset) => asset.totalValue || 0),
        backgroundColor: [
          "#0ea5e9", // primary-500
          "#22c55e", // success-500
          "#f59e0b", // warning-500
          "#ef4444", // error-500
          "#8b5cf6", // purple-500
          "#06b6d4", // cyan-500
          "#f97316", // orange-500
          "#84cc16", // lime-500
          "#ec4899", // pink-500
          "#6b7280", // gray-500
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const percentage = ((value / totalValue) * 100).toFixed(1);
            return `${context.label}: $${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  const ChartComponent = type === "doughnut" ? Doughnut : Pie;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-gray-900">
          Portfolio Allocation
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Asset distribution by value
        </p>
      </div>
      <div className="card-body">
        <div className="h-80">
          <ChartComponent data={chartData} options={options} />
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Assets:</span>
              <span className="ml-2 font-medium">{assets.length}</span>
            </div>
            <div>
              <span className="text-gray-600">Total Value:</span>
              <span className="ml-2 font-medium">
                $
                {totalValue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
