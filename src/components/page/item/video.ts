import { BaseComponent } from './../../Component.js';

export class VideoComponent extends BaseComponent<HTMLElement>{
    constructor(title: string, url: string) {
         super(`<section class="video">
                <div class="video_holder"><iframe class="video__thumbnail"></iframe></div>
                <p class="video__title"></p>
             </section>`)
        
        const videoElement = this.element.querySelector('.video__thumbnail')! as HTMLVideoElement;
        videoElement.src = url;
       
        const titleElement = this.element.querySelector('.video__title')! as HTMLParagraphElement;
        titleElement.textContent = title;

        
    }

}