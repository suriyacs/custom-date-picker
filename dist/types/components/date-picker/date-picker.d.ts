export declare class DatePicker {
    /**
     * The first name
     */
    first: string;
    /**
     * The middle name
     */
    middle: string;
    /**
     * The last name
     */
    last: string;
    showDatePicker: boolean;
    private element;
    private inputRef?;
    currentElement: any;
    addBackDrop(event: any): void;
    toggleDatePicker(): void;
    render(): any;
}
