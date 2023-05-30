
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage(file: File): Observable<string> {
    const filePath = `Imagenes/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    return new Observable<string>(observer => {
      task.then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          observer.next(url);
          observer.complete();
        });
      }).catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  async getImagePixels(imageUrl: string): Promise<number[]> {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Enable CORS for the image
    image.src = imageUrl;

    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") ;
    canvas.width = image.width;
    canvas.height = image.height;
    context!.drawImage(image, 0, 0);

    const imageData = context!.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = Array.from(imageData.data);

    var pixelArray = new Array(256 * 256);
        
    // Convert pixelData to pixelArray
    for (var i = 0; i < pixelData.length; i += 4) {
        var r = pixelData[i];
        var g = pixelData[i + 1];
        var b = pixelData[i + 2];
        var a = pixelData[i + 3];
        var gray = (r + g + b) / 3; // Convert to grayscale
        var index = i / 4;
        pixelArray[index] = gray;
    }


    return pixelArray;
  }

}
