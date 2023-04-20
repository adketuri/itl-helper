import { FC, useState } from "react";
import { useRanker } from "../../hooks/use-ranker";
import { Container, Spinner, Text } from "@chakra-ui/react";
import { ChartView } from "../chart-view/chart-view";
import { MeterSlider } from "../meter-slider/meter-slider";

export const RankView: FC = () => {

  const ranker = useRanker(806);
  const [minMeter, setMinMeter] = useState(7);

  return (<Container maxW="container.lg" mt={5}>
    <MeterSlider minMeter={minMeter} setMinMeter={setMinMeter} />

    {!ranker.results && <Spinner />}
    {ranker.results?.filter(entry => ranker.chartMap?.get(entry.topScore.chartHash)?.meter || 99 >= minMeter).slice(0, 5).map((entry, i) => <ChartView key={entry.topScore.id} rank={i + 1} chartMap={ranker.chartMap} entry={entry} />)}

  </Container>);
}