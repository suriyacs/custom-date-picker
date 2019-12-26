import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'date-calendar',
  styleUrl: 'calendar.scss'
})

export class Calendar {
  oneDay = 60 * 60 * 24 * 1000;
  todayTimestamp = Date.now() - (Date.now() % this.oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);
  daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  @State() year: any;
  @State() month: any;
  @State() selectedDay : any;
  @State() monthDetails: any;
  /**
   * The first name
   */
  @Prop() onChange: Function;
  @Prop() inputRef: HTMLInputElement;
  constructor() {
    let date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.selectedDay = this.todayTimestamp;
    this.monthDetails = this.getMonthDetails(this.year, this.month);

  }

  getMonthDetails(year, month) {
    let firstDay = (new Date(year, month)).getDay();
    let numberOfDays = this.getNumberOfDays(year, month);
    let monthArray = [];
    let rows = 6;
    let currentDay = null;
    let index = 0; 
    let cols = 7;

    for(let row=0; row<rows; row++) {
      for(let col=0; col<cols; col++) { 
        currentDay = this.getDayDetails({
            index,
            numberOfDays,
            firstDay,
            year,
            month
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  }

  isCurrentDay(day) {
    return day.timestamp === this.todayTimestamp;
  }

  isSelectedDay(day) {
    return day.timestamp === this.selectedDay;
  }

  getDateFromDateString(dateValue) {
    let dateData = dateValue.split('-').map(d => parseInt(d, 10));
    if(dateData.length < 3) 
        return null;

    let year = dateData[0];
    let month = dateData[1];
    let date = dateData[2];
    return {year, month, date};
  }

  getMonthStr = month => this.monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

  getDateStringFromTimestamp(timestamp) {
    let dateObject = new Date(timestamp);
    let month = dateObject.getMonth()+1;
    let date = dateObject.getDate();
    return dateObject.getFullYear() + '-' + (month < 10 ? '0'+month : month) + '-' + (date < 10 ? '0'+date : date);
  }

  setDate(dateData){
    let selectedDay = new Date(dateData.year, dateData.month-1, dateData.date).getTime();
    this.selectedDay = selectedDay;
    if(this.onChange) {
        this.onChange(selectedDay);
    }
  }

  getDayDetails(args) {
    let date = args.index - args.firstDay; 
    let day = args.index%7;
    let prevMonth = args.month-1;
    let prevYear = args.year;
    if(prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
    }
    let prevMonthNumberOfDays = this.getNumberOfDays(prevYear, prevMonth);
    let _date = (date < 0 ? prevMonthNumberOfDays+date : date % args.numberOfDays) + 1;
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    let timestamp = new Date(args.year, args.month, _date).getTime();
    return {
        date: _date,
        day,
        month, 
        timestamp,
        dayString: this.daysMap[day]
    }
  }

  onDateClick(day){
    this.selectedDay = day.timestamp;
    this.setDateToInput(day.timestamp);
    if(this.onChange) {
        this.onChange(day.timestamp);
    }
  }

  setDateToInput(timestamp){
    let dateString = this.getDateStringFromTimestamp(timestamp);
    this.inputRef.value = dateString;
  }

  getNumberOfDays(year, month) {
    return 40 - new Date(year, month, 40).getDate();
  }

  setYear(offset){
    let year = this.year + offset;
    let month = this.month;
    this.year = year;
    this.monthDetails = this.getMonthDetails(year, month);
  }

  setMonth(offset) {
    let year = this.year;
    let month = this.month + offset;
    if(month === -1) {
        month = 11;
        year--;
    } else if(month === 12) {
        month = 0;
        year++;
    }
    this.year = year;
    this.month = month;
    this.monthDetails = this.getMonthDetails(year, month);
  }

  /**
   *  Renderers
   */
  renderCalendar() {
    let days = this.monthDetails.map((day, index)=> {
      return (
        <div class={'c-day-container ' + (day.month !== 0 ? ' disabled' : '') + 
          (this.isCurrentDay(day) ? ' highlight' : '') + (this.isSelectedDay(day) ? ' highlight-green' : '')} key={index}>
          <div class='cdc-day'>
              <span onClick={()=>this.onDateClick(day)}>
                  {day.date}
              </span>
          </div>
        </div>
      )
    });

    return (
      <div class='c-container'>
        <div class='cc-head'>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d,i)=><div key={i} class='cch-name'>{d}</div>)}
        </div>
        <div class='cc-body'>
            {days}
        </div>
      </div>
    )
  }


  render() {
    return (
      <Host>
        <div class="mdp-container">
          <div class='mdpc-head'>
            <div class='mdpch-button'>
                <div class='mdpchb-inner' onClick={() => this.setYear(-1)}>
                    <span class='mdpchbi-left-arrows'></span>
                </div>
            </div>
              <div class='mdpch-button'>
                  <div class='mdpchb-inner' onClick={() => this.setMonth(-1)}>
                      <span class='mdpchbi-left-arrow'></span>
                  </div>
              </div>
              <div class='mdpch-container'>
                  <div class='mdpchc-year'>{this.year}</div>
                  <div class='mdpchc-month'>{this.getMonthStr(this.month)}</div>
              </div>
              <div class='mdpch-button'>
                  <div class='mdpchb-inner' onClick={() => this.setMonth(1)}>
                      <span class='mdpchbi-right-arrow'></span>
                  </div>
              </div>
              <div class='mdpch-button' onClick={() => this.setYear(1)}>
                  <div class='mdpchb-inner'>
                      <span class='mdpchbi-right-arrows'></span>
                  </div>
              </div>
          </div>
          <div class='mdpc-body'>
              {this.renderCalendar()}
          </div>
        </div>
      </Host>
    );
  }

}
