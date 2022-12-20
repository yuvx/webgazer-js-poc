import React, { FC, useState } from "react";
import { useInterval } from "react-use";
import { Center, Text } from "@chakra-ui/react";

export const TimerBoxes: FC<{ isEnabled: boolean }> = (props) => {
  const [activeNumber, setActiveNumber] = useState(0);

  useInterval(() => {
    if (props.isEnabled) {
      setActiveNumber((prev) => (prev + 1) % 6);
    }
  }, 2000);

  return (
    <>
      {[...new Array(6).keys()]
        .map((value) => value + 1)
        .map((value) => {
          const isActive = activeNumber + 1 === value;

          return (
            <Center>
              <Center
                w={"50%"}
                h={"50%"}
                key={value}
                bg={isActive ? "blue" : "white"}
              >
                <Text
                  userSelect={"none"}
                  fontSize={"5em"}
                  color={isActive ? "white" : "black"}
                >
                  {value}
                </Text>
              </Center>
            </Center>
          );
        })}
    </>
  );
};
