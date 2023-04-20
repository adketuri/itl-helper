import { FC } from "react";
import { useRanker } from "../../hooks/use-ranker";
import { Container, Spinner, Text } from "@chakra-ui/react";
import { ChartView } from "../chart-view/chart-view";

export const RankView: FC = () => {

  const ranker = useRanker(806);

  return (<Container maxW="container.lg" mt={5}>
    {!ranker.results && <Spinner />}
    {ranker.results?.slice(0, 5).map((entry, i) => <ChartView key={entry.topScore.id} rank={i + 1} chartMap={ranker.chartMap} entry={entry} />)}

  </Container>);
}