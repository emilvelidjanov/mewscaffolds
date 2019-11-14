import { Component, OnInit } from '@angular/core';
import { MewDataService } from './service/mew-data/mew-data.service';
import { Layer } from './model/layer/layer';
import { Scaffold } from './model/scaffold/scaffold';
import { Print } from './model/print/print';
import { TextConfig } from './config/text-config/text-config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private unsubscribe: Subject<any>;

  print: Print[];
  scaffolds: Scaffold[];
  layers: Layer[];

  constructor(private mewDataService: MewDataService, private textConfig: TextConfig) {
    this.unsubscribe = new Subject<any>();
    this.print = [];
    this.scaffolds = [];
    this.layers = [];
  }

  ngOnInit() {
    let defaultPrint: Print = new Print(1, this.textConfig.print);
    this.mewDataService.setObservedPrint(defaultPrint).pipe(takeUntil(this.unsubscribe)).subscribe(print => {
      if (print == null || print == undefined) print = defaultPrint;
      this.print = [];
      this.print.push(print);
      this.print[0].isSelected = true;
      this.scaffolds = this.mewDataService.getScaffoldsOfPrint(this.print[0]);
      this.layers = this.mewDataService.getLayersOfPrint(this.print[0]);
    }, error => {
      this.print.push(defaultPrint);
      this.print[0].isSelected = true;
    });
    this.mewDataService.pushNextPrint(defaultPrint);
  }

  saveToFile(): void {
    let data: string = JSON.stringify(this.mewDataService.serializePrint(this.mewDataService.print));
    let blob = new Blob([data], {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, "saveFile.txt");  
  }

  loadFromFile(event: any): void {
    let selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = () => {
      let newPrint: Print = this.mewDataService.initializeFetchedPrint(JSON.parse(fileReader.result.toString()));
      this.mewDataService.print = newPrint;
      this.mewDataService.pushNextPrint(this.mewDataService.print);
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
