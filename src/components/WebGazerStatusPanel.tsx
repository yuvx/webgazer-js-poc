import React, { FC, memo } from "react";
import { Alert, AlertTitle, Button, Heading, Stack } from "@chakra-ui/react";

export const WebGazerStatusPanel: FC<{
  isWebGazerStarted: boolean;
  onClick: () => Promise<unknown>;
  onClearData: () => Promise<unknown>;
  isLoadingToggle: boolean;
}> = memo((props) => (
  <Stack padding={4} w={500} spacing={4}>
    <Heading textAlign={"center"} size={"md"}>
      状態: {props.isWebGazerStarted ? "動作中" : "スタンバイ"}
    </Heading>

    <Alert status={"info"}>
      <AlertTitle>
        カーソルを見つめながら複数回クリックすることでキャリブレーションができます
      </AlertTitle>
    </Alert>

    <Button colorScheme={"red"} onClick={props.onClearData}>
      キャリブレーションデータをリセット
    </Button>

    <Button
      colorScheme={"blue"}
      onClick={props.onClick}
      isLoading={props.isLoadingToggle}
    >
      {props.isWebGazerStarted ? "停止" : "開始"}
    </Button>
  </Stack>
));
