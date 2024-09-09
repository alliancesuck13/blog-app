import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import CreateArticle from "../components/logic/CreateArticle";
import EditArticle from "../components/logic/EditArticle/EditArticle";
import EditProfile from "../components/logic/EditProfile";
import SignIn from "../components/logic/SignIn/SignIn";
import SignUp from "../components/logic/SignUp";
import ArticleLayout from "../components/logic/ArticleLayout/ArticleLayout";
import OwnArticle from "../components/logic/OwnArticle/OwnArticle";
import ArticlesLayout from "../components/logic/ArticlesLayout/ArticlesLayout";
import NavigationLayout from "../components/logic/NavigationLayout/NavigationLayout";
import Error404 from "../components/ui/Error404/Error404";

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
