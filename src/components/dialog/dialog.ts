import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";
type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
  getTextError(): string | undefined;
}
export interface TextData {
  readonly title: string;
  readonly body: string;
  getTextError(): string | undefined;
}

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;
  constructor() {
    super(`<section class="dialog">
        <div class="dialog__container">
        <button class="close">
        &times;
         </button>
        <div id="dialog__body"></div>
        <button class="dialog__submit">ADD</button>
        </div>
    </section>`);
    const closeBtn = this.element.querySelector(".close")! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    const submitBtn = this.element.querySelector(
      ".dialog__submit"
    )! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
  addChild(child: Component | Component[]) {
    let isArray = Array.isArray(child) ? true : false;
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    if (isArray) {
      (child as Component[])?.forEach((elem) => {
        elem.attachTo(body);
      });
    } else {
      (child as Component)?.attachTo(body);
    }
  }
}

export class AlertDialog extends BaseComponent<HTMLElement> {
  closeListener?: OnCloseListener;
  constructor(private alert_text: string[] | string) {
    super(`<section class="dialog alert">
        <div class="dialog__container">
        <div id="dialog__body">
        <img class="alert__icon" src="../assets/alert.png"/>
        <p></p>
        </div>
        </div>
    </section>`);
    const text_content = this.element.querySelector(
      "#dialog__body p"
    )! as HTMLElement;
    if (Array.isArray(this.alert_text)) {
      this.alert_text.forEach((text) => {
        text_content.innerHTML += text + "<br/>";
      });
    } else {
      text_content.innerHTML = this.alert_text;
    }
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
    setTimeout(() => {
      (this.closeListener! as OnCloseListener)();
    }, 2000);
  }
}
