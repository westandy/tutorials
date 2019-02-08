
# Angular Pipes And Objects

## Keys/Properties
```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(obj: Object): Array<any> {
    return Object.keys(obj);
  }
}
```

## Object Keys
```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {
  transform(obj: Object): Array<any> {
    return Object.values(obj);
  }
}
```

## Object Keys
```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduce'
})
export class ReducePipe implements PipeTransform {
  transform(obj: Object): Array<any> {
    return Object.keys(obj).reduce( someReduceMethod, []);
  }
}
```
