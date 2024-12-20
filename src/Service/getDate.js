const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const getDate = (date) => {
    let t = new Date(date)
    return `${t.getDate()} ${months[t.getMonth() - 1]} ${t.getFullYear()} at ${t.getHours()}:${t.getMinutes()}`
}

export function timeDiff(curr, prev) {
    var ms_Min = 120 * 1000; // milliseconds in Minute 
    var diff = curr - prev; //difference between dates. 
    // If the diff is less then milliseconds in a minute 
    if (diff < ms_Min) {
        return Math.round(diff / 1000);
        // If the diff is less then milliseconds in a Hour 
    }
}