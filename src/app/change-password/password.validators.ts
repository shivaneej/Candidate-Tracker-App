import { AbstractControl } from '@angular/forms';

export class PasswordValidators{
    static passwordsMatch(control : AbstractControl){
        let newPassword = control.get('newPassword');
        let confirmPassword = control.get('confirmPassword');

        if(newPassword.value !== confirmPassword.value)
            return { passwordsMatch : true };
        return null;
    }
}