#### NPM Install 
   
   ```sh
   $> npm install air-stream-local-mim
   ```
   
   ### Basic Usage Example ###
   
   ```js
   
   import { stream } from 'air-stream';
   import dbg from "air-stream-local-mim";
   
   //... //
   
   {
       dbg({
           stream,
           settings: { windowed: false },
           buttons: [ {
               name: "01",
               onclick: emt => {
                   values = [...values, 1];
                   emt({
                       [type]: {
                           /** stream content */
                           sum: 10
                       }
                   });
               },
               size: {x: 1, y: 1},
           }]
       })
   }
   
   ```
   
   ### How to generate the documentation ###
   
   The docs can be generated using npm:
   
   ```sh
   $> npm run docs
   ```