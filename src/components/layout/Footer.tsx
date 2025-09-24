import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-surface border-t border-border">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-eco rounded-lg shadow-eco">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">ReCircuit</h3>
                <p className="text-sm text-muted-foreground">E-Waste Management</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Leading the revolution in responsible e-waste management. 
              Together, we're building a sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/pickup" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Schedule Pickup
              </Link>
              <Link to="/guidelines" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                E-Waste Guidelines
              </Link>
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Impact Dashboard
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Pickup & Collection</p>
              <p className="text-sm text-muted-foreground">Drop-off Centers</p>
              <p className="text-sm text-muted-foreground">Recycling Programs</p>
              <p className="text-sm text-muted-foreground">Corporate Solutions</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">info@recircuit.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">1-800-RECYCLE</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Nationwide Service</span>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-3 pt-2">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 ReCircuit. All rights reserved. Building a sustainable future, one device at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;