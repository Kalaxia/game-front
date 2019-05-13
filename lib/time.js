export const getRemainingTimeString = date => {
    const milliseconds = date.getTime() - (new Date()).getTime();
    return (milliseconds > 0) ? new Date(milliseconds).toISOString().substr(11, 8) : '00:00:00';
};