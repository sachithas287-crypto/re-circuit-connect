import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Package, 
  Truck,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Pickup = () => {
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    date: '',
    time: '',
    deviceType: '',
    quantity: '',
    notes: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pickup Scheduled!",
      description: "We'll send you a confirmation email shortly.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nearbyLocations = [
    { name: "Green Tech Center", address: "123 Eco Street", distance: "2.3 miles", hours: "Mon-Sat 9AM-6PM" },
    { name: "Sustainable Solutions", address: "456 Recycle Ave", distance: "3.1 miles", hours: "Daily 8AM-8PM" },
    { name: "EcoPoint Recycling", address: "789 Planet Blvd", distance: "4.5 miles", hours: "Mon-Fri 10AM-7PM" },
  ];

  const deviceTypes = [
    "Smartphones & Tablets",
    "Laptops & Computers",
    "Batteries",
    "Cables & Chargers",
    "Small Appliances",
    "Other Electronic Devices"
  ];

  return (
    <div className="min-h-screen bg-gradient-surface py-8">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Schedule E-Waste Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose between convenient pickup service or find a nearby drop-off location
          </p>
        </div>

        <Tabs defaultValue="pickup" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="pickup" className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Schedule Pickup</span>
            </TabsTrigger>
            <TabsTrigger value="dropoff" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Find Drop-off</span>
            </TabsTrigger>
          </TabsList>

          {/* Pickup Tab */}
          <TabsContent value="pickup">
            <Card className="shadow-elevated border-none">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Schedule Home Pickup</span>
                </CardTitle>
                <CardDescription>
                  We'll come to your location to collect your e-waste safely and responsibly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deviceType">Device Type *</Label>
                      <Select value={formData.deviceType} onValueChange={(value) => handleChange('deviceType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select device type" />
                        </SelectTrigger>
                        <SelectContent>
                          {deviceTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Scheduling */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time Slot *</Label>
                      <Select value={formData.time} onValueChange={(value) => handleChange('time', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9-12">9:00 AM - 12:00 PM</SelectItem>
                          <SelectItem value="12-3">12:00 PM - 3:00 PM</SelectItem>
                          <SelectItem value="3-6">3:00 PM - 6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Estimated Quantity</Label>
                      <Input
                        id="quantity"
                        placeholder="e.g., 3 devices"
                        value={formData.quantity}
                        onChange={(e) => handleChange('quantity', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions or additional information..."
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                    />
                  </div>

                  <Button type="submit" variant="eco" size="lg" className="w-full">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Schedule Pickup
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drop-off Tab */}
          <TabsContent value="dropoff">
            <div className="space-y-6">
              {/* Map Placeholder */}
              <Card className="shadow-elevated border-none">
                <CardContent className="p-6">
                  <div className="bg-muted/50 rounded-lg h-64 flex items-center justify-center mb-6">
                    <div className="text-center space-y-2">
                      <MapPin className="w-12 h-12 text-primary mx-auto" />
                      <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                      <p className="text-sm text-muted-foreground">Find nearby recycling centers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Locations */}
              <div className="grid gap-4">
                <h3 className="text-2xl font-bold text-foreground">Nearby Drop-off Centers</h3>
                {nearbyLocations.map((location, index) => (
                  <Card key={index} className="shadow-card border-none">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-foreground">{location.name}</h4>
                          <p className="text-muted-foreground flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {location.address}
                          </p>
                          <p className="text-muted-foreground flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {location.hours}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-sm text-primary font-semibold">{location.distance}</p>
                          <div className="space-y-1">
                            <Button size="sm" variant="eco-outline">
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Pickup;