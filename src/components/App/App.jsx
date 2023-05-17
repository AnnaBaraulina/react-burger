import HomePage from "../../pages/main/main";
import LoginPage from "../../pages/login/login";
import { Routes, Route, useLocation } from "react-router-dom";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import BurgerDetails from "../BurgerDetails/BurgerDetails";
import { useDispatch, useSelector } from "react-redux";
import { getIngredient } from "../../services/actions/burgerIngredientsAction";
import { useEffect } from "react";
import RegisterPage from "../../pages/register/register";
import ForgottenPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password-page";
import ProfilePage from "../../pages/profile/profile";
import IngredientsPage from "../../pages/ingredients/ingredients-page";
import ProtectedRoute from "../Protected-route/ProtectedRoute";
import { checkUserAccess } from "../../services/actions/userAction";
import FeedPage from "../../pages/feed/feed";
import OrderPage from "../../pages/order-page/order-page";
import UserOrder from "../../pages/user-order/user-order";
import Modal from "../Modal/Modal";
import Layout from "../../pages/layout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredient());
    dispatch(checkUserAccess());
  }, []);

  const { isAuth, resetEmailSent } = useSelector((store) => ({
    isAuth: store.userReducer.isAuth,
    resetEmailSent: store.userReducer.resetEmailSent,
  }));

  const location = useLocation();

  const background =
    location.state?.locationIngredient ||
    location.state?.locationFeed ||
    location.state?.locationProfile ||
    location;

  return (
    <>
      <Routes location={background}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="feed/:id" element={<OrderPage isAuth={false} />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuth={isAuth} to="/login">
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route path="orders" element={<UserOrder />} />
          </Route>
          <Route
            path="profile/orders/:id"
            element={<OrderPage isAuth={true} />}
          />

          <Route
            path="/login"
            element={
              <ProtectedRoute isAuth={!isAuth} to="/">
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute isAuth={!isAuth} to="/">
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute isAuth={!isAuth} to="/">
                <ForgottenPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute isAuth={resetEmailSent} to="/login">
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />

          <Route path="/ingredients/:id" element={<IngredientsPage />} />
        </Route>
      </Routes>
      {location.state?.locationIngredient && (
        <Routes>
          <Route
            path="/ingredients/:id"
            exact
            element={
              <Modal route>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {location.state?.locationFeed && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal route>
                <BurgerDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {location.state?.locationProfile && (
        <Routes>
          <Route
            path="/profile/orders/:id"
            element={
              <Modal route>
                <BurgerDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
