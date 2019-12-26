import { h } from "@stencil/core";
export class DatePicker {
    addBackDrop(event) {
        if (this.showDatePicker && !this.element.isSameNode(event.target)) {
            this.showDatePicker = false;
            event.stopPropagation();
        }
    }
    toggleDatePicker() {
        this.showDatePicker = !this.showDatePicker;
    }
    render() {
        return (h("div", { class: "MyDatePicker" },
            h("div", { class: "mdb-input", onClick: () => { this.toggleDatePicker(); } },
                h("input", { class: "date-input", type: "date", ref: el => this.inputRef = el })),
            this.showDatePicker ? (h("date-calendar", { inputRef: this.inputRef })) : ''));
    }
    static get is() { return "date-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["date-picker.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["date-picker.css"]
    }; }
    static get properties() { return {
        "first": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The first name"
            },
            "attribute": "first",
            "reflect": false
        },
        "middle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The middle name"
            },
            "attribute": "middle",
            "reflect": false
        },
        "last": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The last name"
            },
            "attribute": "last",
            "reflect": false
        }
    }; }
    static get states() { return {
        "showDatePicker": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "addBackDrop",
            "target": "window",
            "capture": true,
            "passive": false
        }]; }
}
