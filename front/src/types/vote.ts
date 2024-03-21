import { ChangeEvent, InputHTMLAttributes } from 'react';

import { ListProfile } from '@/types/user.interface';

export interface VoteRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  candidate: ListProfile;
}

export interface RadioBtnGroupProps {
  partyList: ListProfile[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
}
