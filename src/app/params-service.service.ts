import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ParamsServiceService {

  public readonly dataServices: Observable<any> = new Observable();

  constructor() { }

}
