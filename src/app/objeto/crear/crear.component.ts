import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paquete } from 'src/app/clase/paquete';
import { ServicioService } from 'src/app/servicio/servicio.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  formCliente : FormGroup;
   paquetes : any[] = [];
   idPaquete : any;
   param : any;
   paquete : any;

  constructor(private route : ActivatedRoute, private fb : FormBuilder, private router : Router, private servicioService: ServicioService) { }

  ngOnInit() {
      
      this.route.paramMap.subscribe((param) => {
        
        this.idPaquete = param.get('id');

        if (this.idPaquete !== 'new') {
            this.getPaqueteById(this.idPaquete);
        }
});

      this.initForm(this.paquete);
  }

 

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

    getPaqueteById(idPaquete: String) {
      this.servicioService.getPaqueteById(idPaquete).subscribe((data) => {
          
          let paqueteId = data;

          this.formCliente.patchValue(paqueteId);
      });
  }

    getPaquete(){
      this.servicioService.getPaquete().subscribe((paquete: any) =>{
        this.paquete = paquete;
      });
    }

   

   enviar(){
    if(this.idPaquete){
      this.servicioService.editarPaquete(this.idPaquete, this.formCliente.value).subscribe(paquete =>{
        
      });
  } else {
    this.servicioService.guardarPaquete(this.formCliente.value).subscribe(paquete => {
      let paqueteNuevo = paquete;
    });
    }
    this.router.navigate(['/mostrar-component']);
   };  
  
}