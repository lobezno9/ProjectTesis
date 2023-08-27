import { BaseIn } from "../../general/BaseIn";
import { CountInventory } from "../../models/CountInventory";
import { CountInventoryDetail } from "../../models/CountInventoryDetai";

export class UpdateCountInventoryIn extends BaseIn {
    countInventory: CountInventory;
    listCountInventoryDetail?: CountInventoryDetail[]
}