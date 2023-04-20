import { Chart, ChartScore, Entrant, EntrantResponse, EntrantScore, Leaderboard, LeaderboardResponse, TopScore } from "./types";

const chartMap = new Map<string, Chart>();
const apiUrl = "https://itl2023.groovestats.com/api/entrant";

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
  const peers: EntrantResponse[] = await Promise.all(entrants.map((entrantScore) => fetchEntrant(entrantScore.entrant.id)));
  return peers.map(peer => peer.data.topScores.sort((s1, s2) => s2.points - s1.points));
}

function getEntrantScore(entrant: Entrant, leaderboardEntry: Leaderboard) {
  const rp = Math.abs(entrant.rankingPoints - leaderboardEntry.rankingPoints);
  const tp = (Math.abs(entrant.totalPoints - leaderboardEntry.totalPoints)) / 5;
  return rp + tp;
}

function getPeerChartScore(score: TopScore, peerCharts: TopScore[][], localRank: number, totalCharts: number) {
  let sum = 0;
  const title = chartMap.get(score.chartHash).title;
  console.log(title, "Local player rank is: ", localRank, "/", totalCharts);
  const localScore = (totalCharts - localRank);
  console.log(title, "Local player scoring: ", localScore);
  peerCharts.forEach((peerCharts, i) => {
    const peerRank = peerCharts.findIndex((c: TopScore) => c.chartHash === score.chartHash);
    console.log(title, "  Peer", i, "rank is ", peerRank, "/", totalCharts);
    if (peerRank > 0) {
      const peerScore = (totalCharts - peerRank);
      console.log(title, "  adding to peer score ", peerScore);
      sum += peerScore;
    }
  })
  const avgPeerScore = sum / peerCharts.length;
  console.log(title, "  total average is ", avgPeerScore);
  return avgPeerScore - localScore;
}

fetchEntrant(806).then((entrantResponse: EntrantResponse) => {
  fetchLeaderboard().then((leaderboardResponse: LeaderboardResponse) => {
    const entrantScores = new Array<EntrantScore>();
    const { entrant, topScores, charts } = entrantResponse.data;
    const localSortedTopScores = topScores.sort((c1, c2) => c2.points - c1.points);

    charts.forEach(c => chartMap.set(c.hash, c));

    localSortedTopScores.forEach((c) => console.log(chartMap.get(c.chartHash).title, c.points));

    // find peers from the leaderboard
    leaderboardResponse.data.leaderboard.forEach((leaderboardEntry) => entrantScores.push({ entrant: leaderboardEntry, score: getEntrantScore(entrant, leaderboardEntry) }))
    const peerEntries = entrantScores.sort((a, b) => a.score - b.score).slice(1, 10);

    // fetch each of those entries' entrant objects so we have all their scores
    fetchPeerScores(peerEntries).then(peerCharts => {

      // look at each chart and calculate its peer score
      const chartScores = Array<ChartScore>();
      localSortedTopScores.forEach((topScore, i) => {
        const peerScore = getPeerChartScore(topScore, peerCharts, i, charts.length);
        chartScores.push({ topScore, score: peerScore })
      });

      // sort and present the total
      const chartResults = chartScores.sort((c1, c2) => c2.score - c1.score).slice(0, 10);
      console.log("Here are the results:");
      chartResults.forEach((entry, i) => console.log((i + 1), chartMap.get(entry.topScore.chartHash).title, chartMap.get(entry.topScore.chartHash).meter, "Score:", entry.score));
    });

  })
});

