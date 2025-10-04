import {
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { clsx } from "clsx";

export default function InsightsPanel({ insights }) {
  if (!insights) return null;

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case "low":
        return "text-success-600 bg-success-50";
      case "medium":
        return "text-warning-600 bg-warning-50";
      case "high":
        return "text-error-600 bg-error-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getDiversificationColor = (score) => {
    if (score >= 80) return "text-success-600";
    if (score >= 60) return "text-warning-600";
    return "text-error-600";
  };

  return (
    <div className="space-y-4">
      {/* Diversification Score */}
      <div className="card">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Diversification Score
          </h3>
        </div>
        <div className="p-4">
          <div className="text-center">
            <div
              className={clsx(
                "text-4xl font-bold mb-2",
                getDiversificationColor(insights.diversificationScore)
              )}
            >
              {insights.diversificationScore}/100
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className={clsx(
                  "h-3 rounded-full transition-all duration-500",
                  insights.diversificationScore >= 80
                    ? "bg-success-500"
                    : insights.diversificationScore >= 60
                    ? "bg-warning-500"
                    : "bg-error-500"
                )}
                style={{ width: `${insights.diversificationScore}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {insights.diversificationScore >= 80
                ? "Excellent diversification"
                : insights.diversificationScore >= 60
                ? "Good diversification"
                : "Consider adding more diverse assets"}
            </p>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="card">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Risk Assessment
          </h3>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Risk Level</span>
            <span
              className={clsx(
                "px-3 py-1 rounded-full text-sm font-medium",
                getRiskColor(insights.riskLevel)
              )}
            >
              {insights.riskLevel}
            </span>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {insights.riskLevel?.toLowerCase() === "low" &&
              "Your portfolio shows low risk with good diversification and stable assets."}
            {insights.riskLevel?.toLowerCase() === "medium" &&
              "Your portfolio has moderate risk. Consider balancing growth and stability."}
            {insights.riskLevel?.toLowerCase() === "high" &&
              "Your portfolio has high risk. Consider diversifying to reduce volatility."}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {insights.recommendations && insights.recommendations.length > 0 && (
        <div className="card">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              AI Recommendations
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {insights.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Suggested Assets */}
      {insights.suggestedAssets && insights.suggestedAssets.length > 0 && (
        <div className="card">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Suggested Assets
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {insights.suggestedAssets.map((asset, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{asset}</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analysis Summary */}
      {insights.analysis && (
        <div className="card">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Portfolio Analysis
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                <p className="text-sm text-gray-600">
                  {insights.analysis.summary}
                </p>
              </div>

              {insights.analysis.strengths &&
                insights.analysis.strengths.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-success-500" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {insights.analysis.strengths.map((strength, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <span className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {insights.analysis.weaknesses &&
                insights.analysis.weaknesses.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1 text-warning-500" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-1">
                      {insights.analysis.weaknesses.map((weakness, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <span className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
