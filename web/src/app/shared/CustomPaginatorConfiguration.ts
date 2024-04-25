// ==========================================================>> Third Party Library
import { MatPaginatorIntl } from "@angular/material/paginator";

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();
  customPaginatorIntl.itemsPerPageLabel = ''; //coutom items per page here
  return customPaginatorIntl;
}