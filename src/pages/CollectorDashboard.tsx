import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Truck, MapPin, Clock, Package } from 'lucide-react';

interface PickupRequest {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  device_types: string[];
  pickup_date: string;
  pickup_time: string;
  status: string;
  estimated_weight?: number;
  special_instructions?: string;
  created_at: string;
}

const CollectorDashboard = () => {
  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user && profile?.role === 'collector') {
      fetchPickupRequests();
    }
  }, [user, profile]);

  const fetchPickupRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('pickup_requests')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setPickupRequests(data || []);
    } catch (error: any) {
      toast({
        title: "Error Loading Requests",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('pickup_requests')
        .update({ 
          status: newStatus,
          assigned_recycler: user?.id 
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Request ${newStatus === 'accepted' ? 'accepted' : 'completed'} successfully.`,
      });

      fetchPickupRequests();
    } catch (error: any) {
      toast({
        title: "Error Updating Status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (profile?.role !== 'collector') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              You don't have collector permissions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <Truck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Collector Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pickupRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                Available for collection
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Pickup Requests</CardTitle>
            <CardDescription>
              E-waste collection requests waiting for pickup
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pickupRequests.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No pending pickup requests available.
              </p>
            ) : (
              <div className="space-y-4">
                {pickupRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{request.full_name}</h3>
                          <p className="text-sm text-muted-foreground">{request.email}</p>
                          <p className="text-sm text-muted-foreground">{request.phone}</p>
                        </div>
                        <Badge variant="outline">
                          {request.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(request.pickup_date).toLocaleDateString()} at {request.pickup_time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {request.device_types.join(', ')}
                          </span>
                        </div>
                        {request.estimated_weight && (
                          <p className="text-sm">
                            Estimated weight: {request.estimated_weight} kg
                          </p>
                        )}
                        {request.special_instructions && (
                          <p className="text-sm text-muted-foreground">
                            Instructions: {request.special_instructions}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => updateRequestStatus(request.id, 'accepted')}
                          size="sm"
                        >
                          Accept Request
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectorDashboard;