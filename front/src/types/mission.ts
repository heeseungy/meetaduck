export interface MissionContent {
  missionStatusId: number;
  confirmTime: string | null;
  missionContent: string;
  missionImageUrl: string | null;
}

export interface MissionResult extends MissionContent {
  guestId: number;
  getTime: string;
  successTime: string | null;
  failedTime: string | null;
}

export interface MissionResultList {
  manitoMission: MissionResult[];
  myMission: MissionResult[];
}

export interface MissionCompletePageProps {
  tag: number;
  date: number;
}
