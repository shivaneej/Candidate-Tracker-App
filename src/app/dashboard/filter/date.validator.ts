import { AbstractControl } from '@angular/forms';

export class DateValidator{
    static validDuration(control : AbstractControl){
        let start = control.get('start');
        let end = control.get('end');
        
        if(start.value > end.value)
            return { invalidDuration : true };
        if((start.value === '' && end.value !== '') || (start.value !== '' && end.value === ''))
            return { invalidDuration : true };
        return null;
    }
}