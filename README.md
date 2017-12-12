#### NPM Install 

```sh
$> npm install air-stream-local-mim
```

### Basic Usage Example ###

```js

import {Observable} from 'air-stream';
import stream from "air-stream-local-mim";

//... //

{
    stream: new Observable(stream({
        settings: { windowed: false },
        buttons: [ {
            name: "01",
            onclick: e => {
                rand_values = [...rand_values, 1];
                e.emit({
                    [type]: {
                        rand_stage: 2,
                        game_id: 77,
                        rand_values,
                    }
                });
            },
            size: {x: 1, y: 1},
        }]
    })),
}

```

### How to generate the documentation ###

The docs can be generated using npm:

```sh
$> npm run docs
```