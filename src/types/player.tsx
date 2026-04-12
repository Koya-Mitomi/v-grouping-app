export type Player = {
  id: number;
  user_id: string;
  name: string;
  position: "セッター" | "レフト" | "ライト" | "センター" | "リベロ" | "未定";
  level: 1 | 2 | 3 | 4;
  year: number;
  gender: "男性" | "女性";
  is_active: boolean;
}

export type PlayerInputs = {
  name: string;
  position: "S" | "OH" | "OP" | "MB" | "L" | "None";
  level: 1 | 2 | 3 | 4;
  year: number;
  gender: "male" | "female";
}