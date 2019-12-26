import { Host, h } from "@stencil/core";
export class Calendar {
    constructor() {
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
                    (this.isCurrentDay(day) ? ' highlight' : '') + (this.isSelectedDay(day) ? ' highlight-green' : ''), key: index },
                h("div", { class: 'cdc-day' },
                    h("span", { onClick: () => this.onDateClick(day) }, day.date))));
        });
        return (h("div", { class: 'c-container' },
            h("div", { class: 'cc-head' }, ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => h("div", { key: i, class: 'cch-name' }, d))),
            h("div", { class: 'cc-body' }, days)));
    }
    render() {
        return (h(Host, null,
            h("div", { class: "mdp-container" },
                h("div", { class: 'mdpc-head' },
                    h("div", { class: 'mdpch-button' },
                        h("div", { class: 'mdpchb-inner', onClick: () => this.setYear(-1) },
                            h("span", { class: 'mdpchbi-left-arrows' }))),
                    h("div", { class: 'mdpch-button' },
                        h("div", { class: 'mdpchb-inner', onClick: () => this.setMonth(-1) },
                            h("span", { class: 'mdpchbi-left-arrow' }))),
                    h("div", { class: 'mdpch-container' },
                        h("div", { class: 'mdpchc-year' }, this.year),
                        h("div", { class: 'mdpchc-month' }, this.getMonthStr(this.month))),
                    h("div", { class: 'mdpch-button' },
                        h("div", { class: 'mdpchb-inner', onClick: () => this.setMonth(1) },
                            h("span", { class: 'mdpchbi-right-arrow' }))),
                    h("div", { class: 'mdpch-button', onClick: () => this.setYear(1) },
                        h("div", { class: 'mdpchb-inner' },
                            h("span", { class: 'mdpchbi-right-arrows' })))),
                h("div", { class: 'mdpc-body' }, this.renderCalendar()))));
    }
    static get is() { return "date-calendar"; }
    static get originalStyleUrls() { return {
        "$": ["calendar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calendar.css"]
    }; }
    static get properties() { return {
        "onChange": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Function",
                "resolved": "Function",
                "references": {
                    "Function": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The first name"
            }
        },
        "inputRef": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLInputElement",
                "resolved": "HTMLInputElement",
                "references": {
                    "HTMLInputElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get states() { return {
        "year": {},
        "month": {},
        "selectedDay": {},
        "monthDetails": {}
    }; }
}
