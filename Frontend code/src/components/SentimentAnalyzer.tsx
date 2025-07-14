
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultDisplay } from "./ResultDisplay";
import { Loader2 } from "lucide-react";

export const SentimentAnalyzer = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<{ sentiment: string; confidence: number } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock sentiment analysis function (replaces the Python ML model)
  const analyzeSentiment = (text: string) => {
    // Simple keyword-based sentiment analysis for demo purposes
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'wonderful', 'fantastic', 'awesome', 'best', 'impressed', 'satisfied', 'happy', 'pleased'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disgusting', 'disappointed', 'poor', 'useless', 'broken', 'failed', 'angry'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveScore = 0;
    let negativeScore = 0;
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveScore++;
      if (negativeWords.some(nw => word.includes(nw))) negativeScore++;
    });
    
    const totalScore = positiveScore + negativeScore;
    if (totalScore === 0) {
      return { sentiment: 'NEUTRAL', confidence: 0.5 };
    }
    
    const confidence = Math.max(positiveScore, negativeScore) / totalScore;
    const sentiment = positiveScore > negativeScore ? 'POSITIVE' : 'NEGATIVE';
    
    return { sentiment, confidence: Math.min(0.95, 0.6 + confidence * 0.35) };
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysis = analyzeSentiment(inputText);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Enter Product Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your product review here... (e.g., 'This product is amazing! Great quality and fast delivery.')"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px] text-base"
          />
          <div className="flex gap-3">
            <Button 
              onClick={handleAnalyze} 
              disabled={!inputText.trim() || isAnalyzing}
              className="flex-1 sm:flex-initial"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Sentiment'
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClear}
              disabled={isAnalyzing}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && <ResultDisplay result={result} inputText={inputText} />}
    </div>
  );
};
