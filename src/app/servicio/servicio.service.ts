import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ServicioService{
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    private personaUrl = 'http://localhost:3002/api/modules/pedidos/';

    constructor(private httpClient: HttpClient){}

    getPaqueteById(idPaquete: String) {
        return this.httpClient.get(this.personaUrl + 'paqueteId/' + idPaquete);
    }
    
    getPaquete(){
        return this.httpClient.get(this.personaUrl + 'paquete');
    }

    guardarPaquete(paquete: any){
        return this.httpClient.post(this.personaUrl + 'paquete', JSON.stringify(paquete), this.httpOptions);
    }

    editarPaquete(idPaquete, paquete) {
        return this.httpClient.put(this.personaUrl + 'paquete/' + idPaquete, JSON.stringify(paquete), this.httpOptions);

    }

    borrarPaquete(idPaquete){
        return this.httpClient.delete(this.personaUrl + 'paquete/' + idPaquete, this.httpOptions);
    }    
}