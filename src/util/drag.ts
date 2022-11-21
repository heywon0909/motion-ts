export class DragAndDrop {
  private dragSrcEl?: HTMLElement;
  private HtmlArr?: HTMLElement[];
  constructor(private htmlTarget: NodeListOf<HTMLElement>) {
    this.HtmlArr = Array.from(this.htmlTarget);

    this.HtmlArr.forEach((elem) => {
      let attr = document.createAttribute("draggable");
      attr.value = "true";
      elem.setAttributeNode(attr);
      elem.addEventListener("dragstart", (e) => this.dragStart(e), false);
      elem.addEventListener("dragenter", (e) => this.dragEnter(e), false);
      elem.addEventListener("dragover", (e) => this.dragOver(e), false);
      elem.addEventListener("dragleave", (e) => this.dragLeave(e), false);
      elem.addEventListener("drop", (e) => this.dragDrop(e), false);
      elem.addEventListener("dragend", (e) => this.dragEnd(e), false);
    });
  }
  private dragStart(e: DragEvent) {
    console.log("e.target", e.target);
    let selectItem = (e.target! as HTMLElement).closest(".page-item");
    if (!selectItem) return;

    (e.target! as HTMLElement).style.opacity = "0.4";
    this.dragSrcEl = selectItem! as HTMLElement;

    // console.log('dragstart - el',this.dragSrcEl);
    (e.dataTransfer! as DataTransfer).effectAllowed = "move";
    let component_text = selectItem.querySelector("section")!.innerHTML;

    (e.dataTransfer! as DataTransfer).setData("text/html", component_text);
  }
  private dragEnter(e: DragEvent) {
    // console.log('dragenter - el',this.dragSrcEl);
    let selectItem = (e.target! as HTMLElement).closest(".page-item");
    (selectItem! as HTMLElement).classList.add("over");
  }
  private dragLeave(e: DragEvent) {
    e.stopPropagation();
    let selectItem = (e.target! as HTMLElement).closest(".page-item");
    (selectItem! as HTMLElement).classList.remove("over");
    // console.log('dragleave - el',this.dragSrcEl);
  }
  private dragOver(e: DragEvent): Boolean {
    e.preventDefault();
    (e.dataTransfer! as DataTransfer).dropEffect = "move";
    // console.log('dragover - el',this.dragSrcEl);
    return false;
  }
  private dragDrop(e: DragEvent): Boolean {
    let changeElem = (e.target! as HTMLElement).closest(".page-item");
    if (!changeElem) return false;

    let component_text = changeElem.querySelector("section")!.innerHTML;
    if (this.dragSrcEl != (e.target! as HTMLElement).closest(".page-item")) {
      (this.dragSrcEl! as HTMLElement).querySelector("section")!.innerHTML =
        component_text;
      console.log("background", this.dragSrcEl?.style.background);
      (changeElem! as HTMLElement).querySelector("section")!.innerHTML = (
        e.dataTransfer! as DataTransfer
      ).getData("text/html")!;
      //this.dragSrcEl = undefined;
    }
    return false;
  }
  private dragEnd(e: DragEvent) {
    this.HtmlArr?.forEach((item) => {
      item.classList.remove("over");
    });
    (e.target! as HTMLElement).style.opacity = "1";
  }
}
