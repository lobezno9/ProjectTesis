import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/services/aleret.service';
import { CountInventoryDetailService } from 'src/app/services/count-inventory-detail.service';
import { CountInventoryService } from 'src/app/services/count-inventory.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Result } from 'src/app/shared/general/Result';
import { AddCountInventoryIn } from 'src/app/shared/methodparameters/CountInventory/AddCountInventoryIn';
import { UpdateCountInventoryIn } from 'src/app/shared/methodparameters/CountInventory/UpdateCountInventoryIn';
import { GetCountInventoryDetailIn } from 'src/app/shared/methodparameters/CountInventoryDetail/GetCountInventoryDetailIn';
import { GetWarehouseIn } from 'src/app/shared/methodparameters/Warehouse/GetWarehouseIn';
import { CountInventory } from 'src/app/shared/models/CountInventory';
import { CountInventoryDetail } from 'src/app/shared/models/CountInventoryDetai';
import { Warehouse } from 'src/app/shared/models/Warehouse';

@Component({
  selector: 'app-create-count',
  templateUrl: './create-count.component.html',
  styleUrls: ['./create-count.component.css']
})
export class CreateCountComponent implements OnInit {

  // Decorador que recibe un valor de tipo CountInventory se utiliza para mostrar la informacion del conteo
  @Input() CountModel: [CountInventory, any];
  //Variables para el formulario
  formCreateCount: FormGroup;
  showLoader: boolean = true;
  listWehehouse: Warehouse[];
  filterWareHouse: GetWarehouseIn;
  addCountInventory: AddCountInventoryIn;
  updateCountInventoryIn: UpdateCountInventoryIn;

  listCountInventoryDetail: CountInventoryDetail[];
  countInventoryDetailList: CountInventoryDetail[] = [];
  Admin: boolean = false;

  constructor(
    private modal: NgbModal,
    private toastr: ToastrService,
    private alertService: AlertService,
    private wareHouseService: WarehouseService,
    private countInventoryService: CountInventoryService,
    private countInventoryDetailService: CountInventoryDetailService,
    private formBuilder: FormBuilder,
  ) { }



