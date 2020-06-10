import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class eformDashboardPnCollapseService {

  public collapse: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {

  }

  updateState(collapsed: boolean): void {
    this.collapse.next(collapsed);
  }
}
