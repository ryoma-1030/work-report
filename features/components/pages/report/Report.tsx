"use client";
import { CustomCalendar } from "@/components/elements/CustomCalendar";
import { WorkReportLayout } from "@/components/layouts/WorkReportLayout";

/**
 * 業務報告書ページ
 *
 * @return 業務報告書ページ
 */
export default function Report() {
  return (
    <WorkReportLayout title="業務報告書">
      {(data, handleDataChange) => (
        <CustomCalendar data={data} onDataChange={handleDataChange} />
      )}
    </WorkReportLayout>
  );
}
