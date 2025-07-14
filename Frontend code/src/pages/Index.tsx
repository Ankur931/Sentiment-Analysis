
import { SentimentAnalyzer } from "@/components/SentimentAnalyzer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Sentiment Analysis App</h1>
          <p className="text-xl opacity-90">
            Enter a product review and get instant sentiment analysis
          </p>
          <p className="text-lg opacity-80 mt-2">
            Our model predicts whether reviews are POSITIVE or NEGATIVE
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <SentimentAnalyzer />
      </div>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Powered by advanced sentiment analysis algorithms</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
