import { BaseComponent } from "../../component.js";
import { Picker } from "./colorPicker.js";

export class TransparentControlPicker
  extends BaseComponent<HTMLElement>
  implements Picker
{
  private bar: HTMLFormElement = this.element.querySelector(
    "#bar"
  )! as HTMLFormElement;
  private barValue: number = 100;
  constructor(private selectors?: HTMLElement[]) {
    super(`<section class="control">
        <div class="control_holder">
          <input type="range" id="bar"></progress>
          <button class="create-button plus">+</button>
          <button class="create-button minus">-</button>
        </div>
      </section>`);
    const plus_btn = this.element.querySelector(".create-button.plus");
    const minus_btn = this.element.querySelector(".create-button.minus");

    this.initSetting();
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
  unbindChange(): void {
    this.barValue = 0;
    this.bar.value = 0;
    (this.selectors! as HTMLElement[]).forEach((elem) => {
      elem.style.opacity = "0";
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
  private initSetting(): void {
    (this.selectors! as HTMLElement[]).forEach((elem) => {
      this.bar.max = 100;
      if (Number(elem.style.opacity) === 0) {
        this.bar.value = 100;
      } else {
        this.barValue = Number(elem.style.opacity) * 100;
        this.bar.value = Number(elem.style.opacity) * 100;
      }
    });
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
