export type StyledDrawerProps = {
  dates: { year: number; month: number; selectDates: string }[];
  handleDate: (key: string) => void;
  year: number | null;
  month: number | null;
};
