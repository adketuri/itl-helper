export interface EntrantResponse {
  success: boolean;
  message: string;
  data: EntrantData;
}

export interface EntrantData {
  entrant: Entrant;
  charts: Chart[];
  topScores: TopScore[];
  canEdit: boolean;
}

export interface Chart {
  id: number;
  unlockId: number;
  hash: string;
  hashOriginal: null | string;
  playstyle: number;
  points: number;
  title: string;
  titleRomaji: TitleRomaji;
  subtitle: string;
  subtitleRomaji: SubtitleRomaji;
  artist: string;
  artistRomaji: ArtistRomaji;
  pack: string;
  stepartist: string;
  techDescription: string;
  difficulty: Difficulty;
  meter: number;
  minBpm: number;
  maxBpm: number;
  totalSteps: number;
  totalRolls: number;
  totalHolds: number;
  totalMines: number;
  isNoCmod: boolean;
  crossoverLevel: number;
  bracketLevel: number;
  footswitchLevel: number;
  jackLevel: number;
  sideswitchLevel: number;
  doublestepLevel: number;
  staminaLevel: number;
}

export enum ArtistRomaji {
  CaptainSonic = "Captain Sonic",
  DDDice = "D-D-Dice",
  DropFeatHatsukiYura = "Drop feat. Hatsuki Yura",
  Empty = "",
  HidekiNaganuma = "Hideki Naganuma",
  Kohu = "kohu",
  NaoyukiFuruya = "Naoyuki Furuya",
  RoyksoppFeatSusanneSundfor = "Royksopp feat. Susanne Sundfor",
  TokinoSoraProdShinyaTada = "Tokino Sora (prod. Shinya Tada)",
}

export enum Difficulty {
  Challenge = "Challenge",
  Hard = "Hard",
  Medium = "Medium",
}

export enum SubtitleRomaji {
  Empty = "",
  FeatHatsuneMikuKAITO = "feat. Hatsune Miku (+KAITO)",
  SorezoreNoAshita = "sorezore no ashita",
}

export enum TitleRomaji {
  ChittyChittyBangBang = "Chitty Chitty Bang Bang",
  DancerOfSaramandora = "Dancer of Saramandora",
  Empty = "",
  Fffff = "fffff",
  HyakkaryouranHanafubuki = "Hyakkaryouran Hanafubuki",
  Kaibutsu = "Kaibutsu",
  KoisuruRainGirl = "Koisuru rain girl",
  MenTanPinDoraDora = "Men Tan Pin Dora Dora",
  Seigaitten = "Seigaitten",
  TondemoWonderz = "TONDEMO-WONDERZ",
  UchuuSAMURAI = "Uchuu SAMURAI",
  UsoToNuigurumi = "Uso to Nuigurumi",
}

export interface Entrant {
  id: number;
  membersId: number;
  dateAdded: string;
  lastUpdated: string;
  status: number;
  totalPoints: number;
  rankingPoints: number;
  totalPass: number;
  totalFc: number;
  totalFec: number;
  totalQuad: number;
  totalQuint: number;
  crossoverLevel: number;
  bracketLevel: number;
  footswitchLevel: number;
  jackLevel: number;
  sideswitchLevel: number;
  doublestepLevel: number;
  staminaLevel: number;
  isBuddy: boolean;
  name: string;
  sex: string;
  profileImg: string;
}

export interface TopScore {
  id: number;
  entrantId: number;
  dateAdded: string;
  lastUpdated: string;
  lastImproved: string;
  clearType: number;
  chartHash: string;
  fantasticPlus: number;
  fantastic: number;
  excellent: number;
  great: number;
  decent: number;
  wayOff: null;
  miss: number;
  minesHit: number;
  holdsHeld: number;
  rollsHeld: number;
  ex: number;
  points: number;
  totalPasses: number;
  crossoverLevel: number;
  bracketLevel: number;
  footswitchLevel: number;
  jackLevel: number;
  sideswitchLevel: number;
  doublestepLevel: number;
  staminaLevel: number;
}

export interface LeaderboardResponse {
  success: boolean;
  message: string;
  data: LeaderboardData;
}

export interface LeaderboardData {
  leaderboard: Leaderboard[];
  rivalMembersIds: any[];
}

export interface Leaderboard {
  id: number;
  membersId: number;
  dateAdded: string;
  lastUpdated: string;
  status: number;
  totalPoints: number;
  rankingPoints: number;
  totalPass: number;
  totalFc: number;
  totalFec: number;
  totalQuad: number;
  totalQuint: number;
  crossoverLevel: number;
  bracketLevel: number;
  footswitchLevel: number;
  jackLevel: number;
  sideswitchLevel: number;
  doublestepLevel: number;
  staminaLevel: number;
  isBuddy: boolean;
  preferences: string;
  name: string;
  sex: Sex;
  profileImg: string;
}

export enum Sex {
  Female = "Female",
  Male = "Male",
  Unspecified = "Unspecified",
}


//----

export interface EntrantScore {
  entrant: Leaderboard;
  score: number;
}

export interface ChartScore {
  topScore: TopScore;
  score: number;
}