export class DateTimeHelper {
    static convertToDateTime(date : string, time : string) {
        var [time, meridian] = time.split(' ');
        let [hrs, mins] = time.split(':');
        let hours = 0;
        if(hrs !== '12')
            hours = parseInt(hrs, 10);
        if (meridian === 'PM')
          hours += 12; 
        
        let dateTime = new Date(date);
        dateTime.setHours(hours);
        dateTime.setMinutes(parseInt(mins,10));
        var isoDateTime = new Date(dateTime.getTime() - (dateTime.getTimezoneOffset() * 60000)).toISOString();
        return isoDateTime.slice(0, 19).replace('T', ' '); ;
    }

    static convertDatetoISO(date : Date) {
        if(!date) return null;
        let dateObj = new Date(date);
        var isoDateTime = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000)).toISOString();
        return isoDateTime.split('T')[0];
    }
}