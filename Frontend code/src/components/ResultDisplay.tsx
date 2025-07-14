
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ResultDisplayProps {
  result: {
    sentiment: string;
    confidence: number;
  };
  inputText: string;
}

export const ResultDisplay = ({ result, inputText }: ResultDisplayProps) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE':
        return 'bg-green-500 hover:bg-green-600';
      case 'NEGATIVE':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE':
        return <TrendingUp className="h-4 w-4" />;
      case 'NEGATIVE':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getProgressColor = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE':
        return 'bg-green-500';
      case 'NEGATIVE':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="animate-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Analysis Results
          {getSentimentIcon(result.sentiment)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sentiment Badge */}
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium">Sentiment:</span>
          <Badge className={`${getSentimentColor(result.sentiment)} text-white px-4 py-2 text-lg`}>
            {result.sentiment}
          </Badge>
        </div>

        {/* Confidence Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Confidence Score:</span>
            <span className="text-lg font-bold">{(result.confidence * 100).toFixed(1)}%</span>
          </div>
          <Progress 
            value={result.confidence * 100} 
            className="h-3"
          />
        </div>

        {/* Original Text Preview */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Analyzed Text:</h4>
          <p className="text-sm text-muted-foreground italic">
            "{inputText.length > 200 ? inputText.substring(0, 200) + '...' : inputText}"
          </p>
        </div>

        {/* Interpretation */}
        <div className="bg-card border rounded-lg p-4">
          <h4 className="font-medium mb-2">Interpretation:</h4>
          <p className="text-sm text-muted-foreground">
            {result.sentiment === 'POSITIVE' && 
              "This review expresses positive sentiment. The customer appears satisfied with the product."
            }
            {result.sentiment === 'NEGATIVE' && 
              "This review expresses negative sentiment. The customer appears dissatisfied with the product."
            }
            {result.sentiment === 'NEUTRAL' && 
              "This review expresses neutral sentiment. The customer's opinion is neither clearly positive nor negative."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
