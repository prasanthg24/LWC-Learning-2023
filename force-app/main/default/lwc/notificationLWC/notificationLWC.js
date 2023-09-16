import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';
import LightningPrompt from 'lightning/prompt';
import LightningConfirm from 'lightning/confirm';
export default class NotificationLWC extends LightningElement {

          async  handleAlert()
            {
                await LightningAlert.open({ 
                        message :"Sample Alert Message",
                        theme : "error",
                        label : "Alert Header"
                    }).then (()=>
                    {
                        console.log('alert closed');
                    });
                
            }
           async  handleConfirm()
            {
             const result =     await LightningConfirm.open({ 
                        message :"Sample confirm Message",
                        theme : "success",
                        label : "confirm Header"
                    }).then (()=>
                    {
                        console.log('result---', result);
                    });
            }
           async  handlePrompt()
            {
             const result =      await LightningPrompt.open({ 
                        message :"Sample Prompt Message",
                        theme : "error",
                        label : "Prompt Header",
                        defaultvalue:"test"
                    }).then ((result)=>
                    {
                        console.log('result-->',result);
                    });
            }
}