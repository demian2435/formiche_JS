TOTfoglie = 2000;
TOTmuri = 10;
VELOCITA_F = 2;
ENERGIA_F = 100;

TOT_taglia = 500;
TOT_bio = 100;
TOT_giar = 50;

MONDOx = 800;
MONDOy = 600;

let formicaio = [[0, 0, 150, 150]];
let S_fungo = [[0, 0, 50, 50]];
let S_consegna = [[0, 0, 50, 50]];
let S_mensa = [[0, 0, 50, 50]];
let S_discarica = [[0, 0, 50, 50]];
let pericolo = [[0, 0, 0, 0]];
let formiche = [];
let foglie = [[0, 0, 0, 0, 0, 0, 0]];

let FoglieConsegnate = [0, 0, 1];
let FoglieFungo = [0, 0, 1];

function setup() {
  createCanvas(MONDOx, MONDOy);

  //COSTITUZIONE FORMICAIO
  let ForX = floor(random(200, MONDOx - 200));
  let ForY = floor(random(200, MONDOy - 200));
  formicaio[0][0] = ForX;
  formicaio[0][1] = ForY;

  //SALA FUNGO
  S_fungo[0][0] = ForX + 50;
  S_fungo[0][1] = ForY + 50;
  //SALA CONSEGNA
  S_consegna[0][0] = ForX + 50;
  S_consegna[0][1] = ForY + 100;
  //SALA MENSA
  S_mensa[0][0] = ForX + 100;
  S_mensa[0][1] = ForY + 50;
  //SALA CACCA
  S_discarica[0][0] = ForX + 0;
  S_discarica[0][1] = ForY + 50;
  //UPDATE
  FoglieConsegnate[0] = S_consegna[0][0] + 25;
  FoglieConsegnate[1] = S_consegna[0][1] + 25;
  FoglieFungo[0] = S_fungo[0][0] + 25;
  FoglieFungo[1] = S_fungo[0][1] + 25;


  //CREA FORMICHE
  for (let i = 0; i < TOT_taglia; i++) { formiche.push(new FormicaTaglia()) }
  for (let i = 0; i < TOT_bio; i++) { formiche.push(new FormicaBiologa()) }
  for (let i = 0; i < TOT_giar; i++) { formiche.push(new FormicaGiardiniera()) }

  //CREAZIONE MURI
  for (let i = 0; i < TOTmuri; i++) {
    let siPuoFareP = true;
    let x = floor(random(10, MONDOx - 10));
    let y = floor(random(10, MONDOy - 10));
    let Dx = floor(random(10, 50));
    let Dy = floor(random(10, 50));
    for (let i = 0; i < pericolo.length; i++) {
      if (pitagoraCentro(x, y, Dx, Dy, pericolo[i]) || pitagoraCentro(x, y, Dx, Dy, formicaio[0])) {
        siPuoFareP = false;
      }
    }
    if (siPuoFareP) {
      pericolo.push([x, y, Dx, Dy]);
    }
  }

  //CREAZIONE FOGLIE
  for (let y = 0; y < TOTfoglie; y++) {
    let siPuoFareF = true;
    let Fx = floor(random(20, MONDOx - 20));
    let Fy = floor(random(20, MONDOy - 20));
    let FDx = 10;
    let FDy = 10;
    let buona = floor(random(2));
    let scoperta = 0;
    let disponibile = 0;
    for (let i = 0; i < pericolo.length; i++) {
      if (interno(Fx + (FDx / 2), Fy + (FDy / 2), pericolo[i]) || pitagoraCentro(Fx, Fy, FDx, FDy, formicaio[0])) {
        siPuoFareF = false;
      } else {
        for (let ii = 0; ii < foglie.length; ii++) {
          if (interno(Fx + (FDx / 2), Fy + (FDy / 2), foglie[ii])) {
            siPuoFareF = false;
          }
        }
      }
    }
    if (siPuoFareF) {
      foglie.push([Fx, Fy, FDx, FDy, buona, scoperta, disponibile]);
    }
  }
  background(0);
}

function draw() {
  background(0);

  //FORMICAIO
  noStroke();
  fill(180);
  rect(formicaio[0][0], formicaio[0][1], formicaio[0][2], formicaio[0][3]);
  //SALE
  fill(255);
  rect(S_fungo[0][0], S_fungo[0][1], S_fungo[0][2], S_fungo[0][3]);
  fill(150);
  rect(S_consegna[0][0], S_consegna[0][1], S_consegna[0][2], S_consegna[0][3]);
  fill(0, 10, 0);
  rect(S_mensa[0][0], S_mensa[0][1], S_mensa[0][2], S_mensa[0][3]);
  fill(20, 20, 0);
  rect(S_discarica[0][0], S_discarica[0][1], S_discarica[0][2], S_discarica[0][3]);
  //UPDATE
  noStroke();
  fill(0, 255, 0);
  ellipse(FoglieConsegnate[0], FoglieConsegnate[1], FoglieConsegnate[2]);
  fill(80);
  ellipse(FoglieFungo[0], FoglieFungo[1], FoglieFungo[2]);

  //PERICOLO
  for (let i = 0; i < pericolo.length; i++) {
    noStroke();
    fill(48, 32, 19);
    rect(pericolo[i][0], pericolo[i][1], pericolo[i][2], pericolo[i][3]);
  }

  //FOGLIE
  for (let i = 0; i < foglie.length; i++) {
    noStroke();
    if (foglie[i][5] > 0) {
      if (foglie[i][4] > 0) {
        fill(0, 255, 0);
      } else {
        fill(0, 50, 0);
      }
    } else {
      fill(255)
    }
    rect(foglie[i][0], foglie[i][1], foglie[i][2], foglie[i][3]);
  }

  //FORMICHE
  for (let i = 0; i < formiche.length; i++) {
    formiche[i].update();
  }
}

function interno(x, y, obj) {
  if (x > (obj[0]) &&
    x < (obj[0] + obj[2]) &&
    y > (obj[1]) &&
    y < (obj[1] + obj[3])) {
    return true;
  }
}

function pitagoraCentro(x, y, Lx, Ly, obj) {
  let dis = Math.sqrt(Math.pow((x + Lx / 2) - (obj[0] + obj[2] / 2), 2) + Math.pow((y + Ly / 2) - (obj[1] + obj[3] / 2), 2));
  if (dis < (Lx + Ly + obj[2] / 1.5)) {
    return true
  }
}
