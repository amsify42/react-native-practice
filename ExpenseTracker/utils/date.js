export function formatDate(date) {
    return `${date.getFullYear()}-${(date.getMonth()<9? '0': '')+(date.getMonth()+1)}-${(date.getDate()<9? '0': '')+date.getDate()}`
}

export function isDateDaysAgo(date, days=7) {
    const currDate = new Date();
    const diffTime = Math.abs(currDate - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return (diffDays <= days)? true: false
}