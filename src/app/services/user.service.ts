import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { GetAllUserIn } from '../shared/methodparameters/User/GetAllUserIn';
import { GetAllUserOut } from '../shared/methodparameters/User/GetAllUserOut';
import { AddUserIn } from '../shared/methodparameters/User/AddUserIn';
import { AddUserOut } from '../shared/methodparameters/User/AddUserOut';
import { UpdateUserIn } from '../shared/methodparameters/User/UpdateUserIn';
import { UpdateUserOut } from '../shared/methodparameters/User/UpdateUserOut';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private _proxy: BaseService;

    public get proxy(): BaseService {
        return this._proxy;
    }

    constructor(http: HttpClient, protected router: Router) {
        this._proxy = new BaseService(http, router);
    }

    GetAll(getAllUserIn: GetAllUserIn): Observable<GetAllUserOut> {
        return this._proxy.executePost('User/GetAll', getAllUserIn)
    };

    Add(addUserIn: AddUserIn): Observable<AddUserOut> {
        return this._proxy.executePost('User/Add', addUserIn)
    };

    Update(updateUserIn: UpdateUserIn): Observable<UpdateUserOut> {
        return this._proxy.executePost('User/Update', updateUserIn)
    };

    Delete(updateUserIn: UpdateUserIn): Observable<UpdateUserOut> {
        return this._proxy.executePost('User/Delete', updateUserIn)
    };

    private subject = new Subject<any>();
    ExecuteShareEvent() {
        this.subject.next();
    }

    GetExecuteShareEvent(): Observable<any> {
        return this.subject.asObservable();
    }

}