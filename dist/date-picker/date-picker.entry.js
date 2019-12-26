import { r as registerInstance, h, c as getElement } from './core-9a4ba90f.js';

const DatePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
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
        return (h("div", { class: "MyDatePicker" }, h("div", { class: "mdb-input", onClick: () => { this.toggleDatePicker(); } }, h("input", { class: "date-input", type: "date", ref: el => this.inputRef = el })), this.showDatePicker ? (h("date-calendar", { inputRef: this.inputRef })) : ''));
    }
    get element() { return getElement(this); }
    static get style() { return ".MyDatePicker * {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  -khtml-user-select: none;\n  /* Konqueror */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently */\n}\n\ninput[type=date]::-webkit-inner-spin-button {\n  display: none;\n  -webkit-appearance: none;\n}\n\n.MyDatePicker {\n  float: left;\n  position: relative;\n}\n.MyDatePicker .mdp-input {\n  float: left;\n  width: 150px;\n  height: 35px;\n  overflow: hidden;\n  border-radius: 20px;\n}\n\n.date-input {\n  width: 125%;\n  background: #f5f5f5;\n  border: none;\n  height: 35px;\n  text-align: center;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  font-size: 11px;\n  cursor: pointer;\n}\n\n.date-input:focus {\n  outline: none;\n}"; }
};

export { DatePicker as date_picker };
