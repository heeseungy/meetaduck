export interface MissionContent {
  missionStatusId: number;
  confirmTime: string | null;
  missionContent: string;
}

export interface MissionResult extends MissionContent {
  guestId: number;
  getTime: string;
  successTime: string | null;
  missionImageUrl: string | null;
}

export interface MissionResultList {
  manitoMission: MissionResult[];
  myMission: MissionResult[];
}

export interface MissionCompletePageProps {
  tag: number;
  date: number;
}
