export enum StatusType {
  'Todo' = 0,
  'InProgress' = 1,
  'Complete' = 2,
}

export interface Party {
  partyId: number;
  accessCode: string;
  startTime: string;
  endTime: string;
  deleted: boolean;
  userId: number;
}
export interface PartyStatus {
  status: number;
}
