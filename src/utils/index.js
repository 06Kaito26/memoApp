import { add, format } from "date-fns";

// eslint-disable-next-line import/prefer-default-export
export function dateToString(date) {
    if (!date) {
        return "";
    }
    // 日本の時間にならないので取得した時間 + 9時間として日本時間に合わせる（原因不明）
    const futureDate = add(date, { hours: 9 });
    // console.log(format(futureDate, "yyyy年M月d日 HH時mm分"));
    return format(futureDate, "yyyy年M月d日 HH時mm分", { timeZone: "Asia/Tokyo" });
}
