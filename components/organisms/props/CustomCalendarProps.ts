import { Calendar } from "@/types/Calendar";

export type CustomCalendarProps = {
  data: Calendar[];
  onDataChange: (
    rowIndex: number,
    field: keyof Calendar,
    value: string | boolean
  ) => void;
};
