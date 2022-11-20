export class DragAndDrop {
    private dragSrcEl?:HTMLElement;
    private HtmlArr?:HTMLElement[]
    constructor(private htmlTarget:NodeListOf<HTMLElement>){
        this.HtmlArr = Array.from(this.htmlTarget);
        console.log('시작',this.HtmlArr)
        this.HtmlArr.forEach((elem)=>{
            let attr = document.createAttribute('draggable');
            attr.value = 'true';
            elem.setAttributeNode(attr);
            elem.addEventListener('dragstart',(e)=> this.dragStart(e),false);
            elem.addEventListener('dragenter',(e)=>this.dragEnter(e),false);
            elem.addEventListener('dragover',(e)=>this.dragOver(e),false);
            elem.addEventListener('dragleave',(e)=>this.dragLeave(e),false);
            elem.addEventListener('drop',(e)=>this.dragDrop(e),false);
            elem.addEventListener('dragend',(e)=>this.dragEnd(e),false);
        })
    }
    private dragStart(e: DragEvent) {
        if (!(e.target! as HTMLElement).closest('.page-item')) return;
        console.log('e.target', e.target);
        (e.target! as HTMLElement).style.opacity = '0.4';
        this.dragSrcEl = e.target! as HTMLElement;
       
        // console.log('dragstart - el',this.dragSrcEl);
        (e.dataTransfer! as DataTransfer).effectAllowed = 'move';
        let component_text = '';
        console.log('e.target.children', (e.target! as HTMLElement).children);
        console.log('(e.target! as HTMLElement).closest(.page - item)!).children', ((e.target! as HTMLElement).closest('.page-item')!).children);
        for (let i = 0; i < (e.target! as HTMLElement).children.length; i++){
            component_text += (e.target! as HTMLElement).children[i]?.innerHTML;
        }
        // for (let i of ((e.target! as HTMLElement)).children) {
        //     console.log('i.innerHtml', i.innerHTML);
        //     component_text += i.innerHTML;
        // }
        console.log('component_text', component_text.toString());
        (e.dataTransfer! as DataTransfer).setData('text/html',component_text);
        
    }
    private dragEnter(e:DragEvent){
        // console.log('dragenter - el',this.dragSrcEl);
        (e.target! as HTMLElement).classList.add('over');
    }
    private dragLeave(e:DragEvent){
        e.stopPropagation();
        (e.target! as HTMLElement).classList.remove('over');
        // console.log('dragleave - el',this.dragSrcEl);
    }
    private dragOver(e:DragEvent):Boolean{
        e.preventDefault();
        (e.dataTransfer! as DataTransfer).dropEffect = 'move';
        // console.log('dragover - el',this.dragSrcEl);
        return false;
    }
    private dragDrop(e: DragEvent): Boolean{
        if (!(e.target! as HTMLElement).closest('.page-item')) return false;
        let changeElem = (e.target! as HTMLElement).closest('.page-item');
        console.log('changeElem', changeElem);
        let component_text = '';
        for(let i of (changeElem! as HTMLElement).children){
            component_text+=i.innerHTML;
        }
        
        if(this.dragSrcEl != (e.target! as HTMLElement).closest('.page-item')){
            (this.dragSrcEl! as HTMLElement).innerHTML = component_text;
            
            (changeElem! as HTMLElement).innerHTML = (e.dataTransfer! as DataTransfer).getData('text/html')!;
            this.dragSrcEl =undefined;
        }
        return false;
    }
    private dragEnd(e:DragEvent){
        this.HtmlArr?.forEach(item =>{
            item.classList.remove('over');
        });
        (e.target! as HTMLElement).style.opacity='1';

    }
}