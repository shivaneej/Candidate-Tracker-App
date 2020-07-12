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
        return dateTime;
    }
}