import { useState, useEffect } from "react";
import { Calendar } from "@/types/Calendar";
import { reportData } from "@/data/report";
import { scheduleData } from "@/data/schedule";
import { usePathname } from "next/navigation";

/**
 * 共通フック
 */
export const useWorkReport = () => {
  const pathname = usePathname();
  // 仮実装のため2025年
  const [year, setYear] = useState<number | null>(2025);
  // 仮実装のため10月
  const [month, setMonth] = useState<number | null>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true); // マウントされるまではローディング扱い
  const [data, setData] = useState<Calendar[]>([]);

  const handleDate = (key: string) => {
    const [y, m] = key.split("-");
    const newYear = Number(y);
    const newMonth = Number(m); // 1-12
    setIsLoading(true); // 日付変更時にローディングを開始
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleDataChange = (
    rowIndex: number,
    field: keyof Calendar,
    value: string | boolean
  ) => {
    const updatedData = [...data];
    // スプレッド構文で特定のプロパティを安全に更新
    updatedData[rowIndex] = { ...updatedData[rowIndex], [field]: value };
    setData(updatedData);
  };

  // 初回レンダリング後に日付を初期化し、データを取得する
  useEffect(() => {
    const fetchData = () => {
      const targetYear = year ?? new Date().getFullYear();
      const targetMonth = month ?? new Date().getMonth() + 1;

      // URLに応じてデータソースを切り替える
      const dataSource = pathname.includes("/report")
        ? reportData
        : scheduleData;

      const foundData = dataSource.find(
        (d) => d.year === targetYear && d.month === targetMonth
      ) ?? {
        year: targetYear,
        month: targetMonth,
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

    if (year === null && month === null) {
      const today = new Date();
      setYear(today.getFullYear());
      setMonth(today.getMonth() + 1);
    } else if (year !== null && month !== null) {
      fetchData();
    }
  }, [year, month, pathname]);

  return { year, month, data, isLoading, handleDate, handleDataChange };
};
