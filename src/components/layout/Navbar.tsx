import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Recycle, Home, Truck, BookOpen, BarChart3, MessageCircle, User, Shield, LogOut, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Pickup', path: '/pickup', icon: Truck },
  { name: 'Guidelines', path: '/guidelines', icon: BookOpen },
  { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  { name: 'Feedback', path: '/feedback', icon: MessageSquare },
  { name: 'Contact', path: '/contact', icon: MessageCircle },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">ReCircuit</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button asChild>
                  <Link to="/pickup">Schedule Pickup</Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {profile?.full_name || 'Account'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                     {profile?.role === 'administrator' && (
                       <DropdownMenuItem onClick={() => navigate('/admin')}>
                         <Shield className="mr-2 h-4 w-4" />
                         <span>Admin Panel</span>
                       </DropdownMenuItem>
                     )}
                     {profile?.role === 'collector' && (
                       <DropdownMenuItem onClick={() => navigate('/collector')}>
                         <Truck className="mr-2 h-4 w-4" />
                         <span>Collector Dashboard</span>
                       </DropdownMenuItem>
                     )}
                     {profile?.role === 'regulator' && (
                       <DropdownMenuItem onClick={() => navigate('/regulator')}>
                         <Shield className="mr-2 h-4 w-4" />
                         <span>Regulator Dashboard</span>
                       </DropdownMenuItem>
                     )}
                     {profile?.role === 'recycler' && (
                       <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                         <Recycle className="mr-2 h-4 w-4" />
                         <span>Recycler Dashboard</span>
                       </DropdownMenuItem>
                     )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2">
                    Sign Up
                    <X className="h-3 w-3 rotate-45" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/auth?mode=signin&role=user')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>User Sign In</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/auth?mode=signin&role=admin')}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Sign In</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth & CTA */}
            <div className="mt-4 space-y-2 px-2 pb-3">
              {user ? (
                <>
                  <Button className="w-full" onClick={() => setIsOpen(false)}>
                    <Link to="/pickup">Schedule Pickup</Link>
                  </Button>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      Welcome, {profile?.full_name || 'User'}
                    </p>
                    <div className="space-y-1">
                      <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { setIsOpen(false); navigate('/dashboard'); }}>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                       {profile?.role === 'administrator' && (
                         <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { setIsOpen(false); navigate('/admin'); }}>
                           <Shield className="mr-2 h-4 w-4" />
                           Admin Panel
                         </Button>
                       )}
                       {profile?.role === 'collector' && (
                         <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { setIsOpen(false); navigate('/collector'); }}>
                           <Truck className="mr-2 h-4 w-4" />
                           Collector Dashboard
                         </Button>
                       )}
                       {profile?.role === 'regulator' && (
                         <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { setIsOpen(false); navigate('/regulator'); }}>
                           <Shield className="mr-2 h-4 w-4" />
                           Regulator Dashboard
                         </Button>
                       )}
                       {profile?.role === 'recycler' && (
                         <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { setIsOpen(false); navigate('/dashboard'); }}>
                           <Recycle className="mr-2 h-4 w-4" />
                           Recycler Dashboard
                         </Button>
                       )}
                      <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { setIsOpen(false); signOut(); }}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => { setIsOpen(false); navigate('/auth?mode=signin&role=user'); }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    User Sign In
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => { setIsOpen(false); navigate('/auth?mode=signin&role=admin'); }}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Sign In
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;