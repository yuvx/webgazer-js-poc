import { ChakraProvider } from "@chakra-ui/react";
import React, { FC } from "react";
import { IndexPage } from "./pages/IndexPage";

export const App: FC = () => {
  return (
    <ChakraProvider>
      <IndexPage />
    </ChakraProvider>
  );
};
