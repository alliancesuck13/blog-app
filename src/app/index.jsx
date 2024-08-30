import { useSelector } from "react-redux";

// import CreateArticle from "../components/logic/CreateArticle";
// import EditArticle from "../components/logic/EditArticle/EditArticle";
// import EditProfile from "../components/logic/EditProfile";
import SignIn from "../components/logic/SignIn/SignIn";
// import SignUp from "../components/logic/SignUp";
// import Article from "../components/ui/Article/Article";
// import Articles from "../components/ui/Articles/Articles";
// import OwnArticle from "../components/logic/OwnArticle/OwnArticle";
import Navigation from "../components/ui/Navigation";
import NavLogged from "../components/ui/NavLogged";
import NavUnlogged from "../components/ui/NavUnlogged";

export default function App() {
  const isLogged = useSelector((state) => {
    return state.user.loggedIn;
  });

  return (
    <>
      <Navigation>{isLogged ? <NavLogged /> : <NavUnlogged />}</Navigation>
      {/* <Articles /> */}
      <SignIn />
      {/* <SignUp /> */}
      {/* <EditProfile /> */}
      {/* <Article /> */}
      {/* <CreateArticle /> */}
      {/* <EditArticle /> */}
      {/* <OwnArticle /> */}
    </>
  );
}
