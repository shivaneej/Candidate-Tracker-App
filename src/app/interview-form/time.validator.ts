import { AbstractControl } from '@angular/forms';

export class TimeValidator{
    static validDuration(control : AbstractControl){
        let start = control.get('startTime').value;
        let end = control.get('endTime').value;

        var startTime = TimeValidator.convertToTime(start);
        var endTime = TimeValidator.convertToTime(end);

        console.log(startTime);
        console.log(endTime);
        console.log(startTime.hours > endTime.hours);
        console.log(startTime.hours === endTime.hours && startTime.minutes >= endTime.minutes);
        

        if(startTime.hours > endTime.hours || (startTime.hours === endTime.hours && startTime.minutes >= endTime.minutes) )
            return { invalidDuration : true };
        return null;
    }

    static convertToTime(timeString : string ) {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
          hours = '00';
        }
        if (modifier === 'PM') {
          hours = (parseInt(hours, 10) + 12).toString();
        }
        return { hours : parseInt(hours,10), minutes : parseInt(minutes,10) };
    }
}