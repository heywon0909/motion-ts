import { BaseComponent } from "../../Component.js";
import { Picker } from "./colorPicker";

export class TransparentControlPicker
  extends BaseComponent<HTMLElement>
  implements Picker
{
  constructor(private selectors?: HTMLElement[]) {
    super(`<section class="control">
        <div class="control_holder">
          <progress id="bar"></progress>
          <button class="create-button plus">+</button>
          <button class="create-button minus">-</button>
        </div>
      </section>`);
    const plus_btn = this.element.querySelector(".create-button.plus");
    const bar = this.element.querySelector("bar") as HTMLFormElement;
    bar.max = 100;
    bar.value = 0;
    console.log("selectors", this.selectors);
    plus_btn?.addEventListener("click", () => {
      console.log("여기 작업할 예정...");
    });
  }
  onHoverSetting(element: HTMLElement): void {
    console.log("element", element);
    throw new Error("Method not implemented.");
  }
  changeSetting(): void {
    throw new Error("Method not implemented.");
  }
}
