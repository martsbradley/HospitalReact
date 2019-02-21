import format from 'date-fns/format'

export function dateFormat() {
    return 'YYYY-MM-DD';
}

export function todayAsYYYYMMDD() {
    const today = format(new Date(), dateFormat());
    return today;
}

export function tomorrowAsYYYYMMDD() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = format(tomorrow, dateFormat());
    return result;
}


export function getDobString(aDate) {
    const dateString = new Date(aDate).toISOString().split('T')[0];
    return dateString;
}
