import { Component } from "./../../component";
import { BaseComponent } from "../../component.js";
export interface Picker extends Component {
  onHoverSetting(element: HTMLElement): void;
  changeSetting(): string | undefined;
  unbindChange(): void;
  get changableTarget(): HTMLElement[];
  set changableTarget(list: HTMLElement[]);
}
export class ColorPickerComponent
  extends BaseComponent<HTMLElement>
  implements Picker
{
  private selectors?: HTMLElement[];
  private palette = this.element.querySelectorAll(
    "div.color_holder div"
  )! as NodeListOf<HTMLElement>;
  constructor() {
    super(`
        <section class="color">
          <div class="color_holder">
            <div
              alt="#1abc9c"
              shape="poly"
              style="background-color: #1abc9c;"
            ></div>
            <div
              alt="#16a085"
              shape="poly"
              style="background-color: #16a085;"
            ></div>
            <div
              alt="#2ecc71"
              shape="poly"
              style="background-color: #2ecc71;"
            ></div>
            <div
              alt="#27ae60"
              shape="poly"
              style="background-color: #27ae60;"
            ></div>
            <div
              alt="#3498db"
              shape="poly"
              style="background-color: #3498db;"
            ></div>

            <div
            alt="#2980b9"
            shape="poly"
            style="background-color: #2980b9;"
          ></div>
          <div
            alt="#9b59b6"
            shape="poly"
            style="background-color: #9b59b6;"
          ></div>
          <div
            alt="#8e44ad"
            shape="poly"
            style="background-color: #8e44ad;"
          ></div>
          <div
            alt="#34495e"
            shape="poly"
            style="background-color: #34495e;"
          ></div>
          <div
            alt="#2c3e50"
            shape="poly"
            style="background-color: #2c3e50;"
          ></div>

          <div
              alt="#f1c40f"
              shape="poly"
              style="background-color: #f1c40f;"
            ></div>
            <div
              alt="#f39c12"
              shape="poly"
              style="background-color: #f39c12;"
            ></div>
            <div
              alt="#e67e22"
              shape="poly"
              style="background-color: #e67e22;"
            ></div>
            <div
              alt="#d35400"
              shape="poly"
              style="background-color: #d35400;"
            ></div>
            <div
              alt="#e74c3c"
              shape="poly"
              style="background-color: #e74c3c;background-size: contain;"
            ></div>

            <div
            alt="#c0392b"
            shape="poly"
            style="background-color: #c0392b;"
          ></div>
          <div
            alt="#ecf0f1"
            shape="poly"
            style="background-color: #ecf0f1;"
          ></div>
          <div
            alt="#bdc3c7"
            shape="poly"
            style="background-color: #bdc3c7;"
          ></div>
          <div
            alt="#95a5a6"
            shape="poly"
            style="background-color: #95a5a6;"
          ></div>
          <div
            alt="#7f8c8d"
            shape="poly"
            style="background-color: #7f8c8d;"
          ></div>
          </div>
        </section>
      `);

    this.palette.forEach((item) => {
      //   console.log("item", item);
      item.addEventListener("click", () => {
        this.onHoverSetting(item);
        this.changeSetting();
      });
    });
  }
  set changableTarget(list: HTMLElement[]) {
    this.selectors = list;
  }
  get changableTarget() {
    return this.selectors! as HTMLElement[];
  }
  unbindChange(): void {
    (this.selectors! as HTMLElement[]).forEach((elem) => {
      elem.style.removeProperty("background");
    });
    this.checkHover(this.palette);
  }
  changeSetting(): string | undefined {
    let selected: HTMLElement | undefined;
    const colorPalette: HTMLElement[] = Array.from(this.palette);
    selected = colorPalette.find((item) => item.classList.contains("add"));

    if (selected != undefined) {
      let color = window
        .getComputedStyle(selected! as HTMLElement, null)
        .getPropertyValue("background-color");

      (this.selectors! as HTMLElement[]).forEach((elem) => {
        elem.style.background = color;
      });
      return;
    } else {
      this.unbindChange();
      return "색상을 지정해주세요!";
    }
  }
  checkHover(elements: NodeListOf<HTMLElement>, selector?: HTMLElement) {
    elements.forEach((elem) => {
      if (selector == null && elem.classList.contains("add")) {
        elem.classList.remove("add");
      } else {
        if (elem !== selector && elem.classList.contains("add")) {
          elem.classList.remove("add");
        }
      }
    });
  }
  onHoverSetting(element: HTMLElement): void {
    if (!element.classList.contains("add")) {
      element.classList.add("add");
      this.checkHover(this.palette, element);
    } else {
      element.classList.remove("add");
    }
  }
}
