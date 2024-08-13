import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from '@/layout/RootLayout';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Home from "@/pages/Home";
import Create from "@/pages/Create";
import PostDetail from "@/pages/PostDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/post/detail/:id" element={<PostDetail />} />
    </Route>
  )
);

export default router;