
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export const AuthGuard = ({ children, requiredRoles }: AuthGuardProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  console.log('AuthGuard - User:', !!user, 'Profile:', !!profile, 'Loading:', loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    console.log('AuthGuard - No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Allow access if user exists, even if profile is still loading
  // This prevents redirect loops when profile data is being fetched
  if (requiredRoles && profile && !requiredRoles.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
