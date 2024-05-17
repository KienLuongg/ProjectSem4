import { Fragment, Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './common/Loader';
import routes from './routes';
import { getCookie } from './utils/storage/cookie-storage';
import { Storage } from './contstants/storage';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const NotFound = lazy(() => import('./pages/404page'));
const SignIn = lazy(() => import('./pages/Authentication/SignIn'));
const SignUp = lazy(() => import('./pages/Authentication/SignUp'));
const ECommerce = lazy(() => import('./pages/Dashboard/ECommerce'));

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const token = getCookie(Storage.token);

  useEffect(() => {
    setLoading(false);
    if (!token) {
      navigate('/sign-in');
    }
  }, [token, navigate]);

  return (
    <Suspense fallback={<Loader />}>
      <Fragment>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/sign-in" element={<SignIn />} />
          {token ? (
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<ECommerce />} />
              {routes.map((route, index) => {
                const { path, component: Component } = route;
                return (
                  <Route key={index} path={path} element={<Component />} />
                );
              })}
            </Route>
          ) : null}
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
        </Routes>
      </Fragment>
    </Suspense>
  );
}

export default App;
