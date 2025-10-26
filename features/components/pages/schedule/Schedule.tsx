"use client";
import { CustomCalendar } from "@/components/elements/CustomCalendar";
import { WorkReportLayout } from "@/components/layouts/WorkReportLayout";

/**
 * 勤務予定表ページ
 *
 * @return 勤務予定表ページ
 */
export default function Schedule() {
  return (
    <WorkReportLayout title="勤務予定表">
      {(data, handleDataChange) => (
        <CustomCalendar data={data} onDataChange={handleDataChange} />
      )}
    </WorkReportLayout>
  );
}
