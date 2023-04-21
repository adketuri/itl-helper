import { FC } from "react";
import { Box, Divider, Flex, Tag, Text } from "@chakra-ui/react";
import { Chart, ChartScore } from "../../types";
import SwipeToDelete from 'react-swipe-to-delete-ios'

export interface ChartViewProps {
  rank: number;
  chartMap?: Map<string, Chart>;
  entry: ChartScore;
  onDelete: (id: number) => void;
}

function formatEx(ex: number): string {
  return Math.floor(ex / 100) + "." + ex % 100;
}

export const ChartView: FC<ChartViewProps> = ({ rank, chartMap, entry, onDelete }) => {

  const chart = chartMap?.get(entry.topScore.chartHash);
  if (!chart) return <>No chart</>



  return (
    <SwipeToDelete onDelete={() => onDelete(entry.topScore.id)} height={65}>
      <Box bg="gray.800" height={65}>
        <Flex py={2}  >
          <Text my="auto" mr={5} fontSize={14}>{rank}</Text>
          <Box flex={1}>
            <Text fontSize={["14px", "16px"]} noOfLines={1}>{chart.title}</Text>
            <Text fontSize={["14px", "16px"]} opacity={0.6} noOfLines={1}>{chart.artist}</Text>
          </Box>
          <Flex direction={["column-reverse", "row"]}>
            <Text my="auto" fontSize={["12px", "16px"]}>{entry.topScore.points} / {chart.points} ({formatEx(entry.topScore.ex)}%)</Text>
            <Flex my="auto" width={[null, "110px"]}><Tag size="sm" ml="auto">{chart.difficulty} {chart.meter}</Tag></Flex>
          </Flex>
        </Flex>
        <Divider />
      </Box>
    </SwipeToDelete>
  )

}