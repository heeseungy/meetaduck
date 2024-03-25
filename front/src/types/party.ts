export enum StatusType {
  'Todo' = 0,
  'InProgress' = 1,
  'Before24' = 2,
  'Complete' = 3,
}

export interface Party {
  partyId: number;
  accessCode: string;
  partyName: string;
  startTime: string;
  endTime: string;
  deleted: boolean;
  userId: number;
}
export interface PartyStatus {
  status: number;
}

export enum Role {
  Manito = 2, //내가 마니또일때
  Maniti = 1, //내가 마니띠일때
}
