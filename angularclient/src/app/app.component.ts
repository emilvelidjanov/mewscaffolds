import { Component, OnInit } from '@angular/core';
import { PrintService } from './service/print-service/print.service';
import { Print } from './model/print/print';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title: string;
  saveButtonText: string;

  print: Print;
  
  constructor(private printService: PrintService) { }

  ngOnInit(): void {
    this.title = "MEW Scaffolds";
    this.saveButtonText = "Save";
    this.printService.getById(1).subscribe(value => {
      this.print = value;
    });
  }
}
