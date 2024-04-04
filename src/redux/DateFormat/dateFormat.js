import { format } from 'date-fns';

export const dateFormat = (date, formatString = "dd MMMM, yyyy - HH:mm:ss") => {
    const dateString = date;
    const formattedDate = format(new Date(dateString), formatString);
    return formattedDate;
}
