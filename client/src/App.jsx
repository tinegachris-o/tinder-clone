import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ChatPage from "./pages/chatPage.jsx";
import { UseAuthStore } from "./Store/UseAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
function App() {
  const { checkAuthUser, authUser,checkingAuthUser } = UseAuthStore();
  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser]);
  if(checkingAuthUser) return null
  
  return (
    <div>
      <div
        className="absolute inset-0 -z-10 h-full w-full
         bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
      ></div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/chat/:id"
          element={authUser ? <ChatPage /> : <Navigate to={"/auth"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
