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

export function translateErrors(code) {
    const error = {
        title: `ERROR(${code})`,
        description: "再度時間をおいてお試しください",
    };
    switch (code) {
        case "auth/invalid-email":
            error.description = "メールアドレスが不正です";
            break;
        case "auth/user-disabled":
            error.description = "アカウントが無効です";
            break;
        case "auth/user-not-found":
            error.description = "ユーザが見つかりません";
            break;
        case "auth/wrong-password":
            error.description = "パスワードが間違っています";
            break;
        case "auth/invalid-login-credentials":
            error.description = "パスワードが間違っています";
            break;
        case "auth/email-already-in-use":
            error.description = "登録済みのメールアドレスです";
            break;
        case "auth/operation-not-allowed":
            error.description = "開発者にお問い合わせください";
            break;
        case "auth/missing-email":
            error.description = "メールアドレスが設定されていません";
            break;
        case "auth/weak-password":
            error.description = "パスワードが簡単すぎます";
            break;
        case "auth/missing-password":
            error.description = "パスワードが設定されていません";
            break;
        case "permission-denied":
            error.description = "データの取得に失敗しました";
            break;
        default:
    }
    return error;
}
