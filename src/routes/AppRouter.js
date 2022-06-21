import React, { lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../hooks';

const DashboardScreen = lazy(() => import('../screens/DashboardScreen'));
const LoginScreen = lazy(() => import('../screens/LoginScreen'));
const MovementsScreen = lazy(() => import('../screens/MovementsScreen'));
const UsersScreen = lazy(() => import('../screens/UsersScreen'));
const MovilesScreen = lazy(() => import('../screens/MovilesScreen'));
const BusinessScreen = lazy(() => import('../screens/BusinessScreen'));
const AgreementScreen = lazy(() => import('../screens/AgreementScreen'));
const ServiceScreen = lazy(() => import('../screens/ServiceScreen'));

const Protected = ({ children }) => {
  const { auth } = useAuth();

  if (!auth?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const IsLoggedIn = ({ children }) => {
  const { auth } = useAuth();

  if (auth?.isAuthenticated) {
    return <Navigate to="/inicio/movimientos" replace />;
  }
  return children;
};

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <IsLoggedIn>
              <LoginScreen />
            </IsLoggedIn>
          }
        />
        <Route
          path="/inicio"
          element={
            <Protected isLoggedIn={true}>
              <DashboardScreen />
            </Protected>
          }
        />
        <Route
          path="/inicio/movimientos"
          element={
            <Protected isLoggedIn={true}>
              <MovementsScreen />
            </Protected>
          }
        />
        <Route
          path="/inicio/servicios"
          element={
            <Protected isLoggedIn={true}>
              <ServiceScreen />
            </Protected>
          }
        />
        <Route
          path="/inicio/moviles"
          element={
            <Protected isLoggedIn={true}>
              <MovilesScreen />
            </Protected>
          }
        />
        <Route
          path="/inicio/empresa"
          element={
            <Protected isLoggedIn={true}>
              <BusinessScreen />
            </Protected>
          }
        />
        <Route
          path="/inicio/convenio"
          element={
            <Protected isLoggedIn={true}>
              <AgreementScreen />
            </Protected>
          }
        />
        <Route
          path="/inicio/usuarios"
          element={
            <Protected isLoggedIn={true}>
              <UsersScreen />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
};
