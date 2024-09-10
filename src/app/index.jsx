import { Routes, Route } from "react-router-dom";

import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";
import EditProfile from "./pages/EditProfile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NavigationLayout from "./pages/NavigationLayout";
import Error404 from "./pages/Error404";
import ArticleLayout from "./pages/ArticleLayout";
import ArticlesLayout from "./pages/ArticlesLayout";

export default function App() {
  return (
    <>
      <NavigationLayout />
      <Routes>
        <Route path="/" element={<ArticlesLayout />} />
        <Route path="/articles" element={<ArticlesLayout />} />
        <Route path="/articles/:slug" element={<ArticleLayout />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/error-404" element={<Error404 />} />
        <Route path="*" element={<ArticlesLayout />} />
      </Routes>
    </>
  );
}
