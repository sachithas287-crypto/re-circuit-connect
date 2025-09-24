import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Send,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@recircuit.com", "support@recircuit.com"],
      description: "Get help via email"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["1-800-RECYCLE", "1-800-732-9253"],
      description: "24/7 customer support"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Green Tech Park", "Sustainability City, SC 12345"],
      description: "Corporate headquarters"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 8:00 AM - 8:00 PM", "Sat-Sun: 9:00 AM - 6:00 PM"],
      description: "Customer service availability"
    }
  ];

  const faqs = [
    {
      question: "How do I schedule a pickup?",
      answer: "You can schedule a pickup by going to our 'Schedule Pickup' page, filling out the form with your contact details, address, and preferred time slot. We'll confirm your appointment via email within 24 hours."
    },
    {
      question: "What types of devices do you accept?",
      answer: "We accept all types of electronic devices including smartphones, tablets, laptops, desktop computers, batteries, cables, small appliances, and more. Check our Guidelines page for a comprehensive list."
    },
    {
      question: "Is there a fee for pickup service?",
      answer: "Our pickup service is completely free for most electronic devices. We believe in making e-waste recycling as accessible as possible for everyone."
    },
    {
      question: "How do I earn and redeem reward points?",
      answer: "You earn points for each device you recycle with us. Points can be redeemed for gift cards, eco-friendly products, and discounts. Check your dashboard to see available rewards and your point balance."
    },
    {
      question: "Is my personal data safe when I recycle devices?",
      answer: "Yes, we take data security very seriously. We recommend that you backup and wipe your data before pickup. Our certified technicians also perform additional data destruction procedures to ensure complete security."
    },
    {
      question: "Can I drop off devices instead of scheduling pickup?",
      answer: "Absolutely! We have multiple drop-off centers across the city. Use our 'Find Drop-off' feature to locate the nearest center and check their operating hours."
    },
    {
      question: "What happens to my devices after recycling?",
      answer: "Devices go through a certified recycling process where valuable materials are extracted and reused. Components that can't be recycled are disposed of safely according to environmental regulations."
    },
    {
      question: "How can I track my environmental impact?",
      answer: "Your personal dashboard shows detailed metrics including the number of devices recycled, CO₂ saved, and your contribution to reducing electronic waste. You can also download impact reports."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface py-8">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about e-waste recycling? We're here to help you make a positive environmental impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
            
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gradient-eco rounded-lg flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-sm font-medium text-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form & FAQ */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="contact" className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>FAQ</span>
                </TabsTrigger>
              </TabsList>

              {/* Contact Form */}
              <TabsContent value="contact">
                <Card className="border-none shadow-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <span>Send us a Message</span>
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
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

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Tell us how we can help you..."
                          required
                        />
                      </div>

                      <Button type="submit" variant="eco" size="lg" className="w-full">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAQ */}
              <TabsContent value="faq">
                <Card className="border-none shadow-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      <span>Frequently Asked Questions</span>
                    </CardTitle>
                    <CardDescription>
                      Find quick answers to common questions about our services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-border rounded-lg overflow-hidden">
                        <button
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                          onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                        >
                          <span className="font-semibold text-foreground">{faq.question}</span>
                          {openFAQ === index ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        {openFAQ === index && (
                          <div className="p-4 pt-0 border-t border-border">
                            <p className="text-muted-foreground">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Chatbot Section */}
        <Card className="bg-gradient-eco text-white border-none shadow-elevated">
          <CardContent className="text-center py-12 px-8">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our AI-powered chatbot is available 24/7 to answer your questions and guide you through our services.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
              <MessageSquare className="w-4 h-4 mr-2" />
              Start Chat (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;