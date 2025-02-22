export const getCountDown = (date: string) => {
    let parNumDate = parseInt(date) * 1000;
    const countDownDate = new Date(parNumDate).getTime();
    const now = new Date().getTime();

    // Check if the countdown date is in the future
    if (countDownDate > now) {
        const distance = countDownDate - now;

        // Calculate days, hours, minutes
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        // Return the time difference in the format "days, hours, minutes"
        return `${days}d ${hours}h ${minutes}m`;
    } else {
        return "Countdown date is in the past";
    }
}