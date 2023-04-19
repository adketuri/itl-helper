import { EntrantData, EntrantResponse } from "./types";

async function fetchEntrant(id: number) {
  console.log("Fetching....");
  const response = await fetch(
    `https://itl2023.groovestats.com/api/entrant/${id}`
  );
  const data = await response.json();
  return data;
}

async function fetchLeaderboard() {
  console.log("Fetching....");
  const response = await fetch(
    `https://itl2023.groovestats.com/api/entrant/leaderboard`
  );
  const data = await response.json();
  return data;
}

fetchEntrant(302).then((entrant: EntrantResponse) =>
  console.log(JSON.stringify(entrant))
);
