import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountInventoryDetailService } from 'src/app/services/count-inventory-detail.service';
import { Result } from 'src/app/shared/general/Result';
import { GetCountInventoryDetailIn } from 'src/app/shared/methodparameters/CountInventoryDetail/GetCountInventoryDetailIn';
import { CountInventoryDetail } from 'src/app/shared/models/CountInventoryDetai';

import { ResportCountInventory } from 'src/app/shared/models/ResportCountInventory';
import { GetResportCountInventoryIn } from 'src/app/shared/methodparameters/CountInventory/GetResportCountInventoryIn';
import { IDelete, IDetect } from 'ngx-barcodeput';
import { AddCountsProductsIn } from 'src/app/shared/methodparameters/CountInventory/AddCountsProductsIn';
import { FormControl, FormGroup } from '@angular/forms';
import { CountInventoryService } from 'src/app/services/count-inventory.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/User';
import { GetAllUserIn } from 'src/app/shared/methodparameters/User/GetAllUserIn';
import { UsersService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/aleret.service';
import { ExportTableService } from 'src/app/services/export-table.service';

@Component({
  selector: 'app-count-inventory',
  templateUrl: './count-inventory.component.html',
  styleUrls: ['./count-inventory.component.css']
})
export class CountInventoryComponent implements OnInit {
  //Variables para los parametros de activeRoute
  countInvId: number;
  detailCount: boolean = true;
  //Variables para el formulario
  wareHouseId: number;
  count: number;
  filterCountInventoryDetail: GetCountInventoryDetailIn;
  ListCountInveDetail: CountInventoryDetail[];
  CountInventory: AddCountsProductsIn;
  formCountProduct: FormGroup;
  formDetailCount: FormGroup;
  name = '';
  listCountP: ResportCountInventory[]
  listResultCountP: ResportCountInventory[]
  reportCountInventoryFilter: GetResportCountInventoryIn;
  clickEventsubscription: Subscription;
  listUsers: User[]
  filterUser: GetAllUserIn;
  isUser: boolean = false;
  Count1: boolean = false;
  Count2: boolean = false;
  Count3: boolean = false;
  Count4: boolean = false;
  Count5: boolean = false;

  constructor(
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private countInventoryDetailService: CountInventoryDetailService,
    private reportCountinventoryService: CountInventoryService,
    private userService: UsersService,
    private alertService: AlertService,
    private exportTableService: ExportTableService,
  ) { }

  ngOnInit(): void {

    if (this.activeRoute.snapshot.paramMap.get("id") != null && this.activeRoute.snapshot.paramMap.get("id") != ""
      && this.activeRoute.snapshot.paramMap.get("Detail") != null && this.activeRoute.snapshot.paramMap.get("Detail") != "") {
      this.detailCount = this.activeRoute.snapshot.paramMap.get("Detail") == "true";
      this.countInvId = parseInt(this.activeRoute.snapshot.paramMap.get("id"));
    }
    this.clickEventsubscription = this.reportCountinventoryService.GetExecuteShareEvent().subscribe(() => {
      this.GetReportByCount();
    });
    if (this.detailCount === true && this.countInvId > 0) {
      this.CreateformDetail();
      this.getUser();
      this.GetReport();
      this.GetReportResultCount();
    } else if (this.detailCount === false && this.countInvId > 0) {
      this.CreateformCount();
      this.getCountDetail();
      this.GetReportByCount();
    }

  }

  //Formulario para realizar el conteo de productos
  CreateformCount() {
    this.formCountProduct = new FormGroup({
      idDetail: new FormControl(),
      barcodeCode: new FormControl(),
      wareHouseId: new FormControl({ value: null, disabled: true }),
    });
  }
  //Formulario para detallar los conteos de los productos
  CreateformDetail() {
    this.formDetailCount = new FormGroup({
      productId: new FormControl(0),
      isUsers: new FormControl(false),
      userId: new FormControl(0),
    });
  }
  //Funcion que obtiene el detalle de los conteos
  getCountDetail() {
    this.filterCountInventoryDetail = { countInventoryDetail: { state: true, isStarted: true, countInventoryId: this.countInvId, } };
    this.countInventoryDetailService.GetAll(this.filterCountInventoryDetail).subscribe(data => {
      if (data.result === Result.Success) {
        if (data.listCountInventoryDetail.length > 0) {
          this.ListCountInveDetail = data.listCountInventoryDetail
          this.formCountProduct.controls.wareHouseId.setValue(data.listCountInventoryDetail[0].wareHouse)
          this.wareHouseId = data.listCountInventoryDetail[0].wareHouseId
          this.count = data.listCountInventoryDetail[0].count
          this.GetReportByCount();
          this.Count1 = this.ListCountInveDetail.find(i => i.count == 1) ? true : false;
          this.Count2 = this.ListCountInveDetail.find(i => i.count == 2) ? true : false;
          this.Count3 = this.ListCountInveDetail.find(i => i.count == 3) ? true : false;
          this.Count4 = this.ListCountInveDetail.find(i => i.count == 4) ? true : false;
          this.Count5 = this.ListCountInveDetail.find(i => i.count == 5) ? true : false;
        }
        else {
          this.toastr.warning('No hay ningun conteo iniciado');
        }
      }
    });
  }
  //Funcion reutilizable para obtiene un informe del conteo tanto cuando es conteo o detalle 
  GetReport() {
    if (this.detailCount) {
      this.reportCountInventoryFilter = {
        resportCountInventory: { isUsers: false, isCounting: false, countInventoryId: this.countInvId }
      };
    }//else {
    //   this.reportCountInventoryFilter = {
    //     resportCountInventory: { isUsers: true, isCounting: true, countInventoryId: this.countInvId }
    //   };
    // }
    this.reportCountinventoryService.GetReport(this.reportCountInventoryFilter).subscribe(data => {
      if (data.result == Result.Success) {
        this.listCountP = data.listResportCountInventory
      }
    });
  }
  //Funcion reutilizable para obtiene un informe del conteo tanto cuando es conteo o detalle 
  GetReportByCount() {
    if (this.detailCount) {
      // this.reportCountInventoryFilter = {
      //   resportCountInventory: { isUsers: false, isCounting: false, countInventoryId: this.countInvId }
      // };
    } else {
      this.reportCountInventoryFilter = {
        resportCountInventory: { isUsers: true, isCounting: true, countInventoryId: this.countInvId, count: this.count }
      };
    }
    this.reportCountinventoryService.GetReportByCount(this.reportCountInventoryFilter).subscribe(data => {
      if (data.result == Result.Success) {
        this.listCountP = data.listResportCountInventory
      }
    });
  }
  //Funcion que obtiene un informe del conteo filtrado
  GetReportFilter() {
    this.isUser = this.formDetailCount.value.isUsers
    this.reportCountInventoryFilter = {
      resportCountInventory: {
        isCounting: false, countInventoryId: this.countInvId, isUsers: this.formDetailCount.value.isUsers,
        userId: this.formDetailCount.value.userId, productId: parseInt(this.formDetailCount.value.productId)
      }
    };
    this.reportCountinventoryService.GetReport(this.reportCountInventoryFilter).subscribe(data => {
      if (data.result == Result.Success) {
        this.listCountP = data.listResportCountInventory
      }
    });
  }
  //Funcion que recibe un evento con un valor y se encarga de almacenar el conteo y generar una alerta dependiendo
  onDetected(event: IDetect) {
    /* {event: KeyboardEvent, value: "9876543210", time: 0.07083499999716878, type: "scanner"} */
    /* {event: KeyboardEvent, value: "0123456789", time: 0.17083499999716878, type: "keyboard"} */
    if (event.type === 'scanner') {
      if (this.formCountProduct.valid) {

        this.CountInventory = {
          countsProducts: {
            barcode: String(event.value),
            wareHouseId: this.wareHouseId,
            countInventoryDetailId: this.formCountProduct.value.idDetail,
          }
        }
        this.reportCountinventoryService.CountInventory(this.CountInventory).subscribe(data => {
          if (data.result === Result.Success) {
            const audio = new Audio('./assets/sounds/Speech On.wav');
            this.GetReportByCount();
            audio.play();
            this.name = '';
            this.formCountProduct.controls.barcodeCode.setValue('')
          } else {
            // this.name = '';
            this.toastr.info(data.message)
            const audio = new Audio('./assets/sounds/Windows Background.wav');
            audio.play();
          }
        });
      } else {
        this.toastr.info("Seleccione algun conteo");
        const audio = new Audio('./assets/sounds/Windows Background.wav');
        audio.play();
        this.name = '';
        this.formCountProduct.controls.barcodeCode.setValue('')
      }
    }else{
      this.toastr.warning("Solo se permite el conteo mediante scanner");
      const audio = new Audio('./assets/sounds/Windows Background.wav');
      audio.play();
      this.name = '';
      this.formCountProduct.controls.barcodeCode.setValue('')
    }

  }

  onDelete(event: IDelete) {
    // console.log(event);
    /* {event: KeyboardEvent, value: "0123456789", type: "delete"} */
  }
  //Funcion que obtiene los usuarios 
  getUser() {
    this.filterUser = { user: null }
    this.userService.GetAll(this.filterUser).subscribe(data => {
      if (data.result === Result.Success) {
        this.listUsers = data.listUser
      }
    })
  }
  //Funcion que se encarga de exportar la tabla a xcs
  export() {
    this.alertService.confirm('', "Seguro desea exportar a excel").subscribe((res) => {
      if (res) {
        this.exportTableService.exportTableToExcel("ExportTable", "Count");
      }
    })
  }
  export1() {
    this.alertService.confirm('', "Seguro desea exportar a excel").subscribe((res) => {
      if (res) {
        this.exportTableService.exportTableToExcel("ExportTable1", "ResultCount");
      }
    })
  }
  //funcion que obtiene el Resultado del conteo
  GetReportResultCount() {
    this.reportCountInventoryFilter = {
      resportCountInventory: { isCounting: false, countInventoryId: this.countInvId }
    };
    this.reportCountinventoryService.GetReportResultCount(this.reportCountInventoryFilter).subscribe(data => {
      if (data.result == Result.Success) {
        this.listResultCountP = data.listResportCountInventory
      }
    });
  }
}
