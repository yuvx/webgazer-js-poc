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
  const data = useRef(
    new Set<{ x: number; y: number; dx: number; dy: number; time: number }>()
  );

  useEffect(() => {
    if (isRecording) {
      startTime.current = performance.now();
    }
  }, [isRecording]);

  useEffect(() => {
    if (data.current && webgazer.state.gazePosition && isRecording) {
      const prevData =
        data.current.size > 0 ? [...data.current][data.current.size - 1] : null;

      const { x, y } = webgazer.state.gazePosition;

      const dx = prevData ? x - prevData.x : 0;
      const dy = prevData ? y - prevData.y : 0;

      data.current.add({
        x,
        y,
        dx,
        dy,
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
                ???????????????
              </Heading>

              <Text textAlign={"center"}>
                ????????????: {data.current?.size?.toLocaleString()}???
              </Text>

              <SimpleGrid columns={2} spacing={4}>
                {isRecording ? (
                  <Button
                    colorScheme={"red"}
                    onClick={() => setIsRecording(false)}
                  >
                    ????????????
                  </Button>
                ) : (
                  <Button
                    disabled={!webgazer.state.isStarted}
                    colorScheme={"green"}
                    onClick={() => setIsRecording(true)}
                  >
                    ????????????
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
                  ????????????
                </Button>
              </SimpleGrid>
            </Stack>

            <Stack w={400} spacing={2}>
              <Heading size={"md"} textAlign={"center"}>
                ???????????????????????????
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
                      <FormLabel>????????????(RELATION)</FormLabel>
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
                  ??????????????????
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
