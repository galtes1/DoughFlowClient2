import { useState } from "react";
import axios from "axios";


const apiUrl = "https://localhost:7267/api/gpt/analyze-user-budget";

const useGptAnalysis = (id) => {
  const [gptLoading, setGptLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState("");
  const [gptError, setGptError] = useState(null);
  
  
  const askGpt = async (userId) => {
    setGptLoading(true);
    setGptError(null);

    try {
      const { data } = await axios.post(`${apiUrl}/${userId}`);      
      setGptResponse(data.response);
    } catch (error) {
      console.error("GPT request failed:", error);
      setGptError("Failed to get GPT response");
    } finally {
      setGptLoading(false);
    }
  };

  return { askGpt, gptLoading, gptResponse, gptError };
};

export default useGptAnalysis;
