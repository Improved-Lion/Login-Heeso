import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from '@/layout/RootLayout';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Home from "@/pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Route>
  )
);

export default router;