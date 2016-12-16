import { Component, ViewChild } from '@angular/core';
import { TesterService } from './tester/tester.service';
import { LoggerService } from './logger/logger.service';
import { ConsoleComponent } from './console/console.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers : [ TesterService, LoggerService ]

})
export class AppComponent { 

  numberOfTests = 0;
  mode = "1";
  results = {
    "aliveCount": 0,
    "alivePct": 0,
    "deadCount": 0,
    "deadPct": 0
  };
  @ViewChild('console') console: ConsoleComponent;

  constructor(private _testerService : TesterService, private _loggerService : LoggerService ){
  }

  ngOnInit() {}

  runTests(){

    if(isNaN(this.numberOfTests)){
      alert("Please provide a numeric value");
      return;
    } else if(this.numberOfTests > 1000){
      alert("Number of Tests to High please enter a number under 1000");
      return;
    } else if(this.numberOfTests < 1){
      alert("Please enter a number larger than 0");
      return;
    }

    this._loggerService.init(this.console);
    this._testerService.init(+this.mode, false, this._loggerService);
    this._testerService.run(this.numberOfTests);
    this.results = this._testerService.getResults();
  }
}