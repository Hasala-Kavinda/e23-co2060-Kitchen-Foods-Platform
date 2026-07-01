import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './admin/context/AuthContext';
import CustomerApp from './customer/App';
import AdminApp from './admin/App';
import ChefApp from './chef/App';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/chef" element={<ChefApp />} />
        <Route path="/chef/*" element={<ChefApp />} />
        <Route path="/*" element={<CustomerApp />} />
      </Routes>
    </AuthProvider>
  );
}
