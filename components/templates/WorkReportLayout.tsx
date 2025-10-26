"use client";

import { StyledDrawer } from "@/components/organisms/StyledDrawer";
import { useWorkReport } from "@/hooks/useWorkReport";
import { getDates } from "@/util/common";
import { Box, CircularProgress, Typography } from "@mui/material";
import { JSX } from "react";
import { Calendar } from "@/types/Calendar";
import dynamic from "next/dynamic";

type WorkReportLayoutProps = {
  title: string;
  children: (
    data: Calendar[],
    handleDataChange: (
      rowIndex: number,
      field: keyof Calendar,
      value: string | boolean
    ) => void
  ) => JSX.Element;
};

/**
 * 勤務表・報告書ページの共通レイアウト
 * @param {WorkReportLayoutProps} props
 * @returns 共通レイアウト
 */
const WorkReportLayoutComponent = ({
  title,
  children,
}: WorkReportLayoutProps) => {
  const dates = getDates();
  const { year, month, data, isLoading, handleDate, handleDataChange } =
    useWorkReport();

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <StyledDrawer
          dates={dates}
          handleDate={handleDate}
          year={year}
          month={month}
        />
        <Typography variant="h5" component="h1">
          {year}年{month}月 {title}
        </Typography>
      </Box>
      {children(data, handleDataChange)}
    </Box>
  );
};

export const WorkReportLayout = dynamic(
  () => Promise.resolve(WorkReportLayoutComponent),
  { ssr: false, loading: () => <CircularProgress /> }
);
