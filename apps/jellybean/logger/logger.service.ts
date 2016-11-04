import { Injectable } from '@angular/core';
import { ConsoleComponent } from '../console/console.component';

@Injectable()
export class LoggerService
{
    private _console : ConsoleComponent;

    constructor(){}

    init(console : ConsoleComponent){
        this._console = console;
    }

    log(message: string){
        this._console.append(message);
    }

    clean(){
        this._console.clean();
    }

}