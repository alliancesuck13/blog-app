import Articles from "../components/ui/Articles/Articles";
import Main from "../components/ui/Main";
import Navigation from "../components/ui/Navigation";

export default function App() {
  return (
    <>
      <Navigation />
      <Main>
        <Articles />
      </Main>
    </>
  );
}
