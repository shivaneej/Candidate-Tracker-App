export class InterviewStatus {
    static readonly Confirmed  = new InterviewStatus('Confirmed', '#8BC34A');
    static readonly Pending = new InterviewStatus('Pending', '#FFC107');
    static readonly Reschedule = new InterviewStatus('Reschedule', '#F44336');
  
    // private to disallow creating other instances of this type
    private constructor(public readonly message: string, public readonly color: any) {
    }
  }