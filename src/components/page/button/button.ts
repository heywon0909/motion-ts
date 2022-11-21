import { BaseComponent } from "../../component.js";
export interface Button {
  setOnModalListener(listener: OnModalListener): void;
}
type OnModalListener = () => void;
export class ButtonComponent
  extends BaseComponent<HTMLElement>
  implements Button
{
  private openModalListener?: OnModalListener;
  constructor(tagName: string) {
    super(`<button class="create-button create_control_btn"></button>`);
    this.element.textContent = tagName;
    this.element.addEventListener("click", () => {
      this.openModalListener && this.openModalListener();
    });
  }
  setOnModalListener(listener: OnModalListener) {
    this.openModalListener = listener;
  }
}
