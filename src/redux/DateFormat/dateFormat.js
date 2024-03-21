import {format} from 'date-fns'

export const dateFormat = (date) => {
    const dateString = date;
     const formattedDate = format(new Date(dateString), "dd MMMM, yyyy HH:mm:ss");
     return formattedDate;
}
