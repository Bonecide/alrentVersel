export const convertData = (data) => {
    const inputDate = new Date(data);
    const options = {weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: false};
    const outputDate = inputDate.toLocaleString('ru-RU', options);
    return outputDate
};