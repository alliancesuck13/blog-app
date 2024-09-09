import { useMediaQuery } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import Navigation from "../../ui/Navigation";
import NavLoggedLayout from "../NavLoggedLayout/NavLoggedLayout";
import NavUnlogged from "../../ui/NavUnlogged";

export default function NavigationLayout() {
  const { loggedIn } = useSelector((state) => state.user);

  const [lessThan570] = useMediaQuery("(max-width: 570px)");

  return (
    <Navigation lessThan570={lessThan570}>
      {loggedIn ? <NavLoggedLayout /> : <NavUnlogged />}
    </Navigation>
  );
}
