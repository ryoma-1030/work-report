"use client";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArticleIcon from "@mui/icons-material/Article";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import type { FC } from "react";
import { StyledDrawerProps } from "./props/StyledDrawerProps";

/**
 * 引き出しコンポーネント（Organism）
 * @param props - プロパティ
 * @returns 引き出し（ハンバーガーメニュー？）
 */
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
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, p: 2 }} role="presentation">
          <Box>
            <Typography variant="h6">処理年月</Typography>
            <Select
              key="sideBarSelect"
              value={year && month ? toKey(year, month) : ""}
              onChange={(e) => {
                handleDate(e.target.value);
                toggleDrawer(false)(); // 日付を選択したらドロワーを閉じる
              }}
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
          </Box>
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={customOnScheduleClick}>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="勤務予定表" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={customOnReportClick}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="業務報告書" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
