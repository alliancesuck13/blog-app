import { useMediaQuery } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "../../../store/slicers/userSlice";
import NavLogged from "../../../components/ui/NavLogged";

export default function NavLoggedLayout() {
  const [lessThan500] = useMediaQuery("(max-width: 500px)");
  const username = useSelector((state) => {
    return state.user.username;
  });
  const userImage = useSelector((state) => {
    return state.user.image;
  });
  const dispatch = useDispatch();

  return (
    <NavLogged
      dispatch={dispatch}
      username={username}
      userImage={userImage}
      signOut={signOut}
      lessThan500={lessThan500}
    />
  );
}
