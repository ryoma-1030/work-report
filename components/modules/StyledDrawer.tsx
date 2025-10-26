"use client";
import {
  Box,
  Button,
  Drawer,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import type { FC } from "react";

type StyledDrawerProps = {
  dates: { year: number; month: number; selectDates: string }[];
  handleDate: (key: string) => void;
  year: number;
  month: number; // 1-12
};

export const StyledDrawer: FC<StyledDrawerProps> = ({
  dates,
  handleDate,
  year,
  month,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = useCallback(
    (open: boolean) => () => setIsOpen(open),
    []
  );

  const router = useRouter();
  const customOnReportClick = useCallback(() => {
    router.push("./report");
  }, [router]);
  const customOnScheduleClick = useCallback(() => {
    router.push("./schedule");
  }, [router]);

  const toKey = (year: number, month: number): string => {
    return year.toString() + "-" + month.toString();
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Open SideBar</Button>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Typography variant="h6">処理年月</Typography>
          <Select
            key="sideBarSelect"
            value={toKey(year, month)}
            onChange={(e) => handleDate(e.target.value)}
            fullWidth
          >
            {dates.map((date) => (
              <MenuItem
                key={toKey(date.year, date.month)}
                value={toKey(date.year, date.month)}
              >
                {`${date.year}年${date.month}月`}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={customOnScheduleClick} fullWidth sx={{ mt: 2 }}>
            勤務予定表
          </Button>
          <Button onClick={customOnReportClick} fullWidth sx={{ mt: 1 }}>
            業務報告書
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
