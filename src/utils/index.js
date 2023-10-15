import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

// eslint-disable-next-line import/prefer-default-export
export function dateToString(date) {
    if (!date) {
        return "";
    }

    // 日本のタイムゾーン ('Asia/Tokyo') に変換
    const japanTimeZone = "Asia/Tokyo";
    const zonedDate = utcToZonedTime(date, japanTimeZone);

    // フォーマットしたい形式 ('yyyy/MM/dd HH:mm')
    const formatString = "yyyy/MM/dd HH:mm";

    // 日本のタイムゾーンで日付をフォーマット
    return format(zonedDate, formatString, { timeZone: japanTimeZone });
}
