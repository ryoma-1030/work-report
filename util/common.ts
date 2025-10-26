/**
 * 10月しか取れないようにしている。
 * @returns
 */
export const getDates = () => {
  // 現在から4カ月後
  // const monthAhead = 4;
  // 現在の4カ月前
  // const monthBack = -4;
  const newDates: { year: number; month: number; selectDates: string }[] = [];

  // for (let i = monthAhead; i > monthBack; i--) {
  //   const date = new Date();
  //   let month = date.getMonth() + i;
  //   if (month <= 0) {
  //     month = month + 12;
  //   }

  //   date.setMonth(month);
  //   const year = date.getFullYear();

  //   const yearStr = year.toString();
  //   const monthStr = month.toString();

  //   newDates.push({
  //     year: year,
  //     month: month,
  //     selectDates: yearStr + "年" + monthStr + "月",
  //   });
  // }
  newDates.push({
    year: 2025,
    month: 10,
    selectDates: "2025年10月",
  });
  return newDates;
};
