import { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Chart, ChartScore } from "../../types";

export interface ChartViewProps {
  rank: number;
  chartMap?: Map<string, Chart>;
  entry: ChartScore;
}
export const ChartView: FC<ChartViewProps> = ({ rank, chartMap, entry }) => {

  const chart = chartMap?.get(entry.topScore.chartHash);
  if (!chart) return <>No chart</>

  return <Flex mb={2}>
    <Text my="auto" mr={5}>{rank}</Text>
    <Box flex={1}>
      <Text>{chart.title}</Text>
      <Text>{chart.artist}</Text>
    </Box>
    <Text my="auto" ml={5}>{chart.difficulty} {chart.meter}</Text>
  </Flex>
}