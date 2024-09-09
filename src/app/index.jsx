import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";
import EditProfile from "./pages/EditProfile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ArticleLayout from "./pages/ArticleLayout";
import OwnArticle from "./pages/OwnArticle";
import ArticlesLayout from "./pages/ArticlesLayout";
import NavigationLayout from "./pages/NavigationLayout";
import Error404 from "./pages/Error404";

export default function App() {
  const { username } = useSelector((state) => {
    return state.user;
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<ArticlesLayout />} />
        <Route path="/articles" element={<ArticlesLayout />} />
        <Route path="/articles/:slug" element={<ArticleLayout />} />
        <Route path={`/articles/${username}/:slug`} element={<OwnArticle />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/error-404" element={<Error404 />} />
        <Route path="*" element={<ArticlesLayout />} />
      </Routes>
      <NavigationLayout />
    </>
  );
}
