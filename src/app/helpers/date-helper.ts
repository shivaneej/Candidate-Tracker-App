export function splitDateTime(start, end) {
    let dateObject = new Date(start);
    let date = dateObject.toDateString();
    let startTime = dateObject.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
    let endTime = new Date(end).toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
    return [ date, startTime, endTime ];
  }