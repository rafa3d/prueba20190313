const dias_semana = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var proxy = 'https://cors-anywhere.herokuapp.com/'; /* reverse proxy usado para bypass el https del XMLHttpRequest */
var ahora = new Date(); /* fecha actual inicial */

/* FUNCIONES */

function iniciar(ahora) {
	dia_ini = getMonday(ahora);
	dia_fin = addDays(dia_ini,6);
	dias = dia_ini.getDate()+"-"+dia_fin.getDate();
	fecha = meses[dia_ini.getMonth()]+' <span class="numero">'+(dia_ini.getFullYear())+'</span>'; 
	
	espacio1 = '<div style="display:inline-block;width:10px;"></div>';
	espacio2 = '<div style="display:inline-block;width:30%;"></div>';
	
	document.getElementById("hoja1_dias").innerHTML =espacio1+dias;
	document.getElementById("hoja1_fecha").innerHTML =fecha+espacio2;
	document.getElementById("hoja2_dias").innerHTML =dias+espacio1;
	document.getElementById("hoja2_fecha").innerHTML =espacio2+fecha;
	
	var tabla1_1='<table width="100%"><tr><th width="25%">Day</th><th width="20%">Time</th><th>Description</th></tr>';
	tabla1_2='';
	tabla2_1='<table width="100%"><tr><th>Task</th><th width="15%">Done</th></tr>';
	tabla2_2='';
	
	var ii=0;						
	var i; for (i = 0; i < 7; i++) {
			 
		dia_fila=addDays(dia_ini,i);
		
		if (i>0) {
			tabla1_1=tabla1_1+'<tr class="entre_filas"><td colspan="3"></td></tr>';
			tabla2_1=tabla2_1+'<tr class="entre_filas"><td colspan="3"></td></tr>';
		}
		
		tabla1_1=tabla1_1+'<tr><td rowspan="4" class="centrado"><span class="dia_fila">'+dias_semana[i]+'</span><br><span class="numero numero_fila">'+dia_fila.getDate()+'</span></td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;<span id="santoral_'+i+'" class="santoral"><img src="img/cargando.gif" height="13"></span>';

		var myUrl = 'https://api.abalin.net/get/namedays?day='+dia_fila.getDate()+'&month='+(dia_fila.getMonth()+1)+'&country=es';
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", function () {
			var obj = JSON.parse(this.responseText);
			text = obj.data.name_es;
			if (text=="Patricio") { text = '<span style="color:green; font-weight: boldest;"><img src="img/trebol.png" class="trebol" alt="Día de San Patricia"> '+text+'</span>'; }
			    document.getElementById('santoral_'+ii).innerHTML=text;
			    ii++;
			});
			oReq.open("GET", proxy + myUrl);
			oReq.send();
	
		tabla1_1=tabla1_1+'</td></tr>';
		tabla2_1=tabla2_1+'<tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr>';
		tabla1_2=tabla1_2+'<div class="circulo1"></div><br>';
		tabla2_2=tabla2_2+'<div class="circulo2"></div><br>';
	}
	
	tabla1_1=tabla1_1+"</table>";  
	tabla2_1=tabla2_1+"</table>";  
	
	document.getElementById("tabla1_1").innerHTML=tabla1_1;  
	document.getElementById("tabla1_2").innerHTML=tabla1_2;  
	
	document.getElementById("tabla2_2").innerHTML=tabla2_2;  
	document.getElementById("tabla2_1").innerHTML=tabla2_1;  

} // iniciar

iniciar(ahora);

var marcador=true;

document.getElementById('conmutar').onclick = function() { /* si el boton es pulsado modifica fecha */
    if (marcador == true) {
    	ahora = new Date("May 21, 2012 08:00:00");
		marcador=false;
		iniciar(ahora);
	} else {
		ahora = new Date();
    	marcador=true;
		iniciar(ahora);
	}
}


function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

