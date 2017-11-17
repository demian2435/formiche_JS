/////////////////////////////////////////////////////////////////////////////
//////////////  FORMICA TAGLIA //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function FormicaTaglia() {
  this.x = random((formicaio[0][0]), (formicaio[0][0] + formicaio[0][2]));
  this.y = random((formicaio[0][1]), (formicaio[0][1] + formicaio[0][3]));
  this.dimension = random(4, 5);
  this.viva = true;
  this.vel = VELOCITA_F;
  this.energia = ENERGIA_F;
  this.time = 0;
  this.color = [165, 91, 27];
  this.stanca = false;
  this.dirX = 0;
  this.dirY = 0;
  this.compito = false;
  this.foglia = false;
  this.sporca = 0;
  this.RandX = random((formicaio[0][0]), (formicaio[0][0] + formicaio[0][2]));
  this.RandY = random((formicaio[0][1]), (formicaio[0][1] + formicaio[0][3]));
  this.PuntoNull = [[this.RandX, this.RandY, 1, 1]];

  this.update = function () {
    let VIA = false;
    for (let i = 0; i < foglie.length; i++) {
      if (foglie[i][2] > 1 && foglie[i][6] > 0 && foglie[i][4] > 0 && FoglieConsegnate[2] <= 35) {
        VIA = true;
      }
    }
    if (VIA) {
      this.walk();
    } else {
      if (this.foglia) {
        this.goTo(S_consegna[0], pericolo);
        if (this.alCentro(this.x, this.y, FoglieConsegnate)) {
          if (this.foglia == true) {
            this.foglia = false;
            this.color = [165, 91, 27];
            if (FoglieConsegnate[2] <= 35) {
              FoglieConsegnate[2] += 0.1;
            }
          }
        }

      } else {
        this.goTo(this.PuntoNull[0], pericolo);
      }
    }
    this.show();
  }

  this.walk = function () {
    let distFogliaVicina1 = Infinity;
    let numeroFoglia1 = -1;
    for (let i = 0; i < foglie.length; i++) {
      if (foglie[i][2] > 1 && foglie[i][6] > 0 && foglie[i][4] > 0) {
        let distanza1 = Math.sqrt(Math.pow(this.x - foglie[i][0], 2) + Math.pow(this.y - foglie[i][1], 2));
        if (distanza1 < distFogliaVicina1) {
          distFogliaVicina1 = distanza1;
          numeroFoglia1 = i;
        }
      }
    }


    if (this.alCentro(this.x, this.y, FoglieConsegnate)) {
      if (this.foglia == true) {
        this.foglia = false;
        this.color = [165, 91, 27];
        FoglieConsegnate[2] += 0.1;
      }
    }

    if (this.dentro(this.x, this.y, foglie[numeroFoglia1])) {
      this.foglia = true;
      foglie[numeroFoglia1][0] += 0.25;
      foglie[numeroFoglia1][1] += 0.25;
      foglie[numeroFoglia1][2] -= 0.5;
      foglie[numeroFoglia1][3] -= 0.5;

      this.color = [0, 255, 0];
    }

    if (this.foglia == false) {
      this.goTo(foglie[numeroFoglia1], pericolo);
    }
    if (this.foglia) {
      this.goTo(S_consegna[0], pericolo);
    }
  }




  this.goTo = function (arrivo, blocco) {
    let varVel = random(-0.5, 1);

    if (this.x < arrivo[0] + arrivo[2] / 2) {
      this.dirX = this.vel * varVel;
    } else {
      this.dirX = -this.vel * varVel;
    }

    if (this.y < arrivo[1] + arrivo[3] / 2) {
      this.dirY = this.vel * varVel;
    } else {
      this.dirY = -this.vel * varVel;
    }

    for (let i = 0; i < blocco.length; i++) {
      if (this.dentro(this.x, this.y + this.dirY, blocco[i])) {
        this.dirY = 0;

        if ((arrivo[0] + arrivo[2] / 2) > (blocco[i][0] + blocco[i][2] / 2)) {
          this.dirX = this.vel * varVel;
        } else {
          this.dirX = -this.vel * varVel;
        }
      }

      if (this.dentro(this.x + this.dirX, this.y, blocco[i])) {
        this.dirX = 0;

        if ((arrivo[1] + arrivo[3] / 2) > (blocco[i][1] + blocco[i][3] / 2)) {
          this.dirY = this.vel * varVel;
        } else {
          this.dirY = -this.vel * varVel;
        }
      }
    }

    this.x += this.dirX;
    this.y += this.dirY;
  }

  this.dentro = function (x, y, obj) {
    if (x > (obj[0]) &&
      x < (obj[0] + obj[2]) &&
      y > (obj[1]) &&
      y < (obj[1] + obj[3])) {
      return true;
    }
  }

  this.show = function () {
    stroke([165, 91, 27]);
    strokeWeight(1.5);
    fill(this.color);
    ellipse(this.x, this.y, this.dimension)
  }

  this.alCentro = function (x, y, obj) {
    let dis2 = Math.sqrt(Math.pow(x - obj[0], 2) + Math.pow(y - obj[1], 2));
    if (dis2 < (obj[2] / 2)) {
      return true
    }
  }
}

