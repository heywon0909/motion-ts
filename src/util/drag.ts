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
            elem.addEventListener('dragstart',(e)=> this.dragStart(e,this.HtmlArr! as HTMLElement[]),false);
            elem.addEventListener('dragenter',(e)=>this.dragEnter(e),false);
            elem.addEventListener('dragover',(e)=>this.dragOver(e),false);
            elem.addEventListener('dragleave',(e)=>this.dragLeave(e),false);
            elem.addEventListener('drop',(e)=>this.dragDrop(e),false);
            elem.addEventListener('dragend',(e)=>this.dragEnd(e),false);
        })
    }
    private dragStart(e:DragEvent,list:HTMLElement[]) {
       
        (e.target! as HTMLElement).style.opacity = '0.4';
        this.dragSrcEl = e.target! as HTMLElement;
       console.log('list',list);
        console.log('dragstart - el',this.dragSrcEl);
        (e.dataTransfer! as DataTransfer).effectAllowed = 'move';
        let component_text = '';
        for(let i of (e.target! as HTMLElement).children){
            component_text+=i.innerHTML;
        }
        (e.dataTransfer! as DataTransfer).setData('text/html',component_text);
        
    }
    private dragEnter(e:DragEvent){
        console.log('dragenter - el',this.dragSrcEl);
        (e.target! as HTMLElement).classList.add('over');
    }
    private dragLeave(e:DragEvent){
        e.stopPropagation();
        (e.target! as HTMLElement).classList.remove('over');
        console.log('dragleave - el',this.dragSrcEl);
    }
    private dragOver(e:DragEvent):Boolean{
        e.preventDefault();
        (e.dataTransfer! as DataTransfer).dropEffect = 'move';
        console.log('dragover - el',this.dragSrcEl);
        return false;
    }
    private dragDrop(e:DragEvent):Boolean{
        let changeElem = (e.target! as HTMLElement).closest('.page-item');
       
        let component_text = '';
        for(let i of (changeElem! as HTMLElement).children){
            component_text+=i.innerHTML;
        }
        
        if(this.dragSrcEl != e.target){
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