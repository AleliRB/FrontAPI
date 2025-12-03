export function extraerErrores(obj: any): string[]{
const err = obj.error.errors;

let mensajeDeError: string []= [];
for(let campo in err){
    const mensajeConCampos = err[campo].map((mensaje:string)=>`${campo} : ${mensaje}`);
    mensajeDeError= mensajeDeError.concat(mensajeConCampos);
}
return mensajeDeError;
}