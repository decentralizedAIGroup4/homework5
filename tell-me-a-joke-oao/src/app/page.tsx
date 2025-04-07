"use client";

import Link from "next/link";
import { Settings, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getProvider, getSigner, getPromptContract } from "../../lib/web3";
import type { JokeSettings } from "@/types/settings";
import { defaultSettings } from "@/types/settings";

const PROMPT_CONTRACT_ADDRESS = "0xYourPromptContractAddress"; // Replace with actual deployed address

export default function Home() {
  const [settings, setSettings] = useState<JokeSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [modelId, setModelId] = useState(1);
  const [fee, setFee] = useState<string | null>(null);
  const [jokeResult, setJokeResult] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);

  const provider = getProvider();
  const signer = getSigner(provider);
  const promptContract = getPromptContract(signer, PROMPT_CONTRACT_ADDRESS);

  // Load settings from localStorage
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      setError(null);

      const savedSettings = localStorage.getItem("jokeSettings");
      if (!savedSettings) {
        console.log("No saved settings found, using defaults");
        setSettings(defaultSettings);
        setIsLoading(false);
        return;
      }

      const parsed = JSON.parse(savedSettings);
      const mergedSettings = {
        topic: parsed.topic || defaultSettings.topic,
        tone: parsed.tone || defaultSettings.tone,
        jokeType: parsed.jokeType || defaultSettings.jokeType,
        temperature: parsed.temperature ?? defaultSettings.temperature,
      };
      console.log("Loaded settings:", mergedSettings);
      setSettings(mergedSettings);
      setPromptText(`Tell me a ${mergedSettings.jokeType} joke about ${mergedSettings.topic} in a ${mergedSettings.tone} tone`);
      setIsLoading(false);
    };

    loadSettings();
  }, []);

  // Estimate fee for the AI request
  async function estimateFee() {
    try {
      const estimatedFee = await promptContract.estimateFee(modelId);
      setFee(ethers.formatEther(estimatedFee)); // Updated from ethers.utils.formatEther
    } catch (error) {
      console.error("Error estimating fee:", error);
      setError("Failed to estimate fee");
    }
  }

  // Request AI-generated joke from the Prompt contract
  async function requestAIResult() {
    setRequestLoading(true);
    setError(null);
    try {
      const feeWei = await promptContract.estimateFee(modelId);
      const tx = await promptContract.calculateAIResult(modelId, promptText, {
        value: feeWei,
      });
      const receipt = await tx.wait();
      const requestId = receipt.events[0].args.requestId.toString();
      console.log(`Request sent! Request ID: ${requestId}`);

      // Poll for result (simulating callback for Hardhat local testing)
      const checkResult = setInterval(async () => {
        const result = await promptContract.prompts(modelId, promptText);
        if (result !== "") {
          setJokeResult(result);
          clearInterval(checkResult);
        }
      }, 2000); // Check every 2 seconds
    } catch (error) {
      console.error("Error requesting AI result:", error);
      setError("Failed to request AI result");
    }
    setRequestLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-amber-900/40">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Tell Me A<span className="text-orange-500"> Joke</span>
        </h1>
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl mx-auto text-white">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading settings...</span>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4 flex items-center gap-2 text-red-400">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Model ID:</label>
                  <input
                    type="number"
                    value={modelId}
                    onChange={(e) => setModelId(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Prompt:</label>
                  <input
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white p-2"
                    placeholder="Enter your joke prompt"
                  />
                </div>
                <div className="flex gap-4">
                  <Button onClick={estimateFee} variant="outline" className="text-white border-white">
                    Estimate Fee
                  </Button>
                  <Button
                    onClick={requestAIResult}
                    disabled={requestLoading}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {requestLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      "Get Joke"
                    )}
                  </Button>
                </div>
                {fee && <p className="text-gray-300">Estimated Fee: {fee} ETH</p>}
                {jokeResult && (
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <p className="text-lg font-semibold">Joke:</p>
                    <p>{jokeResult}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-400">
        <p>Powered by OAO AI • Made with ❤️</p>
      </footer>
    </div>
  );
}