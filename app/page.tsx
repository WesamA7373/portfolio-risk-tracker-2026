"use client";

import { supabase } from '../lib/supabaseConfig'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PortfolioForm from "./components/PortfolioForm";
import ResultsDashboard from "./components/ResultsDashboard";
import GuestSignupModal from "./components/GuestSignupModal";
import {
  PortfolioAsset,
  DiversificationResult,
  calculatePortfolioDiversification,
} from "@/lib/portfolioCalculations";

type AppState = "form" | "results" | "guest-view";

// Validation function for PortfolioAsset
const validateAssets = (assets: unknown): assets is PortfolioAsset[] => {
  if (!Array.isArray(assets) || assets.length === 0) {
    return false; // Must have at least one asset
  }
  return assets.every(
    (asset) =>
      typeof asset === "object" &&
      asset !== null &&
      typeof asset.name === "string" &&
      asset.name.trim().length > 0 &&
      typeof asset.allocation === "number" &&
      asset.allocation > 0 &&
      asset.allocation <= 100 &&
      typeof asset.riskLevel === "string" &&
      ["low", "medium", "high"].includes(asset.riskLevel)
  );
};

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<AppState>("form");
  const [results, setResults] = useState<DiversificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*");

        if (error) {
          console.error("Error fetching users:", error.message);
          return;
        }

        // Validate data structure
        if (!Array.isArray(data)) {
          console.error("Invalid users data received");
          return;
        }

        console.log("Users fetched successfully:", data);
      } catch (err) {
        console.error("Exception fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleFormSubmit = async (assets: PortfolioAsset[]) => {
    // Validate input
    if (!assets || assets.length === 0) {
      alert("Please add at least one asset to your portfolio.");
      return;
    }

    if (!validateAssets(assets)) {
      alert("Please check your portfolio data:\n- All fields must be filled\n- Allocations must be between 0-100%\n- Risk levels must be Low, Medium, or High");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    try {
      const calculatedResults = calculatePortfolioDiversification(assets);
      setResults(calculatedResults);
      setState("results");
    } catch (error) {
      console.error("Error calculating portfolio:", error);
      alert("An error occurred while analyzing your portfolio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    setState("guest-view");
  };

  const handleSignUp = () => {
    if (!results) {
      router.push("/auth/signup");
      return;
    }

    try {
      // Validate before storing
      const serialized = JSON.stringify(results);
      if (serialized.length > 1000000) {
        // Prevent storing excessively large data
        console.error("Portfolio data too large to store");
        alert("Portfolio data is too large to save. Please try again.");
        return;
      }
      localStorage.setItem("pending_portfolio", serialized);
    } catch (error) {
      console.error("Error storing portfolio data:", error);
      alert("Unable to save your portfolio. Please try again.");
      return;
    }

    router.push("/auth/signup");
  };

  const handleReset = () => {
    setState("form");
    setResults(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Portfolio Risk Tracker
          </h1>
          <p className="text-lg text-gray-700">
            Understand your portfolio diversification and get actionable insights
          </p>
        </div>

        {!mounted ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center text-gray-500">Loading...</div>
          </div>
        ) : (
          <>
            {/* Form Step */}
            {state === "form" && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <PortfolioForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              </div>
            )}

            {/* Results with Modal */}
            {(state === "results" || state === "guest-view") && results && (
              <div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <ResultsDashboard results={results} />

                  <button
                    onClick={handleReset}
                    className="mt-8 w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 rounded-lg transition"
                  >
                    Analyze Another Portfolio
                  </button>
                </div>

                {state === "results" && (
                  <GuestSignupModal
                    results={results}
                    onContinueAsGuest={handleContinueAsGuest}
                    onSignUp={handleSignUp}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
