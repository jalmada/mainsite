import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app-console',
  templateUrl: 'console.component.html',
  providers : [  ]

})
export class ConsoleComponent { 

  textLines : string[] = [];
  text : string = "";

  constructor(){
  }

  ngOnInit( ) {
      this.print();
  }


  append(message : string)
  {
      this.textLines.push(message);
      this.print();

  }

  clean()
  {
    this.textLines = [];
    this.print();
  }

  print(){
    this.text = this.textLines.join("\n");
  }
}