/////////////////////////////////////////////////////////////////////////////
//////////////  FORMICA BIOLOGA /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


function FormicaBiologa() {
  this.x = random((formicaio[0][0]), (formicaio[0][0] + formicaio[0][2]));
  this.y = random((formicaio[0][1]), (formicaio[0][1] + formicaio[0][3]));
  this.dimension = random(1, 2);
  this.viva = true;
  this.vel = VELOCITA_F;
  this.energia = ENERGIA_F;
  this.time = 0;
  this.color = [99, 54, 16];
  this.stanca = false;
  this.dirX = 0;
  this.dirY = 0;
  this.info = false;
  this.RandX = random((formicaio[0][0]), (formicaio[0][0] + formicaio[0][2]));
  this.RandY = random((formicaio[0][1]), (formicaio[0][1] + formicaio[0][3]));
  this.PuntoNull = [[this.RandX, this.RandY, 5, 5]];

  this.update = function () {
    let VIA2 = false;
    if (FoglieConsegnate[2] <= 35) {
      VIA2 = true;
    }
    if (VIA2) {
      this.walk();
    } else {
      this.goTo(this.PuntoNull[0], pericolo);
    }
    this.show();
  }

  this.walk = function () {
    let distFogliaVicina = Infinity;
    let numeroFoglia = -1;
    for (let i = 0; i < foglie.length; i++) {
      if (foglie[i][2] > 1 && foglie[i][5] < 1) {
        let distanza = Math.sqrt(Math.pow(this.x - foglie[i][0], 2) + Math.pow(this.y - foglie[i][1], 2));
        if (distanza < distFogliaVicina) {
          distFogliaVicina = distanza;
          numeroFoglia = i;
        }
      }
    }

    if (this.dentro(this.x, this.y, foglie[numeroFoglia])) {
      foglie[numeroFoglia][5] = 1;
      if (foglie[numeroFoglia][4] > 0) {
        this.info = true;
        foglie[numeroFoglia][6] = 1;
      }
    }

    if (this.dentro(this.x, this.y, formicaio[0])) {
      if (this.info == true) {
        this.info = false;
      }
    }

    if (this.info == false) {
      this.goTo(foglie[numeroFoglia], pericolo);
    }
    if (this.info) {
      this.goTo(formicaio[0], pericolo);
    }
  }

  this.goTo = function (arrivo, blocco) {
    let varVel = random(-0.5, 1);

    if (this.x < arrivo[0] + arrivo[2] / 2) {
      this.dirX = this.vel * varVel;
    } else {
      this.dirX = -this.vel * varVel;
    }

    if (this.y < arrivo[1] + arrivo[3] / 2) {
      this.dirY = this.vel * varVel;
    } else {
      this.dirY = -this.vel * varVel;
    }

    for (let i = 0; i < blocco.length; i++) {
      if (this.dentro(this.x, this.y + this.dirY, blocco[i])) {
        this.dirY = 0;

        if ((arrivo[0] + arrivo[2] / 2) > (blocco[i][0] + blocco[i][2] / 2)) {
          this.dirX = this.vel * varVel;
        } else {
          this.dirX = -this.vel * varVel;
        }
      }

      if (this.dentro(this.x + this.dirX, this.y, blocco[i])) {
        this.dirX = 0;

        if ((arrivo[1] + arrivo[3] / 2) > (blocco[i][1] + blocco[i][3] / 2)) {
          this.dirY = this.vel * varVel;
        } else {
          this.dirY = -this.vel * varVel;
        }
      }
    }

    this.x += this.dirX;
    this.y += this.dirY;
  }

  this.dentro = function (x, y, obj) {
    if (x > (obj[0]) &&
      x < (obj[0] + obj[2]) &&
      y > (obj[1]) &&
      y < (obj[1] + obj[3])) {
      return true;
    }
  }

  this.show = function () {
    stroke(this.color);
    strokeWeight(this.dimension);
    point(this.x, this.y);
  }
}

