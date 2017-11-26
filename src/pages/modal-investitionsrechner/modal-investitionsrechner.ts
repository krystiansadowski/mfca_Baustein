import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { InvestitionsrechnerProvider } from '../../providers/investitionsrechner/investitionsrechner';


@IonicPage()
@Component({
  selector: 'page-modal-investitionsrechner',
  templateUrl: 'modal-investitionsrechner.html',
})
export class ModalInvestitionsrechnerPage implements OnInit {
  private kapitalwertErgebnisse = [];
  private amortisationszseitErgebnisse = [];

  private kapitalChartData = [];
  private kapitalChartLabels: string[];
  private minScaleValue: number;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private investitionsrechnerService: InvestitionsrechnerProvider) { }


  ngOnInit() {
    var alternativen = this.investitionsrechnerService.getAlternativen('alternativen');
    this.berechneKapitalUndAmortisationforEachAlternative(alternativen);
    
    this.minScaleValue = this.getMinValue();

    // this.setChartData([{ data: [-310, 510], label: 'Kapitalwert' }]);
    // this.setChartLabels(['A', 'B']);

    this.setChartData([{ data: [this.kapitalwertErgebnisse], label: 'Kapitalwert' }]);
    var bezeichnungen = this.getInvestitionBezeichnung(alternativen);
    this.setChartLabels(bezeichnungen);
    var data = this.kapitalChartData;
    var label = this.kapitalChartLabels;
  }

  

  private berechneKapitalUndAmortisationforEachAlternative(alternativen) {
    for (var indexOfArray in alternativen) {
      var alternative = alternativen[indexOfArray];
      for (var i = 0; i < alternative.length; i++) {
        var alternativeObjekt = alternative[i];

        var nutzungsdauer = this.investitionsrechnerService.getNutzungsdauer();
        var zinsFaktor = this.investitionsrechnerService.getZinsfaktor();
        var jaehrlicheKostenVorInvestition = this.berechneVerwertungskostenVorInvestition(alternativeObjekt);
        var jaehrlicheEinsparungNachInvestition = this.berechneJaehrlicheEinsparung(alternativeObjekt);
        var kostenEndeNutzungNachInvestition = this.berechneVerwertungskostenNachInvestition(alternativeObjekt);

        var kapitalwert = this.berechneKapitalwert(jaehrlicheKostenVorInvestition, jaehrlicheEinsparungNachInvestition, kostenEndeNutzungNachInvestition, nutzungsdauer, zinsFaktor);
        this.kapitalwertErgebnisse.push(kapitalwert);
        console.log("Berechnete Kapitalwerte: ", this.kapitalwertErgebnisse);

        var amortisationszeit = this.berechneAmortisation(jaehrlicheKostenVorInvestition, zinsFaktor, jaehrlicheEinsparungNachInvestition);
        this.amortisationszseitErgebnisse.push(amortisationszeit);
        console.log("Berechnete Amortisationszeiten: ", this.amortisationszseitErgebnisse);
      }
    }
  }

  private getZinsfaktor() {
    var zinsaktor = this.investitionsrechnerService.zinsFaktor();
    console.log("Zinsfaktor: " + zinsaktor);
    return zinsaktor;
  }

  private getNutzungsdauer() {
    return this.investitionsrechnerService.getNutzungsdauer();
  }


  berechneVerwertungskostenVorInvestition(alternativeObjekt) {
    var ergVerwertungskostenVorInvestition = 0.0;
    var beschaffungsUndInfrastrukturKosten = this.summiereAlleValuesStartsWith(alternativeObjekt, 'betriebsInfraNeu');

    var rueckbauKosten = parseFloat(this.investitionsrechnerService.getValueByKey("verwertungAltRueckbauKosten"));
    var restWert = parseFloat(this.investitionsrechnerService.getValueByKey("verwertungAltRestwert"));
    var sonstigeKosten = parseFloat(this.investitionsrechnerService.getValueByKey("verwertungAltSonstigeVerwertungKosten"));

    ergVerwertungskostenVorInvestition = beschaffungsUndInfrastrukturKosten + (rueckbauKosten - restWert);
    console.log("Ergebnis: Der jährlichen Kosten vor der Investition betragen : " + ergVerwertungskostenVorInvestition + " Euro.");
    return ergVerwertungskostenVorInvestition;
  }


  berechneVerwertungskostenNachInvestition(alternativeObjekt) {
    var ergVerwertungskostenNachInvestition = 0.0;

    var neuRestwert = parseFloat(this.getValueFromAlternative(alternativeObjekt, "verwertungNeuRestwert"));
    var neuRueckbauKosten = parseFloat(this.getValueFromAlternative(alternativeObjekt, "verwertungNeuRueckbauKosten"));
    ergVerwertungskostenNachInvestition = neuRestwert - neuRueckbauKosten;

    console.log("Ergebnis: Der jährlichen Kosten nach der Investition betragen : " + ergVerwertungskostenNachInvestition + " Euro.");
    return ergVerwertungskostenNachInvestition;
  }


  berechneJaehrlicheEinsparung(alternativeObjekt) {
    var jaehrlicheKostenVorDerInvestition = this.investitionsrechnerService.summiereAlleValuesStartsWith('betriebsAlt');
    var jaehrlicheKostenNachDerInvestition = this.summiereAlleValuesStartsWith(alternativeObjekt, 'betriebsNeu');
    return jaehrlicheKostenVorDerInvestition - jaehrlicheKostenNachDerInvestition;
  }


  private berechneKapitalwert(jaehrlicheKostenVorInvestition, jaehrlicheEinsparungNachInvestition, kostenEndeNutzungNachInvestition, nutzungsdauer, zinsFaktor) {
    return -1 * jaehrlicheKostenVorInvestition + jaehrlicheEinsparungNachInvestition * ((Math.pow(zinsFaktor, nutzungsdauer) - 1) / (Math.pow(zinsFaktor, nutzungsdauer) * (zinsFaktor - 1))) + kostenEndeNutzungNachInvestition / Math.pow(zinsFaktor, nutzungsdauer);
  }

  private berechneAmortisation(jaehrlicheKostenVorInvestition, zinsFaktor, jaehrlicheEinsparungNachInvestition) {
    return Math.log(1 - jaehrlicheKostenVorInvestition * (zinsFaktor - 1) / jaehrlicheEinsparungNachInvestition) / Math.log(1 / zinsFaktor);
  }


  // Getter für Alternative-Investitionen
  private getValueFromAlternative(alternativeObjekt, keyToSearch) {
    let valueFound = "";

    for (var eigenschaft in alternativeObjekt) {
      if (alternativeObjekt.hasOwnProperty(eigenschaft)) {
        if (eigenschaft == keyToSearch) {
          if (alternativeObjekt[eigenschaft] == "") {
            alternativeObjekt[eigenschaft] = 0;
          }
          valueFound = alternativeObjekt[eigenschaft];
        }
      }
    }

    console.log("Getter : Ausgelesener Value für den Key '" + keyToSearch + "' = ", valueFound);
    return valueFound;
  }

  private getValuesFromWhichStartsWithKey(alternativeObjekt, keyToSearch) {
    let valueFound = [];

    for (var eigenschaft in alternativeObjekt) {
      if (alternativeObjekt.hasOwnProperty(eigenschaft)) {
        if (eigenschaft.startsWith(keyToSearch)) {
          if (alternativeObjekt[eigenschaft] == "") {
            alternativeObjekt[eigenschaft] = 0;
          }
          valueFound.push(alternativeObjekt[eigenschaft]);
        }
      }
    }
    console.log("Getter : Ausgelesener Value für den Key '" + keyToSearch + "' = ", valueFound);
    return valueFound;
  }


  /* Getter für den minimalen Kapitalwert und die minimale Amortisationszeit, damit das jeweilige Chart in der Skalierung angepasst werden kann.*/
  private getMinValue(){
    return Math.min.apply(Math, this.kapitalwertErgebnisse)
  }

  // Summierung für Alternative-Investitionen
  summiereAlleValuesStartsWith(alternativeObjekt, keyToSearch) {
    var alleGefundenenValuesGesamt = 0.0;

    var alleGefundenenValues = this.getValuesFromWhichStartsWithKey(alternativeObjekt, keyToSearch);
    for (var i = 0; i < alleGefundenenValues.length; i++) {
      alleGefundenenValuesGesamt += parseFloat(alleGefundenenValues[i]);
    }
    console.log("Berechnung: Ergebnis Summe für die Values Parameter startWith '" + keyToSearch + "' = " + alleGefundenenValuesGesamt.toString());
    return alleGefundenenValuesGesamt;
  }




  // Chart

  // Das funktioniert!

  // private kapitalChartLabels = ['Alternative 1', 'Alternative 2'];
  // private kapitalChartData = [
  //   { data: [510, 330], label: 'Kapitalwert' },
  // ];





  private setChartData(chartDataValues) {
    this.kapitalChartData = chartDataValues;
  }

  private setChartLabels(chartLabelValues: string[]) {
    this.kapitalChartLabels = chartLabelValues;
  }
  onChartClick(event) {
    console.log(event);
  }
  chartOptions = {                                                                                            
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {autoskip: false, beginAtZero: true, min: this.minScaleValue}}]
    }
  };

 


  private getInvestitionBezeichnung(alternativen) {
    var alternativeBezeichnung = [];
    for (var indexOfArray in alternativen) {
      var alternative = alternativen[indexOfArray];
      for (var i = 0; i < alternative.length; i++) {
        var alternativeObjekt = alternative[i];
        var bezeichnungInvestition = this.getValueFromAlternative(alternativeObjekt, 'bezeichnungInvestition');
        if (bezeichnungInvestition == "") {
          bezeichnungInvestition = "Alternative " + i;
        }
        alternativeBezeichnung.push(bezeichnungInvestition);
      }
    }
    return alternativeBezeichnung;
  }




  // Methode zum Schliessen des Modalds
  private closeModal() {
    this.viewCtrl.dismiss();
  }
}
