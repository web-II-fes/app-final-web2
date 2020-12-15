import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../../servicio/servicio.service';
import { CrearComponent } from '../crear/crear.component';
import { FormGroup, FormControl, FormBuilder, Validator, Validators} from '@angular/forms';
import { Paquete } from "../../clase/paquete";

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {
  displayedColumns: string[] = ['nombreRemitente', 'direccionRemitente', 'nombreDestinatario', 'direccionDestinatario','descripcionPaquete', 'fechaEntrega', 'editar', 'borrar'];
  dataSource : any[] = [];

  formCliente : FormGroup;
   paquetes : any[] = [];
   idPaquete : any;
   paquete : any;

  constructor(private fb : FormBuilder, private servicioService : ServicioService, private router : Router) { }

  ngOnInit(): void {
    this.getPaquete();
    this.initForm(this.paquete);
  }
  nombreControl = new FormControl('User');

  initForm(editarPaquete : Paquete){
 
    this.formCliente = this.fb.group({
      nombreRemitente : [editarPaquete ? editarPaquete.nombreRemitente:'', Validators.required],
      direccionRemitente : [editarPaquete ? editarPaquete.direccionRemitente:'', Validators.required],
      nombreDestinatario : [editarPaquete ? editarPaquete.nombreDestinatario:'', Validators.required],
      direccionDestinatario : [editarPaquete ? editarPaquete.direccionDestinatario:'', Validators.required],
      descripcionPaquete : [editarPaquete ? editarPaquete.descripcionPaquete:'', Validators.required],
      fechaEntrega : [editarPaquete ? editarPaquete.fechaEntrega:'', Validators.required],
     });
    }

  getPaquete(){
    this.servicioService.getPaquete().subscribe((data: any) => {
      
      this.dataSource = data;
    });
  }

  recibePaquete(paquete : CrearComponent){
    
    this.dataSource.push(paquete);
  }

  editarPaquete(idPaquete){
  

    this.router.navigate(['/crear-component/', idPaquete]);
  }
    
  borrarPaquete(paquete: any){
    this.idPaquete = paquete._id;
    this.servicioService.borrarPaquete
    (this.idPaquete).subscribe((data: any ) =>{
    let paqueteBorrado = paquete;
  });
  location.reload();
  }
}