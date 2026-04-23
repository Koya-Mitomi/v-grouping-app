export type Team = {
  id: number;
  team_name: string;
  event_id: number;
  user_id: string;
};

export type TeamMember = {
  id: number;
  user_id: string;
  team_id: number;
  player_id: number;
};
