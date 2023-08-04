import { Component, Inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent {

  respuesta: string = "";
  imagen = localStorage.getItem('urlLocal');

  constructor(public dialogRef: MatDialogRef<ResultadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.respuesta = data.respuesta;
      console.log(data.respuesta);
     }
}
