import { useState, useEffect } from "react";
import { Calendar } from "@/types/Calendar";
import { reportData } from "@/data/report";

/**
 * 共通フック
 */
export const useWorkReport = () => {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1); //1-12で管理
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Calendar[]>([]);

  const handleDate = (key: string) => {
    const [y, m] = key.split("-");
    const newYear = Number(y);
    const newMonth = Number(m); // 1-12
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleDataChange = (
    rowIndex: number,
    field: keyof Calendar,
    value: string
  ) => {
    const updatedData = [...data];
    // 型アサーションを使用して特定のプロパティを更新
    (updatedData[rowIndex] as any)[field] = value;
    setData(updatedData);
  };

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      const foundData = reportData.find(
        (d) => d.year === year && d.month === month
      ) ?? {
        year: year,
        month: month,
        records: [],
      };

      // reportDataのプロパティ名をCalendar型にマッピングする
      const mappedData: Calendar[] = foundData.records.map((record: any) => ({
        date: record.date,
        day: record.day,
        attendance: record.attendance,
        startTime: record.startTime,
        endTime: record.endTime,
        dayOff: record.dayOff,
        workTime: record.workTime,
        npc: record.npc,
        pj: record.pj,
        approval: record.approval,
      }));

      setData(mappedData);
      setIsLoading(false);
    };

    fetchData();
  }, [year, month]);

  return { year, month, data, isLoading, handleDate, handleDataChange };
};
