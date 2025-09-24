import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  MapPin, 
  Award, 
  BarChart3, 
  Smartphone, 
  Laptop, 
  Battery,
  Users,
  Recycle,
  Leaf,
  ArrowRight
} from 'lucide-react';
import heroImage from '@/assets/hero-ewaste.jpg';

const Home = () => {
  const stats = [
    { icon: Recycle, value: '50,000+', label: 'Devices Recycled' },
    { icon: Users, value: '10,000+', label: 'Active Users' },
    { icon: Leaf, value: '25 Tons', label: 'CO2 Saved' },
    { icon: Award, value: '500+', label: 'Rewards Given' },
  ];

  const features = [
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Book pickup or drop-off appointments with just a few clicks',
      link: '/pickup',
    },
    {
      icon: MapPin,
      title: 'Find Centers',
      description: 'Locate nearby recycling centers on our interactive map',
      link: '/pickup',
    },
    {
      icon: BarChart3,
      title: 'Track Impact',
      description: 'Monitor your environmental contributions and earned rewards',
      link: '/dashboard',
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Get points, coupons, and certificates for responsible recycling',
      link: '/dashboard',
    },
  ];

  const deviceTypes = [
    { icon: Smartphone, name: 'Smartphones', count: '15,000+' },
    { icon: Laptop, name: 'Laptops', count: '8,500+' },
    { icon: Battery, name: 'Batteries', count: '25,000+' },
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Responsible 
                  <span className="text-primary"> E-Waste</span>
                  <br />
                  Management
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Turn your electronic waste into environmental impact. 
                  Schedule pickups, earn rewards, and help build a sustainable future.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="eco" size="lg" asChild>
                  <Link to="/pickup" className="flex items-center">
                    Schedule Pickup
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="eco-outline" size="lg" asChild>
                  <Link to="/guidelines">View Guidelines</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-lg font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <img 
                src={heroImage} 
                alt="E-waste recycling and management" 
                className="rounded-2xl shadow-elevated w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-eco opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How ReCircuit Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, efficient, and rewarding e-waste management for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-elevated transition-all duration-300 border-none shadow-card">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="mb-4">
                      {feature.description}
                    </CardDescription>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={feature.link} className="text-primary">
                        Learn More →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Device Types Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What We Recycle
            </h2>
            <p className="text-xl text-muted-foreground">
              From smartphones to laptops, we handle all types of electronic devices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {deviceTypes.map((device, index) => {
              const Icon = device.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-card">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{device.name}</h3>
                  <p className="text-2xl font-bold text-primary">{device.count}</p>
                  <p className="text-sm text-muted-foreground">Recycled to date</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button variant="eco" size="lg" asChild>
              <Link to="/guidelines">
                See Full Guidelines
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <Card className="bg-gradient-eco text-white border-none shadow-elevated">
            <CardContent className="text-center py-16 px-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already contributing to a cleaner, 
                more sustainable future through responsible e-waste management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/pickup">
                    Schedule Your First Pickup
                    <Calendar className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                  <Link to="/dashboard">View Impact Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;