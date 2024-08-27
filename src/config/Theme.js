/* eslint-disable import/no-extraneous-dependencies */
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const dark = "#232323";
const light = "#ebeef3";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode(light, dark)(props),
      },
    }),
  },
});

export default theme;
