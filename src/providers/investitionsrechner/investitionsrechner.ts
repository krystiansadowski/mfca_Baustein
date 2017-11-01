import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InvestitionsrechnerProvider {

  kosten: any = [];
  private alleAusgelesenenKostenTraegerWerteSumiert: number = 0;
  private ergVerwertungskostenVorInvestition: number = 0;


  constructor() { }

  load() {
    this.kosten = [

      // Testdaten
      { kostentraegerTyp: 'betriebsMaterialKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsBetriebundHilfstoffeKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsWartungKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsEntsorgungKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsEnergieKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsWerkzeugKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsPersonalKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsRaumKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsInstandsetzungKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsRuestKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsLagerKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsSonstigebetriebskosten', kostentraegerWert: '10' },

      { kostentraegerTyp: 'verwertungsRueckbauKosten', kostentraegerWert: '100' },
      { kostentraegerTyp: 'verwertungsRestwert', kostentraegerWert: '10' },
      { kostentraegerTyp: 'verwertungsSonstigeVerwertungKosten', kostentraegerWert: '5' }
    ];
  }


    /* ------ Setter und Getter Methoden ------*/

  /* Setter für neue Kostentraeger */
  setKostentraeger(kostenTyp, kostenValue) {
    if (kostenValue == undefined) {
      kostenValue = 0;
    }

    this.kosten.push({ kostentraegerTyp: kostenTyp, kostentraegerWert: kostenValue });
    console.log("Setter: Kostenträger mit kostentraegerTyp: " + kostenTyp + ", kostentraegerWert: " + kostenValue + " wurde erfolgreich hinzugefügt.")
  }

  /*
  Getter für einen einzelnen KostentraegerWert
  @Param name des Kostenträgers
  */
  getKostentraegerByName(name) {
    if (this.kosten.length != 0) {
      for (let kosten of this.kosten) {
        if (kosten.kostentraegerTyp == name) {
          console.log("Getter: Ausgelesener Wert für Kostenträger " + name + " = " + kosten.kostentraegerWert);
          return kosten.kostentraegerWert;
        }
      }
    }
    else {
      console.log("Getter: Fehler: Keine Werte für Kostenträger vorhanden!")
    }
  }


  /*
  Getter für alle KostentraegerWerte, kostentraegerTyp beginntmit "startParam"
  @Param startParam des Kostenträgers
  */
  getKostentraegerWerteStartsWith(name) {
    let alleKostenTraegerWerteStrartsWith = [];

    if (this.kosten.length != 0) {
      for (let kosten of this.kosten) {
        // if (kosten.kostentraegerTyp.startsWith(name)) {
        if (kosten.kostentraegerTyp.startsWith(name)) {
          alleKostenTraegerWerteStrartsWith.push(kosten.kostentraegerWert);
        }
      }
      console.log("Getter: Alle ausgelesener Werte für Kostenträger mit Parameter startWith '" + name + "' = " + alleKostenTraegerWerteStrartsWith.toString());
      return alleKostenTraegerWerteStrartsWith;
    }
    else {
      console.log("Getter: Fehler: Keine Werte für Kostenträger vorhanden!")
    }
  }


  /* Getter für alle KostenträgerWerte */
  getKostentraegerWerte() {
    let alleKostenTraegerWerte = [];

    if (this.kosten.length != 0) {
      this.kosten.forEach(element => {
        alleKostenTraegerWerte.push(element.kostentraegerWert)
      });
      console.log("Getter: Alle ausgelesener Werte für Kostenträger mit Parameter startWith " + alleKostenTraegerWerte.toString());
      return alleKostenTraegerWerte;
    }
    else {
      console.log("Getter: Fehler: Keine Werte für Kostenträger vorhanden!")
    }
  }


  /* Getter für alle KostenträgerTypen und KostenträgerWerte startsWith name 
  @paramter name */
  getKostentreagerTypenUndKostentraegerWerte(name) {
    let alleKostentraegerTypenUndKostenTraegerwerte = [];

    if (this.kosten.length != 0) {
      this.kosten.forEach(element => {
        if (element.kostentraegerTyp.startsWith(name)) {
          alleKostentraegerTypenUndKostenTraegerwerte.push({ kostentraegerTyp: element.kostentraegerTyp, kostentraegerWert: element.kostentraegerWert });
        }
      });
      return alleKostentraegerTypenUndKostenTraegerwerte;
    }
  }




  /* ------ Methoden zur Berechnung ------*/

  sumAlleKostentraegerWerteStartsWith(name) {
    let alleAusgelesenenKostenTraegerWerte = this.getKostentraegerWerteStartsWith(name);
    // let dataSum = this.summiereGesamtenArray(alleAusgelesenenKostenTraegerWerte);

    this.alleAusgelesenenKostenTraegerWerteSumiert = this.summiereGesamtenArray(alleAusgelesenenKostenTraegerWerte);
    console.log("Ergebnis: Alle ausgelesener Werte für Kostenträger mit Parameter startWith '" + name + "' bilden die Summe = " + this.alleAusgelesenenKostenTraegerWerteSumiert.toString());
    return this.alleAusgelesenenKostenTraegerWerteSumiert;
  }


  private summiereGesamtenArray(alleKostenArray) {
    this.alleAusgelesenenKostenTraegerWerteSumiert = 0.0;

    for (var i = 0; i < alleKostenArray.length; i++) {
      this.alleAusgelesenenKostenTraegerWerteSumiert += parseFloat(alleKostenArray[i]);
    }
    return this.alleAusgelesenenKostenTraegerWerteSumiert;
  }


  berechneVerwertungskostenVorInvestition() {
    this.ergVerwertungskostenVorInvestition = 0.0;

    var rueckbauKosten = parseFloat(this.getKostentraegerByName("verwertungsRueckbauKosten"));
    var restWert = parseFloat(this.getKostentraegerByName("verwertungsRestwert"));
    var sonstigeKosten = parseFloat(this.getKostentraegerByName("verwertungsSonstigeVerwertungKosten"));
    
    this.ergVerwertungskostenVorInvestition = rueckbauKosten - restWert + sonstigeKosten;
    console.log("Ergebnis: Der jährlichen Kosten vor der Investition: " + this.ergVerwertungskostenVorInvestition);

    return this.ergVerwertungskostenVorInvestition;
  }
}
