export interface ButtonProps {
  onClickHandler: () => void;
  children: React.ReactNode;
  bgc: 'filled' | 'empty';
}
