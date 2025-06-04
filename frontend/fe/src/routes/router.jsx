import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import { useAuthContext } from '@/context/useAuthContext';
import { appRoutes, authRoutes } from '@/routes/index';
import AdminLayout from '@/layouts/AdminLayout';

const AppRouter = props => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      {/* Pengguna yang mengunjungi domain utama akan diarahkan ke halaman login */}
      <Route path="/" element={<Navigate to="/auth/sign-in" />} />

      {/* Rute untuk halaman otentikasi (login, registrasi, dll.) */}
      {(authRoutes || []).map((route, idx) => (
        <Route 
          key={idx + route.name} 
          path={route.path} 
          element={<AuthLayout {...props}>{route.element}</AuthLayout>} 
        />
      ))}

      {/* Rute untuk halaman dashboard dan aplikasi lainnya */}
      {(appRoutes || []).map((route, idx) => (
        <Route 
          key={idx + route.name} 
          path={route.path} 
          element={
            // Halaman dashboard bisa diakses tanpa login, halaman lain hanya jika sudah login
            route.path === "/dashboard" || isAuthenticated ? (
              <AdminLayout {...props}>{route.element}</AdminLayout>
            ) : (
              <Navigate to={{
                pathname: '/auth/sign-in',
                search: 'redirectTo=' + route.path
              }} />
            )
          }
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
