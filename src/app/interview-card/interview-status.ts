export class InterviewStatus {
    static readonly Confirmed  = new InterviewStatus('Confirmed', '#8BC34A'); // Both approved
    static readonly New = new InterviewStatus('New', '#FFC107'); // Approved by current user, yet to be approved by the other person
    static readonly Pending = new InterviewStatus('Pending', '#F44336');
  
    // private to disallow creating other instances of this type
    private constructor(public readonly message: string, public readonly color: any) {
    }
  }