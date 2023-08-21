import './scss/app.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import { lazy, Suspense } from 'react';
const NotFound = lazy(() => import('./pages/NotFound'));
const FullPizza = lazy(() => import('./components/FullPizza/FullPizza'));
const Cart = lazy(() => import('./pages/Cart'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
