import { Component, OnInit } from '@angular/core';
import { MewDataService } from './service/mewdata/mewdata.service';
import { Layer } from './model/layer/layer';
import { Scaffold } from './model/scaffold/scaffold';
import { Fiber } from './model/fiber/fiber';
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

  print: Print;
  scaffolds: Scaffold[];
  layers: Layer[];
  fibers: Fiber[];

  constructor(private mewDataService: MewDataService, private textConfig: TextConfig) {
    this.unsubscribe = new Subject<any>();
    this.print = null;
    this.scaffolds = [];
    this.layers = [];
    this.fibers = [];
  }

  ngOnInit() {
    this.mewDataService.fetchPrintById(1).pipe(takeUntil(this.unsubscribe)).subscribe(print => {
      if (print) {
        this.print = print;
        this.scaffolds = this.mewDataService.getScaffoldsOfPrint(this.print);
        this.layers = this.mewDataService.getLayersOfPrint(this.print);
        this.fibers = this.mewDataService.getFibersOfPrint(this.print);
      }
      else {
        this.print = new Print(1, this.textConfig.print + " 1");
      }
      this.print.isSelected = true;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
