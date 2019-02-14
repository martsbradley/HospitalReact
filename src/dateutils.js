import format from 'date-fns/format'

function dateFormat() {
    return 'YYYY-MM-DD';
}

export function todayAsYYYYMMDD() {
    const today = format(new Date(), dateFormat());
    return today;
}

export function getDobString(aDate) {
    const dateString = new Date(aDate).toISOString().split('T')[0];
    return dateString;
}
