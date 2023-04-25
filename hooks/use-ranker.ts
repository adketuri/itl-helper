import { useEffect, useState } from "react";
import { Chart, ChartScore, Entrant, EntrantResponse, EntrantScore, Leaderboard, LeaderboardResponse, TopScore } from "../types";

// const apiUrl = "https://itl2023.groovestats.com/api/entrant";
const serverUrl = process.env.NODE_ENV === "production" ? "https://itl.zexyu.com" : "http://localhost:3000"
const apiUrl = serverUrl + "/api/entrant";
const chartMap = new Map<string, Chart>();

async function fetchAllEntrants(entrants: EntrantScore[]) {
  const results: EntrantResponse[] = [];
  for (const e of entrants) {
    results.push(await fetchEntrant(e.entrant.id))
  }
  return results
}

async function fetchEntrant(id: number) {
  console.log(`Fetching Entrant ${id}....`);

  const response = await fetch(`${apiUrl}/${id}`);
  const data = await response.json();
  return data;
}

async function fetchLeaderboard() {
  console.log("Fetching Leaderboard....");
  const response = await fetch(`${apiUrl}/leaderboard`);
  const data = await response.json();
  return data;
}

async function fetchPeerScores(entrants: EntrantScore[]) {
  console.log("Fetching peers...");
  const peers: EntrantResponse[] = await fetchAllEntrants(entrants);
  return peers.map(peer => peer.data.topScores.sort((s1, s2) => s2.points - s1.points));
}

function getEntrantScore(entrant: Entrant, leaderboardEntry: Leaderboard) {
  const rp = entrant.rankingPoints - leaderboardEntry.rankingPoints;
  const tp = (entrant.totalPoints - leaderboardEntry.totalPoints) / 20;
  return rp + tp;
}

function getCombinedPeerScore(score: TopScore, allPeerScores: TopScore[][]) {
  let sum = 0;
  const chart = chartMap.get(score.chartHash);
  if (!chart) {
    console.error("Chart not found, skipping: ", score.chartHash);
    return -100000;
  }
  const title = chart.title;
  console.log(title, "Local player rank is: ", score.points, "/", chart.points);
  const localScore = score.points / chart.points;
  console.log(title, "Local player scoring: ", localScore);
  let entries = 0;
  allPeerScores.forEach((peerScores, i) => {
    const peerTopScore = peerScores.find((c: TopScore) => c.chartHash === score.chartHash);
    if (peerTopScore) {
      console.log(title, "  Peer", i, "score is ", peerTopScore.points, "/", chart.points);
      const peerScore = peerTopScore.points / chart.points;
      console.log(title, "  adding to peer score ", peerScore);
      sum += peerScore;
      entries++;
    }
  })
  const avgPeerScore = sum / entries;
  console.log(title, "  total average is ", avgPeerScore);
  return avgPeerScore - localScore;
}

const calculate = (entrantId: number, setResults: (arg: ChartScore[]) => void, setChartMap: (arg: Map<string, Chart>) => void, leaderboardResponse: LeaderboardResponse) => {
  fetchEntrant(entrantId).then((entrantResponse: EntrantResponse) => {
    const entrantScores = new Array<EntrantScore>();
    const { entrant, topScores, charts } = entrantResponse.data;
    const localSortedTopScores = topScores.sort((c1, c2) => c2.points - c1.points);

    charts.forEach(c => chartMap.set(c.hash, c));

    // localSortedTopScores.forEach((c) => console.log(chartMap.get(c.chartHash).title, c.points));

    // find peers from the leaderboard, first add to an entrantScores array, then find 10 players with a score lower than yours
    leaderboardResponse.data.leaderboard.forEach((leaderboardEntry) => entrantScores.push({ entrant: leaderboardEntry, score: getEntrantScore(entrant, leaderboardEntry) }))
    const peerEntries = entrantScores.sort((a, b) => a.score - b.score).filter(e => e.score > 0).slice(0, 10);

    // fetch each of those entries' entrant objects so we have all their scores
    fetchPeerScores(peerEntries).then(allPeerScores => {

      // look at each chart and calculate its peer score
      const chartScores = Array<ChartScore>();
      localSortedTopScores.forEach((topScore, i) => {
        const peerScore = getCombinedPeerScore(topScore, allPeerScores);
        chartScores.push({ topScore, score: peerScore })
      });

      // sort and present the total
      const chartResults = chartScores.sort((c1, c2) => c2.score - c1.score).filter(c => chartMap.has(c.topScore.chartHash)).slice(0, 20);
      console.log("Here are the results:");
      chartResults.forEach((entry, i) => console.log((i + 1), chartMap.get(entry.topScore.chartHash)?.title, chartMap.get(entry.topScore.chartHash)?.meter, "Score:", entry.score));
      setResults(chartResults);
      setChartMap(chartMap);
    });
  });
}

export interface Ranker {
  chartMap?: Map<string, Chart>;
  leaderboard?: LeaderboardResponse;
  results?: ChartScore[];
  clearResults: () => void;
  removeResult: (topScoreId: number) => void;
}

export const useRanker: (arg?: number) => Ranker = (entrantId?: number) => {

  const [results, setResults] = useState<ChartScore[] | undefined>();
  const [leaderboard, setLeaderboard] = useState<LeaderboardResponse | undefined>();

  const [chartMap, setChartMap] = useState<Map<string, Chart> | undefined>();
  useEffect(() => {
    if (!entrantId || !leaderboard) return;
    calculate(entrantId, setResults, setChartMap, leaderboard);
  }, [entrantId, leaderboard]);

  useEffect(() => {
    fetchLeaderboard().then(setLeaderboard);
  }, [])

  return {
    results,
    chartMap,
    leaderboard,
    clearResults: () => setResults(undefined),
    removeResult: (id: number) => setResults(results => results?.filter(r => r.topScore.id !== id))
  }
}



