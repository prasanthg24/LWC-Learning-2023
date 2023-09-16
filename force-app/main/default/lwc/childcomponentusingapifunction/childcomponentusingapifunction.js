import { LightningElement ,api} from 'lwc';
export default class Childcomponentusingapifunction extends LightningElement {


      currentTime  = new Date();
        
          @api 
          refresh()
          {
              this.currentTime = new Date();
          }

}