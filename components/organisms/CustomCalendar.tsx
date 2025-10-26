import { FC, JSX } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { TableCell, TextField, Select, MenuItem } from "@mui/material";
import { Calendar } from "@/types/Calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { EditableTimeCell } from "../molecules/EditableTimeCell";
import { ApprovalBadge } from "../atoms/ApprovalBadge";

type CustomCalendarProps = {
  data: Calendar[];
  onDataChange: (
    rowIndex: number,
    field: keyof Calendar,
    value: string | boolean
  ) => void;
};

/**
 * MUIコンポーネントをカスタムしたコンポーネント（Organism）
 * @param props - プロパティ
 * @returns カスタムカレンダー
 */
export const CustomCalendar: FC<CustomCalendarProps> = (
  props: CustomCalendarProps
): JSX.Element => {
  //プロパティ取得
  const { data, onDataChange } = props;

  const handleTimeChange = (
    rowIndex: number,
    field: keyof Calendar,
    newValue: Dayjs | null
  ) => {
    onDataChange(rowIndex, field, newValue ? newValue.format("HH:mm") : "");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper>
          <TableContainer>
            <Table
              sx={{
                maxWidth: 1200,
                "& .MuiTableCell-root": {
                  border: "1px solid rgba(224, 224, 224, 1)",
                },
                "& .MuiInputBase-root": { width: "80px" },
              }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell align="center">日</TableCell>
                  <TableCell align="center">曜日</TableCell>
                  <TableCell align="center">出欠</TableCell>
                  <TableCell align="center">出勤時刻</TableCell>
                  <TableCell align="center">退勤時刻</TableCell>
                  <TableCell align="center">日休</TableCell>
                  <TableCell align="center">出勤時間</TableCell>
                  <TableCell align="center">NPC</TableCell>
                  <TableCell align="center">PJ</TableCell>
                  <TableCell align="center">承認</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, rowIndex) => {
                  return (
                    <TableRow
                      key={`${rowIndex}-${row.date}`} // keyをデータに基づいた一意な値に変更
                      sx={{
                        backgroundColor:
                          row.day === "土" ||
                          row.day === "日" ||
                          row.day === "祝"
                            ? "#f9f9f9"
                            : "inherit",
                        color:
                          row.day === "日" || row.day === "祝"
                            ? "red"
                            : row.day === "土"
                            ? "blue"
                            : "inherit",
                      }}
                    >
                      <TableCell align="center" sx={{ color: "inherit" }}>
                        {row.date}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "inherit" }}>
                        {row.day}
                      </TableCell>
                      <TableCell align="center">
                        <Select
                          value={row.attendance}
                          onChange={(e) =>
                            onDataChange(rowIndex, "attendance", e.target.value)
                          }
                          variant="standard"
                        >
                          <MenuItem value="出勤">出勤</MenuItem>
                          <MenuItem value="欠勤">欠勤</MenuItem>
                          <MenuItem value="有給">有給</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <EditableTimeCell
                          value={row.startTime}
                          onChange={(newValue) =>
                            handleTimeChange(rowIndex, "startTime", newValue)
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <EditableTimeCell
                          value={row.endTime}
                          onChange={(newValue) =>
                            handleTimeChange(rowIndex, "endTime", newValue)
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <EditableTimeCell
                          value={row.dayOff}
                          onChange={(newValue) =>
                            handleTimeChange(rowIndex, "dayOff", newValue)
                          }
                        />
                      </TableCell>
                      <TableCell align="center">{row.workTime}</TableCell>
                      <TableCell align="center">
                        <TextField
                          value={row.npc}
                          onChange={(e) =>
                            onDataChange(rowIndex, "npc", e.target.value)
                          }
                          variant="standard"
                        />
                      </TableCell>
                      <TableCell align="center">{row.pj}</TableCell>
                      <TableCell align="center">
                        <ApprovalBadge isApproved={row.approval} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};
