import { Player, PlayerInputs } from '@/types/player';

export function mapInputPositionToPlayerPosition(position: PlayerInputs['position']): Player['position'] {
  switch (position) {
    case "S":
      return "セッター";
    case "OH":
      return "レフト";
    case "OP":
      return "ライト";
    case "MB":
      return "センター";
    case "L":
      return "リベロ";
    default:
      return "未定";
  }
}

export function mapInputGenderToPlayerGender(gender: PlayerInputs['gender']): Player['gender'] {
  switch (gender) {
    case "male":
      return "男性";
    case "female":
      return "女性";
  }
}

export function mapPlayerPositionToInputPosition(position: Player['position']): PlayerInputs['position'] {
  switch (position) {
    case "セッター":
      return "S";
    case "レフト":
      return "OH";
    case "ライト":
      return "OP";
    case "センター":
      return "MB";
    case "リベロ":
      return "L";
    default:
      return "None";
  }
}

export function mapPlayerGenderToInputGender(gender: Player['gender']): PlayerInputs['gender'] {
  switch (gender) {
    case "男性":
      return "male";
    case "女性":
      return "female";
  }
}

export function mapDbPositionToPlayerPosition(position: string): Player['position'] {
  switch (position) {
    case "S":
      return "セッター";
    case "OH":
      return "レフト";
    case "OP":
      return "ライト";
    case "MB":
      return "センター";
    case "L":
      return "リベロ";
    default:
      return "未定";
  }
}

export function mapDbGenderToPlayerGender(gender: boolean): Player['gender'] {
  if (gender === false) {
    return "女性";
  } else {
    return "男性";
  }
}