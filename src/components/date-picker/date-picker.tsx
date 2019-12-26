import { Component,
  Prop,
  h,
  State,
  Listen,
  Element
} from '@stencil/core';

@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.scss',
  shadow: true
})
export class DatePicker {

  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  @State() showDatePicker: boolean;

  @Element() private element: HTMLElement;

  private inputRef?: HTMLInputElement;

  currentElement: any;

  @Listen('window:click', { capture: true})
  addBackDrop(event: any) {
    if(this.showDatePicker && !this.element.isSameNode(event.target)) {
      this.showDatePicker = false;
      event.stopPropagation();
    }        
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  render() {
    return (
      <div class="MyDatePicker">
        <div class="mdb-input" onClick={() => {this.toggleDatePicker();}}>
          <input class="date-input" type="date" ref={el => this.inputRef = el as HTMLInputElement}/>
        </div>
        {
          this.showDatePicker ? (
            <date-calendar inputRef={this.inputRef}/>
          ): ''
        }
      </div>
    );
  }
}
