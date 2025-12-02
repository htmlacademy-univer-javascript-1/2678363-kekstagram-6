function isMeetingTimeOk(workStart, workEnd, meeting, duration) {

  function timeToMinutes(timeString) {
    const timeArray = timeString.split(':');
    const hours = Number(timeArray[0]);
    const minutes= Number(timeArray[1]);
    return hours * 60 + minutes;
  }

  const workStartTime = timeToMinutes(workStart);
  const workEndTime = timeToMinutes(workEnd);
  const meetingStartTime = timeToMinutes(meeting);
  const meetingEndTime = timeToMinutes(meeting) + duration;

  if (workStartTime <= meetingStartTime && meetingEndTime <= workEndTime) {
    return true;
  }
  return false;
}

isMeetingTimeOk('08:00', '17:30', '14:00', 90);
isMeetingTimeOk('8:0', '10:0', '8:0', 120);
isMeetingTimeOk('08:00', '14:30', '14:00', 90);
isMeetingTimeOk('14:00', '17:30', '08:0', 90);
isMeetingTimeOk('8:00', '17:30', '08:00', 900);
