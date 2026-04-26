import { Player } from "@/types/player";

// チーム自動分け関数
export function randomDivideTeams(
  players: Player[],  
  isConsiderPosition: boolean = false, 
  isConsiderLevel: boolean = false, 
  isConsiderYear: boolean = false,
  isConsiderGender: boolean = false,
  determinedTeamNum?: number
  ): Player[][] {
  let totalPlayers: number = players.length;
  if (totalPlayers === 0) return [];

  const teamNum: number = determinedTeamNum || Math.floor(totalPlayers / 6) || 1;
  let teams: Player[][] = Array.from({ length: teamNum }, () => []);

  let teamIndex: number = 0;

  players = shufflePlayers(players);

  // ポジションを考慮する場合、まずセッターとリベロを先に分ける
  if (isConsiderPosition) {
    const setterPlayers: Player[] = players.filter(player => player.position === "セッター");
    const liberoPlayers: Player[] = players.filter(player => player.position === "リベロ");
    players = [...players.filter(player => player.position !== "セッター" && player.position !== "リベロ")];
    totalPlayers = players.length;

    const shuffledSetterPlayers: Player[] = shufflePlayers(setterPlayers);
    const shuffledLiberoPlayers: Player[] = shufflePlayers(liberoPlayers);

    shuffledSetterPlayers.forEach((player) => {
      teams[teamIndex].push(player);
      teamIndex = (teamIndex + 1) % teamNum;
    });

    shuffledLiberoPlayers.forEach((player) => {
      teams[teamIndex].push(player);
      teamIndex = (teamIndex + 1) % teamNum;
    });

    teams = shuffleTeams(teams);
  }

  players = [...players].sort((a, b) => {
    // レベルを考慮する場合、レベルの降順でソート
    if (isConsiderLevel && a.level !== b.level) {
      return b.level - a.level;
    }
    // 性別を考慮する場合、性別順にソート
    if (isConsiderGender && a.gender !== b.gender) {
      return a.gender.localeCompare(b.gender);
    }

    // 学年を考慮する場合、学年順にソート
    if (isConsiderYear && a.year !== b.year) {
      return a.year - b.year;
    }

    // ポジションを考慮する場合、ポジション順にソート
    if (isConsiderPosition && a.position !== b.position) {
      return a.position.localeCompare(b.position);
    }

    return 0;
  });

  // シャッフルされたプレイヤーを順番にチームに割り当てる
  // 人数がバランスよくなるように一人ずつチームに追加してい木、余りは人数の少ないチームに割り当てる

  // プレイヤーをチーム数で割った余りの部分を切り分けておく
  let restPlayers: Player[] = players.slice(-1 * (totalPlayers % teamNum));
  players = players.slice(0, totalPlayers - restPlayers.length);

  teamIndex = 0;
  players.forEach((player) => {
    if (teamIndex === 0) {
      if (isConsiderLevel) {
        teams = sortTeamsByAverageLevel(teams);
      } else {
        teams = shuffleTeams(teams);
      }
    }
    teams[teamIndex].push(player);
    teamIndex = (teamIndex + 1) % teamNum;
  });
  restPlayers.forEach((player) => {
    const minTeamIndex = teams.findIndex((team) => team.length === Math.min(...teams.map((t) => t.length)));
    teams[minTeamIndex].push(player);
  });

  const totalSwaps = totalPlayers * 50; // プレイヤー数の50倍のスワップを試みる
  const initialSpread = getSpread(teams);
  for (let i = 0; i < totalSwaps; i++) {
    teams = swapPlayersBetweenTeams(
      teams, 
      isConsiderLevel, 
      isConsiderGender, 
      isConsiderYear, 
      isConsiderPosition, 
      initialSpread
    );
  }

  return teams;
}

// 学年ごとにプレイヤーを自動チーム分けする関数
export function randomDivideTeamsByYear(
  players: Player[],
  isConsiderPosition: boolean = false,
  isConsiderLevel: boolean = false,
  isConsiderGender: boolean = false
  ): Player[][] {
  const teamsByYear: Player[][] = [];
  const playersByYear: { [year: number]: Player[] } = {};

  // 学年ごとにプレイヤーを分割
  players.forEach(player => {
    if (!playersByYear[player.year]) {
      playersByYear[player.year] = [];
    }
    playersByYear[player.year].push(player);
  });

  // 学年ごとにチームを分割
  Object.values(playersByYear).forEach(yearPlayers => {
    const dividedTeams = randomDivideTeams(yearPlayers, isConsiderPosition, isConsiderLevel, false, isConsiderGender);
    teamsByYear.push(...dividedTeams);
  });
  
  return teamsByYear;
}



