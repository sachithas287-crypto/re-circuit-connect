import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, TrendingUp, Users, Package, AlertTriangle } from 'lucide-react';

interface ComplianceData {
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  totalUsers: number;
  totalRecyclers: number;
  totalCollectors: number;
}

const RegulatorDashboard = () => {
  const [complianceData, setComplianceData] = useState<ComplianceData>({
    totalRequests: 0,
    completedRequests: 0,
    pendingRequests: 0,
    totalUsers: 0,
    totalRecyclers: 0,
    totalCollectors: 0,
  });
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (profile?.role === 'regulator') {
      fetchComplianceData();
    }
  }, [profile]);

  const fetchComplianceData = async () => {
    try {
      // Fetch pickup requests statistics
      const { data: requestsData, error: requestsError } = await supabase
        .from('pickup_requests')
        .select('status');

      if (requestsError) throw requestsError;

      // Fetch user profiles statistics
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('role');

      if (profilesError) throw profilesError;

      const requestStats = requestsData?.reduce((acc, request) => {
        acc.totalRequests++;
        if (request.status === 'completed') acc.completedRequests++;
        if (request.status === 'pending') acc.pendingRequests++;
        return acc;
      }, { totalRequests: 0, completedRequests: 0, pendingRequests: 0 }) || { totalRequests: 0, completedRequests: 0, pendingRequests: 0 };

      const userStats = profilesData?.reduce((acc, profile) => {
        acc.totalUsers++;
        if (profile.role === 'recycler') acc.totalRecyclers++;
        if (profile.role === 'collector') acc.totalCollectors++;
        return acc;
      }, { totalUsers: 0, totalRecyclers: 0, totalCollectors: 0 }) || { totalUsers: 0, totalRecyclers: 0, totalCollectors: 0 };

      setComplianceData({
        ...requestStats,
        ...userStats,
      });
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

  if (profile?.role !== 'regulator') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              You don't have regulator permissions.
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

  const chartData = [
    { name: 'Completed', value: complianceData.completedRequests },
    { name: 'Pending', value: complianceData.pendingRequests },
  ];

  const roleData = [
    { name: 'Household Users', value: complianceData.totalUsers - complianceData.totalRecyclers - complianceData.totalCollectors },
    { name: 'Collectors', value: complianceData.totalCollectors },
    { name: 'Recyclers', value: complianceData.totalRecyclers },
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  const complianceRate = complianceData.totalRequests > 0 
    ? (complianceData.completedRequests / complianceData.totalRequests * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Regulator Dashboard</h1>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceRate}%</div>
              <p className="text-xs text-muted-foreground">
                Completed vs Total Requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceData.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered platform users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceData.totalRequests}</div>
              <p className="text-xs text-muted-foreground">
                E-waste pickup requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Service Providers</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {complianceData.totalCollectors + complianceData.totalRecyclers}
              </div>
              <p className="text-xs text-muted-foreground">
                Active collectors & recyclers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Status Distribution</CardTitle>
              <CardDescription>
                Overview of e-waste pickup request statuses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Role Distribution</CardTitle>
              <CardDescription>
                Breakdown of platform users by role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Summary</CardTitle>
            <CardDescription>
              Key regulatory compliance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Completed Requests</p>
                  <p className="text-2xl font-bold text-green-600">
                    {complianceData.completedRequests}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Compliant
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Pending Requests</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {complianceData.pendingRequests}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Monitoring
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Active Service Providers</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {complianceData.totalCollectors + complianceData.totalRecyclers}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Licensed
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegulatorDashboard;