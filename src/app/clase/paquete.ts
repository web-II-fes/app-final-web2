export class Paquete {
    constructor(
        public nombreRemitente: string,
        public direccionRemitente: string,
        public nombreDestinatario: string,
        public direccionDestinatario,
        public descripcionPaquete,
        public fechaEntrega: Date,
        
    ){}
}