import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/aleret.service';
import { CountInventoryService } from 'src/app/services/count-inventory.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Result } from 'src/app/shared/general/Result';
import { GetCountInventoryIn } from 'src/app/shared/methodparameters/CountInventory/GetCountInventoryIn';
import { GetWarehouseIn } from 'src/app/shared/methodparameters/Warehouse/GetWarehouseIn';
import { CountInventory } from 'src/app/shared/models/CountInventory';
import { Warehouse } from 'src/app/shared/models/Warehouse';

@Component({
  selector: 'app-count-list',
  templateUrl: './count-list.component.html',
  styleUrls: ['./count-list.component.css']
})
export class CountListComponent implements OnInit {
  //Variables para permisos
  Permisos: any;
  btnCrear: boolean = false;
  btnAbrir: boolean = false;
  btnBuscar: boolean = false;
  btnEliminar: boolean = false;
  btnActualizar: boolean = false;
  btnIniciar: boolean = false;
  Admin: boolean = false;
  //Variables para el formulario
  listWehehouse: Warehouse[];
  listCountInventory: CountInventory[];
  filterWareHouse: GetWarehouseIn;
  filterCountInventory: GetCountInventoryIn;
  actualPage: number = 1;
  showLoader: boolean = false;
  formList: FormGroup;
  itemSelected: [CountInventory,any];
  closeResult: string;
  clickEventsubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private wareHouseService: WarehouseService,
    private countInventoryService: CountInventoryService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.GetPermisos()
    this.clickEventsubscription = this.countInventoryService.GetExecuteShareEvent().subscribe(() => {
      this.getCountInvenorys();
    })
    if (this.btnBuscar) {
      this.getCountInvenorys();
      this.getWareHouses();
    }
    this.createForm();
    this.showLoader = false;
  }
  //Funcion para traer los permisos y asignarol a las variables respectivas
  GetPermisos() {
    if (this.activatedRoute.snapshot.queryParams["special"] !== null && this.activatedRoute.snapshot.queryParams["special"]) {
      this.Permisos = JSON.parse(atob(this.activatedRoute.snapshot.queryParams["special"]));
      if (this.Permisos !== undefined && this.Permisos !== null) {
        this.btnCrear = this.Permisos.find(i => i.description == "CREAR").isChecked;
        // this.btnEliminar = this.Permisos.find(i => i.description == "ELIMINAR").isChecked;
        this.btnActualizar = this.Permisos.find(i => i.description == "ACTULIZAR").isChecked;
        this.btnAbrir = this.Permisos.find(i => i.description == "ABRIR").isChecked;
        this.btnBuscar = this.Permisos.find(i => i.description == "BUSCAR").isChecked;
        this.btnIniciar = this.Permisos.find(i => i.description == "INICIAR").isChecked;
        this.Admin = this.Permisos.find(i => i.description == "ADMIN").isChecked;
      }
    }
  }
  //Crear Formulario que sirve para filtrar el listado de conteos
  createForm() {
    this.formList = new FormGroup({
      warehouseId: new FormControl(0),
      state: new FormControl(null),
    });
  }
  //Funcion que obtiene los valores de controles del formulario formList para filtrar la lista de conteos
  OnSubmit() {
    this.filterCountInventory = {
      countInventory: { wareHouseId: this.formList.value.warehouseId, state: this.formList.value.state, }
    };
    this.countInventoryService.GetAll(this.filterCountInventory).subscribe(data => {
      if (data.result === Result.Success) {
        this.listCountInventory = data.listCountInventory
      }
    })
  }
  //Funcion que obtiene la lista de conteos 
  getCountInvenorys() {
    this.filterCountInventory = { countInventory: null };
    this.countInventoryService.GetAll(this.filterCountInventory).subscribe(data => {
      if (data.result === Result.Success) {
        this.listCountInventory = data.listCountInventory
      }
    })
  }
  //Funcion que obtiene la lista de Almacenes
  getWareHouses() {
    this.filterWareHouse = { warehouse: {} }
    this.wareHouseService.GetAll(this.filterWareHouse).subscribe(data => {
      if (data.result === Result.Success) {
        this.listWehehouse = data.listWarehouse
      }
    })
  }
  //Funcion que servira para eliminar los conteos
  DeleteCount(item) {
    this.alertService.confirm('', "¿Esta seguro que desea eliminar a " + item.wareHouse + "?").subscribe((res) => {
      if (res) {
        //PENDIENTE
      } else {
        this.countInventoryService.ExecuteShareEvent();
      }
    });
  }
  //Funcion que redirecciona al componente encargado de realizar el conteo
  InitCount(item) {
    if (item.state === true) {
      this.router.navigate(['Administrativa/CountInvantory', item.id, false]);
    } else {
      this.toastr.info('El conteo no esta habilitado');
    }
  }
  //Funcion que redirecciona al componente encargado de ver el detalle de los conteos
  InfoCount(item) {
    this.router.navigate(['Administrativa/CountInvantory', item.id, true]);
  }
  //Funcion que abrir componente de crear conteos
  open(content) {
    this.openModal(content);
  }
  //Funcion para abrir componente de modificar conteos
  openEdit(content, itemPerfiles) {
    this.itemSelected = [itemPerfiles,this.Admin];
    this.openModal(content,);
  }
  //Funcion que abre una modal con el componente encargado de crear/editar los conteos
  openModal(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //Funcion que se encarga de cerrar la modal
  private getDismissReason(reason: any): string {
    this.itemSelected = null;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
