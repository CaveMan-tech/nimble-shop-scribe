
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShoppingCart, Package, Users, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  const { profile, organization } = useAuth();

  const stats = [
    {
      title: 'Today\'s Sales',
      value: '$1,234',
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'Products in Stock',
      value: '245',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: '12',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Monthly Revenue',
      value: '$25,678',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.full_name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening at {organization?.name} today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No recent sales data available.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No low stock alerts at this time.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
