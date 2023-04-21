import { FC, useState } from "react";
import { useRanker } from "../../hooks/use-ranker";
import { Box, Container, Flex, FormControl, FormHelperText, FormLabel, Spinner, Text } from "@chakra-ui/react";
import { ChartView } from "../chart-view/chart-view";
import { MeterSlider } from "../meter-slider/meter-slider";
import { UserSelector } from "../user-selector/user-selector";

export const RankView: FC = () => {

  const [minMeter, setMinMeter] = useState(7);
  const [userId, setUserId] = useState<number | undefined>();
  const { results, chartMap, leaderboard, clearResults } = useRanker(userId);

  const resultSegment = results?.filter(entry => {
    const chart = chartMap?.get(entry.topScore.chartHash);
    if (!chart) return false;
    return chart.meter >= minMeter
  }).slice(0, 5);

  return (<Container maxW="container.md" flex={1} mt={5}>

    <FormControl>
      <UserSelector leaderboard={leaderboard} setUserId={(id) => {
        clearResults();
        setUserId(id)
      }} />
      <MeterSlider minMeter={minMeter} setMinMeter={setMinMeter} />
    </FormControl>

    {userId && !results && <Flex height="200px">
      <Spinner m="auto" size="xl" />
    </Flex>}

    <Box mt={10}>
      {resultSegment?.map((entry, i) => <ChartView key={entry.topScore.id} rank={i + 1} chartMap={chartMap} entry={entry} />)}
    </Box>

  </Container>);
}