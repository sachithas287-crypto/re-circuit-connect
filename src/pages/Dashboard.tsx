import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Leaf, 
  Recycle,
  Calendar,
  Users,
  Target,
  Gift,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const Dashboard = () => {
  // Mock data for charts
  const monthlyData = [
    { name: 'Jan', devices: 12, co2Saved: 8.4 },
    { name: 'Feb', devices: 8, co2Saved: 5.6 },
    { name: 'Mar', devices: 15, co2Saved: 10.5 },
    { name: 'Apr', devices: 22, co2Saved: 15.4 },
    { name: 'May', devices: 18, co2Saved: 12.6 },
    { name: 'Jun', devices: 25, co2Saved: 17.5 },
  ];

  const deviceTypeData = [
    { name: 'Smartphones', value: 45, color: '#22c55e' },
    { name: 'Laptops', value: 25, color: '#3b82f6' },
    { name: 'Batteries', value: 20, color: '#f59e0b' },
    { name: 'Others', value: 10, color: '#8b5cf6' },
  ];

  const impactData = [
    { name: 'Week 1', impact: 2.1 },
    { name: 'Week 2', impact: 3.8 },
    { name: 'Week 3', impact: 5.2 },
    { name: 'Week 4', impact: 7.9 },
  ];

  const stats = [
    {
      icon: Recycle,
      title: "Devices Recycled",
      value: "127",
      change: "+12 this month",
      trend: "up"
    },
    {
      icon: Leaf,
      title: "CO₂ Saved",
      value: "89.3 kg",
      change: "+15.2 kg this month",
      trend: "up"
    },
    {
      icon: Award,
      title: "Reward Points",
      value: "2,540",
      change: "+320 points earned",
      trend: "up"
    },
    {
      icon: Users,
      title: "Community Rank",
      value: "#127",
      change: "Top 5% recyclers",
      trend: "up"
    }
  ];

  const achievements = [
    { title: "First Timer", description: "Recycled your first device", earned: true, points: 50 },
    { title: "Green Warrior", description: "Recycled 10+ devices", earned: true, points: 200 },
    { title: "Eco Champion", description: "Saved 50kg+ CO₂", earned: true, points: 500 },
    { title: "Community Leader", description: "Refer 5 friends", earned: false, points: 300 },
    { title: "Sustainability Expert", description: "Recycle 100+ devices", earned: false, points: 1000 },
  ];

  const recentActivity = [
    { date: "2024-01-15", action: "Smartphone recycled", points: "+25", status: "completed" },
    { date: "2024-01-12", action: "Laptop pickup scheduled", points: "+50", status: "pending" },
    { date: "2024-01-10", action: "Battery drop-off", points: "+15", status: "completed" },
    { date: "2024-01-08", action: "Tablet recycled", points: "+30", status: "completed" },
  ];

  const rewards = [
    { title: "$10 Amazon Gift Card", cost: 1000, available: true },
    { title: "$25 Best Buy Coupon", cost: 2500, available: true },
    { title: "Eco-Friendly Water Bottle", cost: 500, available: true },
    { title: "$50 Green Energy Credit", cost: 5000, available: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-surface py-8">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Impact Dashboard</h1>
            <p className="text-muted-foreground">Track your environmental contributions and rewards</p>
          </div>
          <Button variant="eco-outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-none shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-success flex items-center mt-2">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-2 bg-gradient-eco rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Monthly Progress */}
          <Card className="lg:col-span-2 border-none shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Monthly Recycling Progress</span>
              </CardTitle>
              <CardDescription>
                Your device recycling and CO₂ savings over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="devices" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Types */}
          <Card className="border-none shadow-card">
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Types of devices you've recycled</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={deviceTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {deviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {deviceTypeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Achievements */}
          <Card className="border-none shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription>Unlock rewards by reaching milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${achievement.earned ? 'bg-success' : 'bg-muted'}`}>
                      <Award className={`w-4 h-4 ${achievement.earned ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                  <Badge variant={achievement.earned ? "default" : "secondary"}>
                    {achievement.points} pts
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-none shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Your latest recycling actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                    <p className="text-sm text-success font-semibold mt-1">{activity.points}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Rewards Section */}
        <Card className="border-none shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-primary" />
              <span>Available Rewards</span>
            </CardTitle>
            <CardDescription>
              Redeem your points for exciting rewards and discounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewards.map((reward, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground">{reward.title}</h4>
                    <p className="text-lg font-bold text-primary">{reward.cost} points</p>
                  </div>
                  <Button 
                    variant={reward.available ? "eco" : "outline"} 
                    size="sm" 
                    className="w-full"
                    disabled={!reward.available}
                  >
                    {reward.available ? "Redeem" : "Insufficient Points"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;