/////////////////////////////////////////////////////////////////////////////
//////////////  FORMICA GIARDINIERA /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


function FormicaGiardiniera() {
  this.x = random((formicaio[0][0]), (formicaio[0][0] + formicaio[0][2]));
  this.y = random((formicaio[0][1]), (formicaio[0][1] + formicaio[0][3]));
  this.dimension = random(1, 2);
  this.viva = true;
  this.vel = VELOCITA_F;
  this.energia = ENERGIA_F;
  this.time = 0;
  this.color = [99, 54, 16];
  this.stanca = false;
  this.dirX = 0;
  this.dirY = 0;
  this.compiti = false;
  this.foglia = 0;
  this.RandX = random((formicaio[0][0]), (formicaio[0][0] + formicaio[0][2]));
  this.RandY = random((formicaio[0][1]), (formicaio[0][1] + formicaio[0][3]));
  this.PuntoNull = [[this.RandX, this.RandY, 5, 5]];

  this.update = function () {
    let VIA3 = false;
    if (FoglieFungo[2] <= 45 && FoglieConsegnate[2] > 1 && this.foglia == 0) {
      VIA3 = true;
    }
    if (VIA3) {
      this.prendiFoglie();
    } else {
      this.produciCibo();
    }
    this.show();
  }

  this.prendiFoglie = function () {
    this.goToLiscio(FoglieConsegnate);
    if (this.alCentro(this.x, this.y, FoglieConsegnate)) {
      this.foglia = 1;
      FoglieConsegnate[2] -= 0.2;
    }
  }
  this.produciCibo = function () {
    this.goToLiscio(FoglieFungo);
    if (this.alCentro(this.x, this.y, FoglieFungo) && this.foglia == 1) {
      this.foglia = 0;
      FoglieFungo[2] += 0.1;
    }
  }

  this.goToLiscio = function (arrivo) {
    let varVel = random(-0.5, 1);

    if (this.x < arrivo[0]) {
      this.dirX = this.vel * varVel;
    } else {
      this.dirX = -this.vel * varVel;
    }

    if (this.y < arrivo[1]) {
      this.dirY = this.vel * varVel;
    } else {
      this.dirY = -this.vel * varVel;
    }

    this.x += this.dirX;
    this.y += this.dirY;
  }

  this.alCentro = function (x, y, obj) {
    let dis2 = Math.sqrt(Math.pow(x - obj[0], 2) + Math.pow(y - obj[1], 2));
    if (dis2 < 1) {
      return true
    }
  }

  this.show = function () {
    stroke(this.color);
    strokeWeight(this.dimension);
    point(this.x, this.y);
  }
}