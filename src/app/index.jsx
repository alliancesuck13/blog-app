import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import CreateArticle from "../components/logic/CreateArticle";
import EditArticle from "../components/logic/EditArticle/EditArticle";
import EditProfile from "../components/logic/EditProfile";
import SignIn from "../components/logic/SignIn/SignIn";
import SignUp from "../components/logic/SignUp";
import Article from "../components/ui/Article/Article";
import Articles from "../components/ui/Articles/Articles";
import OwnArticle from "../components/logic/OwnArticle/OwnArticle";
import Navigation from "../components/ui/Navigation";
import NavLogged from "../components/ui/NavLogged";
import NavUnlogged from "../components/ui/NavUnlogged";
import Error404 from "../components/ui/Error404/Error404";

export default function App() {
  const { username, loggedIn } = useSelector((state) => {
    return state.user;
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path={`/articles/${username}/:slug`} element={<OwnArticle />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="*" element={<Articles />} />
        <Route path="/error-404" element={<Error404 />} />
      </Routes>
      <Navigation>{loggedIn ? <NavLogged /> : <NavUnlogged />}</Navigation>
    </>
  );
}
