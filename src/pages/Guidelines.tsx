import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Laptop, 
  Battery, 
  Headphones, 
  Camera, 
  Printer,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Guidelines = () => {
  const deviceCategories = [
    {
      icon: Smartphone,
      name: "Mobile Devices",
      items: ["Smartphones", "Tablets", "E-readers", "Smart watches"],
      accepted: ["Remove personal data", "Include chargers if available", "Any condition accepted"],
      notAccepted: ["Water-damaged devices leaking", "Devices with swollen batteries"],
      preparation: [
        "Back up your data",
        "Sign out of all accounts",
        "Perform factory reset",
        "Remove SIM card and memory cards"
      ]
    },
    {
      icon: Laptop,
      name: "Computers & Laptops",
      items: ["Laptops", "Desktop computers", "Monitors", "Keyboards", "Mice"],
      accepted: ["All brands and conditions", "Include power cables", "Hard drives will be securely wiped"],
      notAccepted: ["CRT monitors with damaged screens", "Devices with hazardous material leaks"],
      preparation: [
        "Back up important files",
        "Sign out of all cloud services",
        "Remove personal stickers/labels",
        "Include original packaging if available"
      ]
    },
    {
      icon: Battery,
      name: "Batteries",
      items: ["Lithium-ion", "Nickel-metal hydride", "Lead-acid", "Alkaline"],
      accepted: ["Rechargeable batteries", "Car batteries", "UPS batteries"],
      notAccepted: ["Damaged/leaking batteries", "Unknown battery types"],
      preparation: [
        "Tape battery terminals",
        "Keep batteries dry",
        "Separate by type if possible",
        "Bring in original containers"
      ]
    },
    {
      icon: Headphones,
      name: "Audio/Video",
      items: ["Headphones", "Speakers", "Cameras", "Gaming consoles"],
      accepted: ["All electronic entertainment devices", "Include accessories"],
      notAccepted: ["Items with visible damage to internal components"],
      preparation: [
        "Remove memory cards",
        "Include charging cables",
        "Clear personal media",
        "Reset to factory settings"
      ]
    },
    {
      icon: Printer,
      name: "Office Equipment",
      items: ["Printers", "Scanners", "Fax machines", "Copiers"],
      accepted: ["All office electronics", "Include power cords"],
      notAccepted: ["Devices with toner/ink spills"],
      preparation: [
        "Remove ink/toner cartridges",
        "Clear paper jams",
        "Wipe down exterior",
        "Include user manuals if available"
      ]
    },
    {
      icon: Camera,
      name: "Photography",
      items: ["Digital cameras", "Camcorders", "Lenses", "Tripods"],
      accepted: ["Professional and consumer grade", "Include cases and accessories"],
      notAccepted: ["Film cameras (non-electronic)", "Severely damaged equipment"],
      preparation: [
        "Remove memory cards",
        "Charge batteries for testing",
        "Include original accessories",
        "Clear all personal photos"
      ]
    }
  ];

  const safetyTips = [
    {
      icon: AlertTriangle,
      title: "Data Security",
      description: "Always backup and wipe personal data before disposal",
      level: "critical"
    },
    {
      icon: Battery,
      title: "Battery Safety",
      description: "Handle swollen or damaged batteries with extreme care",
      level: "warning"
    },
    {
      icon: CheckCircle,
      title: "Original Packaging",
      description: "Use original boxes when possible for safe transport",
      level: "tip"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      case 'tip': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface py-8">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            E-Waste Disposal Guidelines
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to properly prepare and dispose of your electronic devices safely and responsibly
          </p>
        </div>

        {/* Safety Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Important Safety Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {safetyTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        tip.level === 'critical' ? 'bg-destructive/10' :
                        tip.level === 'warning' ? 'bg-warning/10' :
                        'bg-success/10'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          tip.level === 'critical' ? 'text-destructive' :
                          tip.level === 'warning' ? 'text-warning' :
                          'text-success'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Device Categories */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground">Device Categories & Guidelines</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {deviceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="border-none shadow-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-eco rounded-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span>{category.name}</span>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {category.items.map((item, itemIndex) => (
                          <Badge key={itemIndex} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Preparation Steps */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 text-success mr-2" />
                        Preparation Steps
                      </h4>
                      <ul className="space-y-2">
                        {category.preparation.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What's Accepted */}
                    <div>
                      <h4 className="font-semibold text-success mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        What We Accept
                      </h4>
                      <ul className="space-y-1">
                        {category.accepted.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-muted-foreground">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What's Not Accepted */}
                    <div>
                      <h4 className="font-semibold text-destructive mb-3 flex items-center">
                        <XCircle className="w-4 h-4 mr-2" />
                        Not Accepted
                      </h4>
                      <ul className="space-y-1">
                        {category.notAccepted.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-muted-foreground">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-16">
          <Card className="bg-gradient-eco text-white border-none shadow-elevated">
            <CardContent className="text-center py-12 px-8">
              <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Download our comprehensive e-waste guide or contact our support team for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Guide
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                  <Link to="/contact">
                    Contact Support
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Button variant="eco" size="lg" asChild>
            <Link to="/pickup">
              Ready to Schedule Pickup?
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;