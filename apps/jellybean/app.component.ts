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
    this._loggerService.init(this.console);
    this._testerService.init(+this.mode, false, this._loggerService);
    this._testerService.run(this.numberOfTests);
    this.results = this._testerService.getResults();
  }
}