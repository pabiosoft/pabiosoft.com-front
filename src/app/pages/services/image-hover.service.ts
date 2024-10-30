import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageHoverService {
  enlargeImage(imageElement: HTMLImageElement): void {
    if (imageElement) {
      imageElement.style.transform = 'scale(1.2)';
      imageElement.style.transition = 'transform 0.3s';
    }
  }

  resetImage(imageElement: HTMLImageElement): void {
    if (imageElement) {
      imageElement.style.transform = 'scale(1)';
    }
  }
}
