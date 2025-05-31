
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const { profile, organization, signOut, hasRole } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
      roles: ['super_admin', 'admin', 'sales_person']
    },
    {
      icon: ShoppingCart,
      label: 'Point of Sale',
      path: '/pos',
      roles: ['super_admin', 'admin', 'sales_person']
    },
    {
      icon: Package,
      label: 'Inventory',
      path: '/inventory',
      roles: ['super_admin', 'admin']
    },
    {
      icon: Users,
      label: 'Users',
      path: '/users',
      roles: ['super_admin', 'admin']
    },
    {
      icon: BarChart3,
      label: 'Reports',
      path: '/reports',
      roles: ['super_admin', 'admin']
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
      roles: ['super_admin', 'admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    hasRole(item.roles)
  );

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          {organization?.name || 'POS System'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {profile?.full_name} ({profile?.role.replace('_', ' ')})
        </p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <Button 
          onClick={signOut}
          variant="outline" 
          className="w-full flex items-center space-x-2"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};
