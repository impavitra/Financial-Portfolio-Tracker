import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function CreatePortfolioModal({
  isOpen,
  onClose,
  onCreatePortfolio,
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Portfolio name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onCreatePortfolio(name.trim());
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Portfolio
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="form-group">
            <label className="form-label">Portfolio Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g., My Tech Portfolio, Retirement Fund"
              className={`form-input ${error ? "error" : ""}`}
              autoFocus
            />
            {error && <p className="form-error">{error}</p>}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="btn btn-primary"
            >
              {loading ? (
                <div className="loading-spinner w-4 h-4" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Portfolio
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
