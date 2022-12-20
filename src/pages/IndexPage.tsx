import React, {
  FC,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useWebGazer } from "../hooks/useWebGazer";
import { useAsyncFn } from "react-use";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { match } from "ts-pattern";
import { JSONLFormatter } from "../lib/formatter/JSONLFormatter";
import { ARFFFormatter } from "../lib/formatter/ARFFFormatter";
import { Point } from "../components/Point";
import { WebGazerStatusPanel } from "../components/WebGazerStatusPanel";
import { TimerBoxes } from "../components/TimerBoxes";

export const IndexPage: FC = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const webgazer = useWebGazer();

  const [toggleWebGazerStatus, toggleWebGazer] = useAsyncFn(() => {
    return webgazer.state.isStarted
      ? webgazer.end()
      : webgazer.begin({
          regressionModule: "threadedRidge",
        });
  }, [webgazer.state.isStarted]);

  const [isRecording, setIsRecording] = useState(false);
  const [dataFormat, setDataFormat] = useState<"jsonl" | "arff">("jsonl");
  const [arffRelation, setArffRelation] = useState("");

  const startTime = useRef<number>(0);
  const data = useRef(new Set<{ x: number; y: number; time: number }>());

  useEffect(() => {
    if (isRecording) {
      startTime.current = performance.now();
    }
  }, [isRecording]);

  useEffect(() => {
    if (data.current && webgazer.state.gazePosition && isRecording) {
      data.current.add({
        ...webgazer.state.gazePosition,
        time: performance.now() - startTime.current,
      });
    }
  }, [webgazer.state.gazePosition, isRecording]);

  const downloadData = useCallback(() => {
    const dataArray = [...data.current];

    const fileContent = match(dataFormat)
      .with("jsonl", () => JSONLFormatter(dataArray))
      .with("arff", () =>
        ARFFFormatter(
          {
            relation: arffRelation,
          },
          dataArray
        )
      )
      .exhaustive();

    const blob = new Blob([fileContent]);

    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.download = `webgazer_data_${new Date()
      .toLocaleDateString()
      .replace(/\//g, "-")}_${new Date()
      .toLocaleTimeString()
      .replace(/:/g, "-")}.${dataFormat}`;
    downloadLink.href = url;

    document.body.appendChild(downloadLink);

    downloadLink.click();
    downloadLink.parentNode!.removeChild(downloadLink);

    URL.revokeObjectURL(url);
  }, [dataFormat, arffRelation]);

  return (
    <Box minH={"100vh"} display={"flex"} flexDir={"column"}>
      <Point
        x={webgazer.state.gazePosition.x}
        y={webgazer.state.gazePosition.y}
      />

      <HStack marginLeft={"340px"} minH={"240px"} spacing={16}>
        <WebGazerStatusPanel
          isWebGazerStarted={webgazer.state.isStarted}
          isLoadingToggle={toggleWebGazerStatus.loading}
          onClearData={webgazer.clearData}
          onClick={toggleWebGazer}
        />

        <Stack h={"full"}>
          <HStack>
            <Stack w={400}>
              <Heading size={"md"} textAlign={"center"}>
                データ記録
              </Heading>

              <Text textAlign={"center"}>
                データ数: {data.current?.size?.toLocaleString()}件
              </Text>

              <SimpleGrid columns={2} spacing={4}>
                {isRecording ? (
                  <Button
                    colorScheme={"red"}
                    onClick={() => setIsRecording(false)}
                  >
                    記録停止
                  </Button>
                ) : (
                  <Button
                    disabled={!webgazer.state.isStarted}
                    colorScheme={"green"}
                    onClick={() => setIsRecording(true)}
                  >
                    記録開始
                  </Button>
                )}

                <Button
                  disabled={isRecording || !data.current.size}
                  colorScheme={"red"}
                  onClick={() => {
                    data.current.clear();
                    forceUpdate();
                  }}
                >
                  リセット
                </Button>
              </SimpleGrid>
            </Stack>

            <Stack w={400} spacing={2}>
              <Heading size={"md"} textAlign={"center"}>
                データエクスポート
              </Heading>

              <Tabs
                variant={"solid-rounded"}
                onChange={(index) =>
                  setDataFormat((["jsonl", "arff"] as const)[index])
                }
              >
                <TabList>
                  <HStack>
                    <Tab>JSONL</Tab>
                    <Tab>Weka (ARFF)</Tab>
                  </HStack>
                </TabList>

                <TabPanels>
                  <TabPanel />
                  <TabPanel>
                    <FormControl>
                      <FormLabel>データ名(RELATION)</FormLabel>
                      <Input
                        onChange={(e) => setArffRelation(e.currentTarget.value)}
                      />
                    </FormControl>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Center>
                <Button
                  colorScheme={"blue"}
                  disabled={
                    isRecording || !data.current.size || dataFormat === "arff"
                      ? !arffRelation
                      : false
                  }
                  onClick={downloadData}
                >
                  ダウンロード
                </Button>
              </Center>
            </Stack>
          </HStack>
        </Stack>
      </HStack>

      <SimpleGrid bg={"gray.300"} flexGrow={1} columns={3} spacing={4} p={4}>
        <TimerBoxes isEnabled={webgazer.state.isStarted} />
      </SimpleGrid>
    </Box>
  );
};
