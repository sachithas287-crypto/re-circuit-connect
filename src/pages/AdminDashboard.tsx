import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Shield, MessageSquare, Users, Truck, Star, Eye, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface FeedbackItem {
  id: string;
  feedback_type: string;
  subject: string;
  message: string;
  rating: number | null;
  status: 'pending' | 'reviewed' | 'resolved';
  admin_response: string | null;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
}

interface PickupRequest {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  pickup_date: string;
  pickup_time: string;
  device_types: string[];
  estimated_weight: number | null;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [adminResponse, setAdminResponse] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (profile && profile.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    if (profile?.role === 'admin') {
      fetchData();
    }
  }, [user, profile, navigate, toast]);

  const fetchData = async () => {
    setLoading(true);
    
    try {
      // Fetch feedback with user profiles
      const { data: feedbackData, error: feedbackError } = await supabase
        .from('feedback')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (feedbackError) throw feedbackError;

      // Fetch pickup requests
      const { data: pickupData, error: pickupError } = await supabase
        .from('pickup_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (pickupError) throw pickupError;

      setFeedback(feedbackData || []);
      setPickupRequests(pickupData || []);
    } catch (error: any) {
      toast({
        title: "Error Loading Data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFeedbackStatus = async (feedbackId: string, status: 'reviewed' | 'resolved', response?: string) => {
    try {
      const { error } = await supabase
        .from('feedback')
        .update({
          status,
          admin_response: response || null,
        })
        .eq('id', feedbackId);

      if (error) throw error;

      toast({
        title: "Feedback Updated",
        description: `Feedback marked as ${status}.`,
      });

      fetchData();
      setSelectedFeedback(null);
      setAdminResponse('');
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'default', icon: Eye },
      reviewed: { color: 'secondary', icon: CheckCircle },
      resolved: { color: 'default', icon: CheckCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Eye;

    return (
      <Badge variant={config?.color as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-muted-foreground">No rating</span>;
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">({rating}/5)</span>
      </div>
    );
  };

  if (!user || !profile) {
    return null;
  }

  if (profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Manage feedback, pickup requests, and monitor platform activity.
          </p>
        </div>

        <Tabs defaultValue="feedback" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Feedback ({feedback.length})
            </TabsTrigger>
            <TabsTrigger value="pickups" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Pickup Requests ({pickupRequests.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Feedback</CardTitle>
                <CardDescription>
                  Review and respond to user feedback to improve the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : feedback.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No feedback submitted yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {feedback.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{item.subject}</h4>
                            <p className="text-sm text-muted-foreground">
                              By {item.profiles?.full_name || 'Unknown User'} • {new Date(item.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.feedback_type.replace('_', ' ')}</Badge>
                            {getStatusBadge(item.status)}
                          </div>
                        </div>
                        
                        <p className="text-sm mb-3">{item.message}</p>
                        
                        {item.rating && (
                          <div className="mb-3">
                            {renderStars(item.rating)}
                          </div>
                        )}

                        {item.admin_response && (
                          <div className="bg-muted p-3 rounded-lg mb-3">
                            <p className="text-sm font-medium mb-1">Admin Response:</p>
                            <p className="text-sm">{item.admin_response}</p>
                          </div>
                        )}

                        {item.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedFeedback(item)}
                            >
                              Respond
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateFeedbackStatus(item.id, 'reviewed')}
                            >
                              Mark as Reviewed
                            </Button>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedFeedback && (
              <Card>
                <CardHeader>
                  <CardTitle>Respond to Feedback</CardTitle>
                  <CardDescription>
                    Responding to: "{selectedFeedback.subject}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Write your response here..."
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => updateFeedbackStatus(selectedFeedback.id, 'resolved', adminResponse)}
                      disabled={!adminResponse.trim()}
                    >
                      Send Response & Resolve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedFeedback(null);
                        setAdminResponse('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pickups">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Requests</CardTitle>
                <CardDescription>
                  Monitor and manage e-waste pickup requests from users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : pickupRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No pickup requests yet.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Device Types</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pickupRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{request.full_name}</p>
                              <p className="text-sm text-muted-foreground">{request.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{request.address}</TableCell>
                          <TableCell>
                            <div>
                              <p>{new Date(request.pickup_date).toLocaleDateString()}</p>
                              <p className="text-sm text-muted-foreground">{request.pickup_time}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {request.device_types.map((type, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={request.status === 'completed' ? 'default' : 'secondary'}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(request.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  User management features coming soon.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;