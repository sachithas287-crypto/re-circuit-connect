import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Recycle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-elevated border-none">
        <CardContent className="p-8 space-y-6">
          <div className="mx-auto w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center">
            <Recycle className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <h2 className="text-xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-3">
            <Button variant="eco" asChild className="w-full">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Link>
            </Button>
            
            <Button variant="ghost" onClick={() => window.history.back()} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Lost? Visit our <Link to="/contact" className="text-primary hover:underline">contact page</Link> for help.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
