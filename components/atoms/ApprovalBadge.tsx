import { FC } from "react";
import { Typography } from "@mui/material";

type ApprovalBadgeProps = {
  isApproved: boolean;
};

/**
 * 承認ステータスを表示するバッジ (Atom)
 */
export const ApprovalBadge: FC<ApprovalBadgeProps> = ({ isApproved }) => {
  if (!isApproved) {
    return null;
  }

  // 円形のスタイルなどをここに適用できる
  return <Typography>〇</Typography>;
};