  ngOnInit(): void {
    if (this.CountModel !== undefined && this.CountModel !== null) {
      this.Admin = this.CountModel[1];
      this.CreateFormEdit(this.CountModel[0])
      this.getCountInventoryDetailbyId(this.CountModel[0]);
    }
    else {
      this.CreateFrom();
    }
    this.getWareHouses();
    this.showLoader = false;
  }
  //Funcion para crear el formulario de Crear conteos
  CreateFrom() {
    this.formCreateCount = new FormGroup({
      id: new FormControl(0, Validators.required),
      description: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      wareHouseId: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      numberCounts: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(5)]),
    })
  }
  //Funcion para crear formulario de editar conteos
  CreateFormEdit(itemGroup: CountInventory) {
    this.formCreateCount = new FormGroup({
      id: new FormControl(itemGroup.id, Validators.required),
      description: new FormControl(itemGroup.description, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      wareHouseId: new FormControl(itemGroup.wareHouseId, [Validators.required]),
      // state: new FormControl({ value: itemGroup.state, disabled: itemGroup.state ? false : true }, [Validators.required]),
      state: new FormControl({ value: itemGroup.state, disabled: itemGroup.state ? false : (this.Admin ? false : true) }, [Validators.required]),//PROBAR
      numberCounts: new FormControl(0),
      countInventoryDetails: new FormArray([])
    })
  }
  //Funcion que carga el detalle del conteo por el id del conteo y llena un FormArray con el detalle
  getCountInventoryDetailbyId(itemCountInventory: CountInventory) {
    let filter: GetCountInventoryDetailIn = {
      countInventoryDetail: { countInventoryId: itemCountInventory.id }
    }
    this.countInventoryDetailService.GetAll(filter).subscribe(data => {
      if (data.result === Result.Success) {
        // console.log(data);
        this.listCountInventoryDetail = data.listCountInventoryDetail;
        data.listCountInventoryDetail.forEach((element, indx) => {
          this.countInventoryDetail.push(this.CreateFormCountInventoryDetail(element, indx));          // console.log(element, "ELEMENT");
        });
      }
    });
  }
  //Funcion que carga la lista de los almacenes
  getWareHouses() {
    this.filterWareHouse = { warehouse: {} }
    this.wareHouseService.GetAll(this.filterWareHouse).subscribe(data => {
      if (data.result === Result.Success) {
        this.listWehehouse = data.listWarehouse
      }
    })
  }
  //Funcion para extraer de formCreateCount el FormArray 
  get countInventoryDetail(): FormArray {
    return this.formCreateCount.get('countInventoryDetails') as FormArray;
  }
  //Funcion que adiciona conteos adicionales de ser necesario, maximo 5
  AddCountInventoryDetail() {
    if (this.countInventoryDetail.length < 5) {
      this.countInventoryDetail.push(this.CreateFormCountInventoryDetail(null, null));
    }
  }
  //Funcion que elimina los conteos adicionales sino se quieren agregar
  DeleteCountInventoryDetail(index: number) {
    if (this.countInventoryDetail.length !== 1) {
      this.countInventoryDetail.removeAt(index);
    }
  }
  //Funcion que se encarga de crear el Formn de Detalle de conteos 
  CreateFormCountInventoryDetail(itemCountInventoryDetail: CountInventoryDetail, index: number): FormGroup {
    let form = this.formBuilder.group({
      idDetail: new FormControl(itemCountInventoryDetail != null && itemCountInventoryDetail.id != null ? itemCountInventoryDetail.id : 0),
      idCountInventory: new FormControl(itemCountInventoryDetail != null && itemCountInventoryDetail.countInventoryId != null ? itemCountInventoryDetail.countInventoryId : 0),
      count: new FormControl({ value: itemCountInventoryDetail != null && itemCountInventoryDetail.count != null ? itemCountInventoryDetail.count : 0, disabled: true }),
      stateDet: new FormControl(itemCountInventoryDetail === null ? (itemCountInventoryDetail != null && itemCountInventoryDetail.state != null ? itemCountInventoryDetail.state : true) :
        { value: itemCountInventoryDetail != null && itemCountInventoryDetail.state != null ? itemCountInventoryDetail.state : true, disabled: itemCountInventoryDetail.state ? false : (this.Admin ? false : true) }),
      isStarted: new FormControl(itemCountInventoryDetail != null && itemCountInventoryDetail.isStarted != null ? itemCountInventoryDetail.isStarted : false),
      isNew: new FormControl(itemCountInventoryDetail != null && itemCountInventoryDetail.isNew != null ? itemCountInventoryDetail.isNew : true),
    });
    // console.log(form['value']);
    //itemGroup.state ? false : (this.Admin ? false : true)
    return form;
  }


  //Funcion recursivo que sirve para crear y actualizar los conteos de inventario
  OnSubmit() {
    this.alertService.confirm('', '¿Esta seguro que desea Guardar?').subscribe(res => {
      if (res) {
        if (this.formCreateCount.controls.id.value !== null && this.formCreateCount.controls.id.value !== undefined
          && this.formCreateCount.controls.id.value !== 0) {

          this.countInventoryDetail.value.forEach((element, indx) => {

            let resourceItem = {} as CountInventoryDetail;
            resourceItem.id = element.idDetail;
            resourceItem.countInventoryId = this.formCreateCount.value.id;
            resourceItem.count = indx + 1;
            resourceItem.state = element.stateDet;
            resourceItem.isStarted = element.isStarted;
            resourceItem.isNew = element.isNew;
            this.countInventoryDetailList.push(resourceItem);
          })

          this.updateCountInventoryIn = {
            countInventory: {
              id: this.formCreateCount.value.id,
              wareHouseId: this.formCreateCount.value.wareHouseId,
              description: this.formCreateCount.value.description,
              state: this.formCreateCount.value.state,
            },
            listCountInventoryDetail: this.countInventoryDetailList
          }
          // console.log(this.updateCountInventoryIn);

          this.countInventoryService.Update(this.updateCountInventoryIn).subscribe(data => {
            // console.log(data);
            if (data.result === Result.Success) {
              this.toastr.success("Se almaceno correctamente");
              this.modal.dismissAll();
              this.countInventoryService.ExecuteShareEvent()
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
          })

        } else {
          this.addCountInventory = {
            countInventory: {
              wareHouseId: this.formCreateCount.value.wareHouseId,
              description: this.formCreateCount.value.description,
              numberCounts: this.formCreateCount.value.numberCounts,
              state: true,
              dateCreation: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), new Date().getHours() - 5, new Date().getUTCMinutes()),
            }
          }
          // console.log(this.addCountInventory, 'Form');
          this.countInventoryService.Add(this.addCountInventory).subscribe(data => {
            if (data.result === Result.Success) {
              this.toastr.success("Se almaceno correctamente");
              this.modal.dismissAll();
              this.countInventoryService.ExecuteShareEvent()
            } else {
              this.toastr.error("Ocurrio un error, por favor intente de nuevo");
              console.log(data);
            }
          })
        }
      } else {
        this.countInventoryService.ExecuteShareEvent();
      }

    });
  }

}