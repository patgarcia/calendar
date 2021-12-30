class Calendar {
  constructor(month, day, year) {
    this.currDate = new Date(year, month - 1, day); // month is 0 indexed
    this.getCalendarMonth();
  }

  get date() {
    return this.currDate;
  }

  set date(date) {
    this.currDate = new Date(date);
    this.getCalendarMonth();
  }

  getDayOfTheWeekName(date, lang = 'en-us', format = 'long') {
    return date.toLocaleString(lang, { weekday: format });
  }

  getCalendarMonth() {
    const calMonth = this.date.getMonth();
    const movingDate = new Date(this.date.getFullYear(), this.date.getMonth());
    const daysOfMonth = Array(31)
      .fill()
      .map((_, i) => {
        if (!i) return new Date(movingDate);
        movingDate.setDate(movingDate.getDate() + 1);
        if (movingDate.getMonth() === calMonth) {
          return new Date(movingDate);
        }
      });
    this.calendarMonth = daysOfMonth.filter(day => day);
    return this.calendarMonth;
  }

  getDayObject(date) {
    return {
      active: date.getMonth() === this.date.getMonth(),
      weekdayName: this.getDayOfTheWeekName(date),
      weekday: date.getDay(),
      position: this.getDayPosition(date),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }

  getMonthGrid() {
    return this.calendarMonth.map(date => this.getDayObject(date));
  }

  getDayPosition(date) {
    // 0 - Sunday
    const monthStartingDay = this.calendarMonth[0].getDay();
    return monthStartingDay + date.getDate();
  }
}

Calendar.prototype.toString = function () {
  return `Calendar: ${this.date.toDateString()}`;
};
Calendar.prototype.inspect = function () {
  return this.toString();
};
