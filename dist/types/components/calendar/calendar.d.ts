export declare class Calendar {
    oneDay: number;
    todayTimestamp: number;
    daysMap: string[];
    monthMap: string[];
    year: any;
    month: any;
    selectedDay: any;
    monthDetails: any;
    /**
     * The first name
     */
    onChange: Function;
    inputRef: HTMLInputElement;
    constructor();
    getMonthDetails(year: any, month: any): any[];
    isCurrentDay(day: any): boolean;
    isSelectedDay(day: any): boolean;
    getDateFromDateString: (dateValue: any) => {
        year: any;
        month: any;
        date: any;
    };
    getMonthStr: (month: any) => string;
    getDateStringFromTimestamp: (timestamp: any) => string;
    setDate: (dateData: any) => void;
    getDayDetails(args: any): {
        date: number;
        day: number;
        month: number;
        timestamp: number;
        dayString: string;
    };
    onDateClick: (day: any) => void;
    setDateToInput: (timestamp: any) => void;
    getNumberOfDays(year: any, month: any): number;
    setYear: (offset: any) => void;
    setMonth: (offset: any) => void;
    /**
     *  Renderers
     */
    renderCalendar(): any;
    render(): any;
}
