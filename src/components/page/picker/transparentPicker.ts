import { BaseComponent } from "../../Component.js";
import { Picker } from "./colorPicker";

export class TransparentControlPicker
  extends BaseComponent<HTMLElement>
  implements Picker
{
  private bar: HTMLFormElement = this.element.querySelector(
    "#bar"
  ) as HTMLFormElement;
  private barValue: number = 100;
  constructor(private selectors?: HTMLElement[]) {
    super(`<section class="control">
        <div class="control_holder">
          <progress id="bar"></progress>
          <button class="create-button plus">+</button>
          <button class="create-button minus">-</button>
        </div>
      </section>`);
    const plus_btn = this.element.querySelector(".create-button.plus");
    const minus_btn = this.element.querySelector(".create-button.minus");
    console.log("this.bar", this.bar);
    this.bar.max = 100;
    this.bar.value = 100;
    console.log("selectors", this.selectors);
    plus_btn?.addEventListener("click", () => {
      this.controlBarState(10);
      this.changeSetting();
    });
    minus_btn?.addEventListener("click", () => {
      this.controlBarState(-10);
      this.changeSetting();
    });
  }
  unbindChange(): void {
    this.barValue = 0;
    this.bar.value = 0;
    (this.selectors! as HTMLElement[]).forEach((elem) => {
      elem.style.opacity = "0";
    });
  }
  onHoverSetting(element: HTMLElement): void {
    console.log("element", element);
    throw new Error("Method not implemented.");
  }
  controlBarState(num: number): void {
    if (this.barValue < 0) {
      this.barValue = 0;
      // 경고창 만들기
    }
    if (this.barValue > 100) {
      this.barValue = 100;
      // 경고창 만들기
    }
    this.barValue += num;
  }
  changeSetting(): void {
    this.bar.value = this.barValue;
    console.log("this.bar", this.barValue);
    (this.selectors! as HTMLElement[]).forEach((elem) => {
      elem.style.opacity = (this.bar.value / 100).toString();
    });
  }
}
