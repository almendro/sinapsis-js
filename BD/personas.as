trace('     BD: PERSONAS ');
trace('------------------------------------');
/* 
	ADVERTENCIA �NO UNICODE!
	Esta variables estan en LATIN 1 de MAC
	PARA COMPILAR EN WINDOWS PASAR A LATIN 1 de WINDOWS
*/
trace (" --- DEFINICION DE VARIABLES DE PERSONAS --- ");
var bd_personas:Array = new Array();

bd_personas  = Array ( 'nombres', 'apellidos', 'ocupaciones', 'pasatiempos' );
bd_personas['nombres']= Array ('mujer', 'hombre');

bd_personas['nombres']['hombre'] = Array ("JOS�", "JUAN", "ALBERTO", "MARIANO", "AN�BAL", "JULI�N", "RODOLFO", "ESTEBAN", "ROBERTO", "GABRIEL", "ANDR�S", "MANUEL", "TEO", "SANTIAGO", "CAMILO", "DANILO", "MAT�AS", "CLAUDIO", "ROMEO", "R�MULO");
	trace ("BD PERSONAS nombre hombre ----> " +  bd_personas['nombres']['hombre']);



bd_personas['nombres']['mujer']= Array ("MAR�A", "MARISA", "MARCELA", "MARIELA", "ROSA", "MALENA", "MELINA", "MILENA", "RAMONA", "JUANA", "ROC�O", "JIMENA", "ANA", "MARIANA", "CAMILA", "LUC�A", "LUCILA", "LUCRECIA", "SUSANA", "LILIANA");
	trace ("BD PERSONAS nombre mujer ----> " +  bd_personas['nombres']['mujer']);

bd_personas['apellidos']= Array ("RAM�REZ", "MART�NEZ", "FILIPO", "RODR�GUEZ", "PER�YRA", "G�MEZ", "P�REZ", "GONZ�LEZ", "COSTA", "PORTA", "OCHOA", "R�OS", "PAR�DES", "PERETI", "CASTILLO", "ROCA", "ACU�A", "TORELI", "�LVAREZ", "SALINAS");
	trace ("BD PERSONAS apellido ----> " +  bd_personas['apellidos']);

bd_personas['ocupaciones']= Array ("M�DICO/A", "ENFERMERO/A", "DENTISTA", "ABOGADO/A", "TAXISTA", "MAESTRO/A", "COMERCIANTE", "ARQUE�LOGO/A", "ACTOR/ACTRIZ", "ARQUITECTO/A", "ASTRONAUTA", "PELUQUERO/A", "GUARDAPARQUES", "ESCRITOR/A", "INGENIERO/A", "LOCUTOR/A", "PERIODISTA", "PSIC�LOGO/A", "CARPINTERO", "PLOMERO", "PROGRAMADOR/A");
	trace ("BD PERSONAS ocupacion ----> " +  bd_personas['ocupaciones']);
	
bd_personas['pasatiempos']= Array ("LEER", "CANTAR", "JUGAR TENIS", "JUGAR GOLF", "IR AL CINE", "JUGAR SUDOKU", "JUGAR AL AJEDREZ", "JUGAR A ENTRENA NEURONAS", "COCINAR", "NADAR", "ANDAR EN BICICLETA", "BAILAR", "TOCAR EL PIANO", "TOCAR GUITARRA", "DIBUJAR", "VIAJAR", "JUGAR F�TBOL", "ARMAR ROMPECABEZAS", "ESCALAR");
	trace ("BD PERSONAS pasatiempo ----> " +  bbd_personas['pasatiempos']);

/*

for (obj in bd_personas ) {
	trace ("BD OBJETOS ----> " + obj);	
}*/