// Fisher-Yatesアルゴリズムを使用してプレイヤーをシャッフルする関数
const shufflePlayers = (players: Player[]): Player[] => {
  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [players[i], players[j]] = [players[j], players[i]];
  }
  return players;
}

// Fisher-Yatesアルゴリズムを使用してチームをシャッフルする関数
const shuffleTeams = (teams: Player[][]): Player[][] => {
  for (let i = teams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [teams[i], teams[j]] = [teams[j], teams[i]];
  }
  return teams;
}

// チームの平均レベルを計算する関数
const getAverageLevel = (team: Player[]): number => {
  if (team.length === 0) return 0;
  const totalLevel = team.reduce((sum, player) => sum + player.level, 0);
  return totalLevel / team.length;
}

// チームを平均レベルの昇順でソートする関数
const sortTeamsByAverageLevel = (teams: Player[][]): Player[][] => {
  return teams.sort((a, b) => getAverageLevel(a) - getAverageLevel(b));
}

// チームの戦力差（平均レベルの最大値 - 最小値）を計算する関数
const getSpread = (teams: Player[][]) => {
  const avgs = teams.map(getAverageLevel);
  return Math.max(...avgs) - Math.min(...avgs);
};

// ランダムに異なる2チーム間でプレイヤーを交換する関数
// ただし引数として制約を与えることができ、制約を満たさない場合は交換しない
export const swapPlayersBetweenTeams = (
  teams: Player[][],
  isConsiderLevel: boolean, 
  isConsiderGender: boolean, 
  isConsiderYear: boolean, 
  isConsiderPosition: boolean,
  determinedInitialSpread?: number
  ): Player[][] => {
  const teamNum = teams.length;
  if (teamNum < 2) return teams; // チームが2つ未満の場合はスワップできない

  // 初期状態の戦力差（最大平均 - 最小平均）を計算
  const initialSpread = determinedInitialSpread !== undefined ? determinedInitialSpread : getSpread(teams);

  // 異なる2つのチームをランダムに選択
  const idx1 = Math.floor(Math.random() * teamNum);
  const idx2 = (idx1 + Math.floor(Math.random() * (teamNum - 1)) + 1) % teamNum;
  const teamA = teams[idx1];
  const teamB = teams[idx2];

  if (teamA.length === 0 || teamB.length === 0) return teams;

  // それぞれのチームからプレイヤーを1人ずつランダムに選択
  const pIdxA = Math.floor(Math.random() * teamA.length);
  const pIdxB = Math.floor(Math.random() * teamB.length);
  const pA = teamA[pIdxA];
  const pB = teamB[pIdxB];
  
  // 各制約を満たすかチェックし、満たさなければスワップしない
  if (isConsiderGender && pA.gender !== pB.gender) return teams;
  if (isConsiderYear && pA.year !== pB.year) return teams;
  if (isConsiderPosition) {
    const isSpecialA = pA.position === "セッター" || pA.position === "リベロ";
    const isSpecialB = pB.position === "セッター" || pB.position === "リベロ";
    // 特殊ポジションが絡む場合、ポジションが一致していないならスルー
    if ((isSpecialA || isSpecialB) && pA.position !== pB.position) return teams;
  }
  // レベル制約: スワップ後の戦力差が悪化しすぎないか？
  if (isConsiderLevel) {
    const teamALevelAfter = getAverageLevel(teamA) + (pB.level - pA.level) / teamA.length;
    const teamBLevelAfter = getAverageLevel(teamB) + (pA.level - pB.level) / teamB.length;
    const currentAvgs = teams.map((t, idx) => {
      if (idx === idx1) return teamALevelAfter;
      if (idx === idx2) return teamBLevelAfter;
      return getAverageLevel(t);
    });
    
    const newSpread = Math.max(...currentAvgs) - Math.min(...currentAvgs);
    
    // 戦力差が初期値より0.5以上大きくなるならスワップしない
    if (newSpread > initialSpread + 0.5) return teams;
  }

  const temp = teamA[pIdxA];
  teamA[pIdxA] = teamB[pIdxB];
  teamB[pIdxB] = temp;
  return teams;
}