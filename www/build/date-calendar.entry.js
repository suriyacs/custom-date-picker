import { r as registerInstance, h, H as Host } from './core-9a4ba90f.js';

const Calendar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.oneDay = 60 * 60 * 24 * 1000;
        this.todayTimestamp = Date.now() - (Date.now() % this.oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);
        this.daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.getDateFromDateString = dateValue => {
            let dateData = dateValue.split('-').map(d => parseInt(d, 10));
            if (dateData.length < 3)
                return null;
            let year = dateData[0];
            let month = dateData[1];
            let date = dateData[2];
            return { year, month, date };
        };
        this.getMonthStr = month => this.monthMap[Math.max(Math.min(11, month), 0)] || 'Month';
        this.getDateStringFromTimestamp = timestamp => {
            let dateObject = new Date(timestamp);
            let month = dateObject.getMonth() + 1;
            let date = dateObject.getDate();
            return dateObject.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
        };
        this.setDate = dateData => {
            let selectedDay = new Date(dateData.year, dateData.month - 1, dateData.date).getTime();
            this.selectedDay = selectedDay;
            if (this.onChange) {
                this.onChange(selectedDay);
            }
        };
        this.onDateClick = day => {
            this.selectedDay = day.timestamp;
            this.setDateToInput(day.timestamp);
            if (this.onChange) {
                this.onChange(day.timestamp);
            }
        };
        this.setDateToInput = (timestamp) => {
            let dateString = this.getDateStringFromTimestamp(timestamp);
            this.inputRef.value = dateString;
        };
        this.setYear = offset => {
            let year = this.year + offset;
            let month = this.month;
            this.year = year;
            this.monthDetails = this.getMonthDetails(year, month);
        };
        this.setMonth = offset => {
            let year = this.year;
            let month = this.month + offset;
            if (month === -1) {
                month = 11;
                year--;
            }
            else if (month === 12) {
                month = 0;
                year++;
            }
            this.year = year;
            this.month = month;
            this.monthDetails = this.getMonthDetails(year, month);
        };
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
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
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
    getDayDetails(args) {
        let date = args.index - args.firstDay;
        let day = args.index % 7;
        let prevMonth = args.month - 1;
        let prevYear = args.year;
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        let prevMonthNumberOfDays = this.getNumberOfDays(prevYear, prevMonth);
        let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
        let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        let timestamp = new Date(args.year, args.month, _date).getTime();
        return {
            date: _date,
            day,
            month,
            timestamp,
            dayString: this.daysMap[day]
        };
    }
    getNumberOfDays(year, month) {
        return 40 - new Date(year, month, 40).getDate();
    }
    /**
     *  Renderers
     */
    renderCalendar() {
        let days = this.monthDetails.map((day, index) => {
            return (h("div", { class: 'c-day-container ' + (day.month !== 0 ? ' disabled' : '') +
                    (this.isCurrentDay(day) ? ' highlight' : '') + (this.isSelectedDay(day) ? ' highlight-green' : ''), key: index }, h("div", { class: 'cdc-day' }, h("span", { onClick: () => this.onDateClick(day) }, day.date))));
        });
        return (h("div", { class: 'c-container' }, h("div", { class: 'cc-head' }, ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => h("div", { key: i, class: 'cch-name' }, d))), h("div", { class: 'cc-body' }, days)));
    }
    render() {
        return (h(Host, null, h("div", { class: "mdp-container" }, h("div", { class: 'mdpc-head' }, h("div", { class: 'mdpch-button' }, h("div", { class: 'mdpchb-inner', onClick: () => this.setYear(-1) }, h("span", { class: 'mdpchbi-left-arrows' }))), h("div", { class: 'mdpch-button' }, h("div", { class: 'mdpchb-inner', onClick: () => this.setMonth(-1) }, h("span", { class: 'mdpchbi-left-arrow' }))), h("div", { class: 'mdpch-container' }, h("div", { class: 'mdpchc-year' }, this.year), h("div", { class: 'mdpchc-month' }, this.getMonthStr(this.month))), h("div", { class: 'mdpch-button' }, h("div", { class: 'mdpchb-inner', onClick: () => this.setMonth(1) }, h("span", { class: 'mdpchbi-right-arrow' }))), h("div", { class: 'mdpch-button', onClick: () => this.setYear(1) }, h("div", { class: 'mdpchb-inner' }, h("span", { class: 'mdpchbi-right-arrows' })))), h("div", { class: 'mdpc-body' }, this.renderCalendar()))));
    }
    static get style() { return ":host {\n  display: block;\n  /**\n   * Controls\n   */\n  /**\n   *  Calendar\n   */\n}\n:host .mdp-container {\n  float: left;\n  position: absolute;\n  left: 0;\n  top: 40px;\n  width: 300px;\n  min-height: 350px;\n  background: #fff;\n  -webkit-box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.2);\n  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.2);\n  border-radius: 20px;\n  overflow: hidden;\n  padding: 25px 30px;\n}\n:host .mdp-container {\n  float: left;\n  position: absolute;\n  left: 0;\n  top: 40px;\n  width: 300px;\n  min-height: 350px;\n  background: #fff;\n  -webkit-box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.2);\n  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.2);\n  border-radius: 20px;\n  overflow: hidden;\n  padding: 25px 30px;\n}\n:host .mdpc-head {\n  float: left;\n  width: 100%;\n  height: 53px;\n}\n:host .mdpc-body {\n  float: left;\n  width: 100%;\n  margin-top: 20px;\n}\n:host .mdpch-button {\n  float: left;\n  width: 45px;\n  height: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  position: relative;\n}\n:host .mdpchb-inner:hover > span {\n  border-color: #555 !important;\n}\n:host .mdpchb-inner:hover {\n  cursor: pointer;\n  background: #eee;\n}\n:host .mdpchb-inner {\n  float: left;\n  height: 35px;\n  width: 35px;\n  background: #f4f4f4;\n  border-radius: 100%;\n  line-height: 35px;\n  text-align: center;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-left: -17px;\n  margin-top: -17px;\n}\n:host .mdpchbi-right-arrows:after,\n:host .mdpchbi-left-arrows:after,\n:host .mdpchbi-right-arrow,\n:host .mdpchbi-right-arrows,\n:host .mdpchbi-left-arrow,\n:host .mdpchbi-left-arrows {\n  display: block;\n  float: left;\n  width: 6px;\n  height: 6px;\n  border-left: 2px solid #888;\n  border-bottom: 2px solid #888;\n  position: absolute;\n}\n:host .mdpchbi-right-arrow,\n:host .mdpchbi-right-arrows,\n:host .mdpchbi-left-arrow,\n:host .mdpchbi-left-arrows {\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg);\n  left: 50%;\n  top: 50%;\n  margin-left: -2px;\n  margin-top: -4px;\n}\n:host .mdpchbi-right-arrows,\n:host .mdpchbi-right-arrow {\n  -webkit-transform: rotate(225deg);\n  transform: rotate(225deg);\n  margin-left: -4px;\n}\n:host .mdpchbi-right-arrows:after,\n:host .mdpchbi-left-arrows:after {\n  content: \"\";\n}\n:host .mdpchbi-left-arrows {\n  margin-left: -5px;\n}\n:host .mdpchbi-right-arrows {\n  margin-left: -2px;\n}\n:host .mdpchbi-right-arrows:after,\n:host .mdpchbi-left-arrows:after {\n  left: 3px;\n  top: -5px;\n}\n:host .mdpch-container {\n  float: left;\n  width: 120px;\n  height: 100%;\n}\n:host .mdpchc-year {\n  float: left;\n  width: 100%;\n  height: 30px;\n  font-size: 27px;\n  color: #666;\n  font-weight: 200px;\n  text-align: center;\n}\n:host .mdpchc-month {\n  float: left;\n  width: 100%;\n  height: 15px;\n  font-size: 13px;\n  color: #666;\n  font-weight: 200px;\n  text-align: center;\n}\n:host .cc-month,\n:host .cc-head,\n:host .cch-name,\n:host .cc-body,\n:host .cdc-day span,\n:host .cdc-day,\n:host .c-day-container,\n:host .c-container {\n  position: relative;\n  display: block;\n  float: left;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n:host .c-container {\n  width: 100%;\n  height: 100%;\n}\n:host .cc-month {\n  height: 30px;\n  width: 100%;\n  font-family: Roboto;\n  font-size: 16px;\n  line-height: 30px;\n  color: #666;\n}\n:host .cc-head {\n  height: 30px;\n  width: 100%;\n  margin-top: 10px;\n}\n:host .cch-name {\n  width: 14.285%;\n  height: 30px;\n  line-height: 30px;\n  font-weight: 700;\n  color: #666;\n  font-size: 9px;\n  text-align: center;\n}\n:host .cc-body {\n  height: 270px;\n  width: 100%;\n}\n:host .c-day-container {\n  width: 14.285%;\n  height: 16.6666%;\n}\n:host .cdc-day {\n  width: 100%;\n  height: 100%;\n  font-size: 12px;\n  font-weight: 300;\n  color: #444;\n  text-align: center;\n}\n:host .cdc-day span {\n  width: 100%;\n  height: 100%;\n  font-size: 12px;\n  font-weight: 300;\n  color: #444;\n}\n:host .cdc-day span:hover {\n  cursor: pointer;\n  background: #eee;\n}\n:host .cdc-day span {\n  width: 30px;\n  height: 30px;\n  margin-top: -15px;\n  margin-left: -15px;\n  left: 50%;\n  top: 50%;\n  font-weight: 400;\n  border-radius: 100%;\n  line-height: 30px;\n}\n:host .c-day-container.disabled {\n  pointer-events: none;\n}\n:host .c-day-container.disabled .cdc-day span {\n  color: #ddd;\n}\n:host .c-day-container.disabled .cdc-day span {\n  background: #fff !important;\n}\n:host .c-day-container.highlight .cdc-day span {\n  background: #efdbca;\n}\n:host .c-day-container.highlight-green .cdc-day span {\n  background: #d4e2cb;\n}"; }
};

export { Calendar as date_calendar };
