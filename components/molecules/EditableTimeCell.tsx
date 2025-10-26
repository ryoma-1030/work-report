import { FC } from "react";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type EditableTimeCellProps = {
  value: string | null | undefined;
  onChange: (newValue: Dayjs | null) => void;
};

/**
 * 編集可能な時刻入力セル (Molecule)
 * TimePickerに特定のスタイルと振る舞いを適用します。
 */
export const EditableTimeCell: FC<EditableTimeCellProps> = ({
  value,
  onChange,
}) => (
  <TimePicker
    value={value ? dayjs(`1970-01-01T${value}`) : null}
    onChange={onChange}
    ampm={false}
    slotProps={{
      textField: {
        variant: "standard",
      },
      openPickerButton: {
        style: { display: "none" },
      },
    }}
  />
);
