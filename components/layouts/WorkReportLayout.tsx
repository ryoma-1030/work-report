"use client";

import { StyledDrawer } from "@/components/modules/StyledDrawer";
import { useWorkReport } from "@/hooks/useWorkReport";
import { getDates } from "@/util/common";
import { CircularProgress } from "@mui/material";
import { JSX } from "react";
import { Calendar } from "@/types/Calendar";

type WorkReportLayoutProps = {
  title: string;
  children: (
    data: Calendar[],
    handleDataChange: (
      rowIndex: number,
      field: keyof Calendar,
      value: string
    ) => void
  ) => JSX.Element;
};

/**
 * 勤務表・報告書ページの共通レイアウト
 * @param {WorkReportLayoutProps} props
 * @returns 共通レイアウト
 */
export const WorkReportLayout = ({
  title,
  children,
}: WorkReportLayoutProps) => {
  const dates = getDates();
  const { year, month, data, isLoading, handleDate, handleDataChange } =
    useWorkReport();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <StyledDrawer
        dates={dates}
        handleDate={handleDate}
        year={year}
        month={month}
      />
      {year}年{month}月 {title}
      {children(data, handleDataChange)}
    </>
  );
};
