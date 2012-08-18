trace('     BD: PERSONAS ');
trace('------------------------------------');
/* 
	ADVERTENCIA ÁNO UNICODE!
	Esta variables estan en LATIN 1 de MAC
	PARA COMPILAR EN WINDOWS PASAR A LATIN 1 de WINDOWS
*/
trace (" --- DEFINICION DE VARIABLES DE PERSONAS --- ");
var bd_personas:Array = new Array();

bd_personas  = Array ( 'nombres', 'apellidos', 'ocupaciones', 'pasatiempos' );
bd_personas['nombres']= Array ('mujer', 'hombre');

bd_personas['nombres']['hombre'] = Array ("JOSÉ", "JUAN", "ALBERTO", "MARIANO", "ANÍBAL", "JULIÁN", "RODOLFO", "ESTEBAN", "ROBERTO", "GABRIEL", "ANDRÉS", "MANUEL", "TEO", "SANTIAGO", "CAMILO", "DANILO", "MATÍAS", "CLAUDIO", "ROMEO", "RÓMULO");
	trace ("BD PERSONAS nombre hombre ----> " +  bd_personas['nombres']['hombre']);



bd_personas['nombres']['mujer']= Array ("MARÍA", "MARISA", "MARCELA", "MARIELA", "ROSA", "MALENA", "MELINA", "MILENA", "RAMONA", "JUANA", "ROCÍO", "JIMENA", "ANA", "MARIANA", "CAMILA", "LUCÍA", "LUCILA", "LUCRECIA", "SUSANA", "LILIANA");
	trace ("BD PERSONAS nombre mujer ----> " +  bd_personas['nombres']['mujer']);

bd_personas['apellidos']= Array ("RAMÍREZ", "MARTÍNEZ", "FILIPO", "RODRÍGUEZ", "PERÉYRA", "GÓMEZ", "PÉREZ", "GONZÁLEZ", "COSTA", "PORTA", "OCHOA", "RÍOS", "PARÉDES", "PERETI", "CASTILLO", "ROCA", "ACUÑA", "TORELI", "ÁLVAREZ", "SALINAS");
	trace ("BD PERSONAS apellido ----> " +  bd_personas['apellidos']);

bd_personas['ocupaciones']= Array ("MÉDICO/A", "ENFERMERO/A", "DENTISTA", "ABOGADO/A", "TAXISTA", "MAESTRO/A", "COMERCIANTE", "ARQUEÓLOGO/A", "ACTOR/ACTRIZ", "ARQUITECTO/A", "ASTRONAUTA", "PELUQUERO/A", "GUARDAPARQUES", "ESCRITOR/A", "INGENIERO/A", "LOCUTOR/A", "PERIODISTA", "PSICÓLOGO/A", "CARPINTERO", "PLOMERO", "PROGRAMADOR/A");
	trace ("BD PERSONAS ocupacion ----> " +  bd_personas['ocupaciones']);
	
bd_personas['pasatiempos']= Array ("LEER", "CANTAR", "JUGAR TENIS", "JUGAR GOLF", "IR AL CINE", "JUGAR SUDOKU", "JUGAR AL AJEDREZ", "JUGAR A ENTRENA NEURONAS", "COCINAR", "NADAR", "ANDAR EN BICICLETA", "BAILAR", "TOCAR EL PIANO", "TOCAR GUITARRA", "DIBUJAR", "VIAJAR", "JUGAR FÚTBOL", "ARMAR ROMPECABEZAS", "ESCALAR");
	trace ("BD PERSONAS pasatiempo ----> " +  bbd_personas['pasatiempos']);

/*

for (obj in bd_personas ) {
	trace ("BD OBJETOS ----> " + obj);	
}*/
