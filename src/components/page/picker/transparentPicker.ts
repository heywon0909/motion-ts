import { BaseComponent } from "../../component.js";
import { Picker } from "./colorPicker";

export class TransparentControlPicker
  extends BaseComponent<HTMLElement>
  implements Picker
{
  private selectors?: HTMLElement[];
  private bar: HTMLFormElement = this.element.querySelector(
    "#bar"
  )! as HTMLFormElement;
  private barValue: number = 100;
  constructor() {
    super(`<section class="control">
        <div class="control_holder">
          <input type="range" id="bar"></progress>
          <button class="create-button plus">+</button>
          <button class="create-button minus">-</button>
        </div>
      </section>`);
    const plus_btn = this.element.querySelector(".create-button.plus");
    const minus_btn = this.element.querySelector(".create-button.minus");
    this.bar.value = 100;
    plus_btn?.addEventListener("click", () => {
      this.controlBarState(10);
      this.changeSetting();
    });
    minus_btn?.addEventListener("click", () => {
      this.controlBarState(-10);
      this.changeSetting();
    });
    this.onHoverSetting(this.bar);
  }
  set changableTarget(list: HTMLElement[]) {
    this.selectors = list;
  }
  get changableTarget() {
    return this.selectors! as HTMLElement[];
  }
  unbindChange(): void {
    this.barValue = 100;
    this.bar.value = 100;
    (this.selectors! as HTMLElement[]).forEach((elem) => {
      elem.style.opacity = "unset";
    });
  }
  onHoverSetting(element: HTMLElement): void {
    element!.addEventListener("change", () => {
      this.barValue = (element! as HTMLFormElement).value;
      this.changeSetting();
    });
  }
  controlBarState(num: number): void {
    this.barValue += num;
  }
  changeSetting(): string | undefined {
    if (this.barValue < 0) {
      this.barValue = 0;
      this.bar.value = this.barValue;
      return "투명도 값은 0이상이여야합니다.";
    }
    if (this.barValue > 100) {
      this.barValue = 100;
      this.bar.value = this.barValue;
      return "투명도 값은 100이하이여야합니다.";
    }

    this.bar.value = this.barValue;
    (this.selectors! as HTMLElement[]).forEach((elem) => {
      elem.style.opacity = (this.bar.value / 100).toString();
    });
    return;
  }
}
