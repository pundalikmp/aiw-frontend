import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderService {
  
  private readonly loaderSubject: BehaviorSubject<LoaderState> = new BehaviorSubject<LoaderState>(<LoaderState>{ show: false });
  loaderState: Observable<LoaderState> = this.loaderSubject.asObservable();

  private readonly avatarSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  avatarState: Observable<string> = this.avatarSubject.asObservable();

  private readonly username: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  userState: Observable<string> = this.username.asObservable();

  constructor() { 
  }

  setAvatar(avatarState: string): void {
    this.avatarSubject.next(avatarState);
  }

  setUser(userState: string): void {
    this.username.next(userState);
  }

  show(): void {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  hide(): void {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}

export interface LoaderState {
  show: boolean;
}
