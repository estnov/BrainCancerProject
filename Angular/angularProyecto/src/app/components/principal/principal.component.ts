import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { ResultadoComponent } from '../resultado/resultado.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  public habilitar: boolean = true;
  public habilitarCarga: boolean = true;

  imageUrl: string | undefined;
  selectedFile: File | undefined;
  pixelArray: number[] =[];
  urlLocal: string | undefined;

  constructor(private fire : FirebaseService, private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.urlLocal = URL.createObjectURL(event.target.files[0]);
    console.log(this.urlLocal)
    localStorage.setItem('urlLocal', this.urlLocal);
    this.habilitarCarga = false;
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.fire.uploadImage(this.selectedFile)
        .subscribe(url => {
          this.imageUrl = url;
          this.habilitar = false;

          this.fire.getImagePixels(this.urlLocal!)
            .then((pixels: number[]) => {
              console.log(pixels); 
              this.pixelArray = pixels;
            })
            .catch((error) => {
              console.error("Error en FIRESTORAGE:", error);
            });
        });
    }
  }

  procesarImagen(): void {
    this.api.sendPixelArray(this.pixelArray).then((response: any) => {
      const dialogRef = this.dialog.open(ResultadoComponent, {
        data: {respuesta: response.result[0]},
        height: '50%'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('Cerrar dialogo');
        location.reload();
      });
    })
    .catch((error: Error) => {
      console.error("Error en API:", error);
    });
  }

}
