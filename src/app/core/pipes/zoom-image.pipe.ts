import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zoomImage'
})
export class ZoomImagePipe implements PipeTransform {
  transform(imageUrl: string, zoom: boolean): string {
    return imageUrl;
  }
}
