import { BaseOut } from "../../general/BaseOut";
import { CountInventoryDetail } from "../../models/CountInventoryDetai";

export class GetCountInventoryDetailOut extends BaseOut {
    listCountInventoryDetail: CountInventoryDetail[]
}