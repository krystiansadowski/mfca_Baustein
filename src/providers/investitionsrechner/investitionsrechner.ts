import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InvestitionsrechnerProvider {

  kosten: any = [];
  private alleAusgelesenenKostenTraegerWerteSumiert: number = 0;
  private ergVerwertungskostenVorInvestition: number = 0;
  private kostenEndeNutzung: number = 0;


  constructor() { }

  load() {
    this.kosten = [

      // Testdaten  Tab1 
      { kostentraegerTyp: 'betriebsAltMaterialKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltBetriebundHilfstoffeKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltWartungKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltEntsorgungKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltEnergieKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltWerkzeugKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltPersonalKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltRaumKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltInstandsetzungKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltRuestKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltLagerKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsAltSonstigebetriebskosten', kostentraegerWert: '10' },

      { kostentraegerTyp: 'verwertungsRueckbauKosten', kostentraegerWert: '100' },
      { kostentraegerTyp: 'verwertungsRestwert', kostentraegerWert: '10' },
      { kostentraegerTyp: 'verwertungsSonstigeVerwertungKosten', kostentraegerWert: '5' },

      // Testdaten  Tab2 erterTeil
      { kostentraegerTyp: 'betriebsInfraNeuBeschaffungsKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsInfraNeuNeuTypInfraAInfrastrukturKosten', kostentraegerWert: '10' },
      { kostentraegerTyp: 'betriebsInfraNeuTypInfraSonstigeEntstehungsKosten', kostentraegerWert: '10' },
     
      // Testdaten Tab2 zweiterTeil
      { kostentraegerTyp: 'betriebsNeuMaterialKosten', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuBetriebsundHilfsStoffeKosten', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuWartungsKosten', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuAbfallManagement', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuEnergieKosten', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuWerkzeugKosten', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuPersonalKosten', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuRaumKosten', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuInstandsetzungKosten', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuRuestKosten', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuLagerKosten', kostentraegerWert: '5' },
      { kostentraegerTyp: 'betriebsNeuSonstigeBetriebsKosten', kostentraegerWert: '15' },

      // Testdaten Tab2 dritterTeil
      { kostentraegerTyp: 'verwertungsNeuRueckbauKosten', kostentraegerWert: '2' },
      { kostentraegerTyp: 'verwertungsNeuRestwert', kostentraegerWert: '100' },


      // Testdaten Tab3
      { kostentraegerTyp: 'kalkulatorischerZins', kostentraegerWert: '5'},
      { kostentraegerTyp: 'nutzungsdauer', kostentraegerWert: '20'}
      
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


  getZinsfaktor(){
    var zinsfaktor = 0.0;
    var zins = this.getKostentraegerByName('kalkulatorischerZins')/100;
    zinsfaktor =  1+ zins;

    return zinsfaktor;
  }

  getNutzungsdauer(){
    return this.getKostentraegerByName('nutzungsdauer');
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


  berechneVerwertungskostenNachInvestition() {
    this.ergVerwertungskostenVorInvestition = 0.0;

    var neuRestwert = parseFloat(this.getKostentraegerByName("verwertungsNeuRestwert"));
    var neuRueckbauKosten = parseFloat(this.getKostentraegerByName("verwertungsNeuRueckbauKosten"));
    var sonstigeKosten = parseFloat(this.getKostentraegerByName("verwertungsSonstigeVerwertungKosten"));

    this.ergVerwertungskostenVorInvestition = neuRestwert - neuRueckbauKosten;
    console.log("Ergebnis: Der jährlichen Kosten nach der Investition: " + this.ergVerwertungskostenVorInvestition);

    return this.ergVerwertungskostenVorInvestition;
  }

}
