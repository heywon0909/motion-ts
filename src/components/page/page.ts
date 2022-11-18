import { BaseComponent, Component } from "../Component.js";
type OnCloseListener = () => void;
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}
type SectionContainerConstructor = {
  new (): SectionContainer;
};
export interface Composable {
  addChild(child: Component, btn?: Component): void;
}
export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  constructor() {
    super(`<li class="page-item">
            <div class="control_btn"></div>
            <section class="page-item__body"></section>
            <div class="page-item__controls">
            <button class="close">&times;</button>
            </div>
            </li>`);
    const closeBtn = this.element.querySelector(".close")! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }
  addChild(child: Component, ...btn: Component[]) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;

    (btn! as Component[]).forEach((elem) => {
      elem.attachTo(this.element.querySelector(".control_btn")! as HTMLElement);
    });

    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }
  addChild(section: Component, btn?: Component) {
    const item = new this.pageItemConstructor();

    item.addChild(section, btn);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
