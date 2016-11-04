import { Jellybean } from './jellybean.model';
import { SwitchMode } from '../enums/switchmode';

export class Test
{
    private _result : boolean;
    private _log : string[] = [];

    constructor (
        private _jellybeans : Jellybean[],
        private _mode : number = 1){}
        

    public run()
    {
        
        let whichJellybean = Math.floor(Math.random() * 10) % 3;
        let hostSelection : number;
        
        //TODO: Change for a while
        for(let x = 0; x < this._jellybeans.length; x++)
        {
            if(whichJellybean == x) continue;
            if(this._jellybeans[x].isPoisonous)
            {
                hostSelection = x;
                break;
            }
        }

        this._log.push(`Player selects: ${+(whichJellybean+1)}`);
        this._log.push(`Host selects: ${+(hostSelection+1)} is poisoned`);


        //0 = No swtich
        //1 = Always switch
        //2 = Randowm switch
        let newJellybean : number = whichJellybean;
        let switchJellybean = this._mode == 2 ? ((Math.floor(Math.random() * 10) % 2) == 1) : (this._mode == 1);
        if(switchJellybean)
        {
            for (let x = 0; x < this._jellybeans.length; x++)
            {
                if(x == whichJellybean) continue;
                if(x == hostSelection) continue;
                newJellybean = x;
                break;
            }
        }

        let finalJellybean = this._jellybeans[newJellybean];
        let playerStatus = finalJellybean.isPoisonous ? "Dead" : "Alive";
        let playerSwitch = switchJellybean ? "switches to" : "not switches";

        this._log.push(`Player ${playerSwitch}: ${+(newJellybean+1)}`);
        this._log.push(`Player is ${playerStatus}`);
        

        this._result = finalJellybean.isPoisonous;
    }

    get result(){
        return this._result;
    }

    get log(): string[]{
        return this._log;
    }
}