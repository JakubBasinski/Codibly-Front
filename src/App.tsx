import './App.css';
import Layout from './Layout/Menu/Layout';
import ProductsList from './pages/Products/ProductsList';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorPage } from './pages/Error/ErrorPage';
import { LoginPage } from './pages/Login/Login';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" />} />
        <Route path="/page/:page/*" element={<ProductsList />} />
        <Route path="/page/:page/id/:id" element={<ProductsList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
