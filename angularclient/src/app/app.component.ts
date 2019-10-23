import { Component, OnInit } from '@angular/core';
import { MewDataService } from './service/mew-data/mew-data.service';
import { Layer } from './model/layer/layer';
import { Scaffold } from './model/scaffold/scaffold';
import { Print } from './model/print/print';
import { TextConfig } from './config/text-config/text-config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  // TODO: load failed message
  ngOnInit() {
    let defaultPrint: Print = new Print(1, this.textConfig.print + " 1");
    this.mewDataService.fetchPrintById(1).pipe(takeUntil(this.unsubscribe)).subscribe(print => {
      if (print == null) print = defaultPrint;
      this.print = [];
      this.print.push(print);
      this.print[0].isSelected = true;
      this.scaffolds = this.mewDataService.getScaffoldsOfPrint(this.print[0]);
      this.layers = this.mewDataService.getLayersOfPrint(this.print[0]);
    }, error => {
      this.print.push(defaultPrint);
      this.print[0].isSelected = true;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
