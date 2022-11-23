import { BaseComponent, Component } from "../component.js";
type OnCloseListener = () => void;
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: "mute" | "unmute"): void;
}
type SectionContainerConstructor = {
  new (): SectionContainer;
};
type DragState = "start" | "stop" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;
export interface Composable {
  addChild(child: Component, btn?: Component | Component[]): void;
}
export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;
  constructor() {
    // <div class="control_btn"></div>
    super(`<li class="page-item" draggable="true">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
            <button class="close">&times;</button>
            </div>
            </li>`);
    const closeBtn = this.element.querySelector(".close")! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    this.element.addEventListener("dragstart", (event: DragEvent) => {
      this.onDragStart(event);
    });
    this.element.addEventListener("dragend", (event: DragEvent) => {
      this.onDragEnd(event);
    });
    this.element.addEventListener("dragenter", (event: DragEvent) => {
      this.onDragEnter(event);
    });
    this.element.addEventListener("dragleave", (event: DragEvent) => {
      this.onDragLeave(event);
    });
  }
  onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers("enter");
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
  }
  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }
  addChild(child: Component, btn?: Component[]) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;

    console.log("btn", btn);
    // (btn as Component[])?.forEach((elem) => {
    //   elem?.attachTo(
    //     this.element.querySelector(".control_btn")! as HTMLElement
    //   );
    // });

    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
  muteChildren(state: "mute" | "unmute") {
    if (state === "mute") {
      this.element.classList.add("mute-children");
    } else {
      this.element.classList.remove("mute-children");
    }
  }
}
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private children = new Set<SectionContainer>();
  private dragTarget?: SectionContainer;
  private dropTarget?: SectionContainer;
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
    this.element.addEventListener("dragover", (event: DragEvent) => {
      this.onDragOver(event);
    });
    this.element.addEventListener("drop", (event: DragEvent) => {
      this.onDrop(event);
    });
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log("over");
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log("drop");
    // 여기에서 위치를 바꿔준다
    if (!this.dropTarget) return;

    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, "beforebegin");
    }
  }
  addChild(section: Component, btn?: Component) {
    const item = new this.pageItemConstructor();

    item.addChild(section, btn);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
        console.log("target", target);
        switch (state) {
          case "start":
            this.dragTarget = target;
            this.updateSections("unmute");
            break;
          case "stop":
            this.dragTarget = undefined;
            this.updateSections("mute");
            break;
          case "enter":
            console.log("enter", target);

            this.dropTarget = target;
            break;
          case "leave":
            this.dropTarget = undefined;
            break;
          default:
            throw new Error(`unsupported state:${state}`);
        }
      }
    );
  }
  private updateSections(state: "mute" | "unmute") {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}
