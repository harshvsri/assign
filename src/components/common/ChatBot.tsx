import { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { Spinner } from "./Icons";
import { ArrowBigUp } from "lucide-react";

interface ApiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
      role: string;
    };
    finishReason: string;
    index: number;
  }>;
}

export default function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isJson, setIsJson] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const handleUserInput = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    setResponse("");
    setIsJson(false);

    try {
      const res = await axios.post<ApiResponse>(
        apiUrl,
        {
          contents: [
            {
              parts: [
                {
                  text: userInput,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = res.data.candidates[0].content.parts[0].text;
      setUserInput("");
      setResponse(aiResponse);

      // Check if the response is valid JSON
      try {
        JSON.parse(aiResponse);
        setIsJson(true);
      } catch (e) {
        console.log(e);
        setIsJson(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError("API Error: " + err.response.data.error.message);
      } else if (axios.isAxiosError(err) && err.request) {
        setError("Network error: Please check your internet connection.");
      } else {
        setError("Error: " + (err as Error).message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          AssignGPT
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUserInput} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask something about AI..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : <ArrowBigUp />}
            </Button>
          </div>
        </form>

        {response && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">AI Response:</h2>
            <div className="text-gray-700 dark:text-gray-300 prose dark:prose-invert h-fit overflow-y-auto break-words whitespace-pre-wrap">
              {isJson ? (
                <JSONPretty
                  id="json-pretty"
                  data={JSON.parse(response)}
                ></JSONPretty>
              ) : (
                <ReactMarkdown>{response}</ReactMarkdown>
              )}
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
