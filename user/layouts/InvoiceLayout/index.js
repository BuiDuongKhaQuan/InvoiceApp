import { html1 } from './Invoice_1';
import { html2 } from './Invoice_2';
import { html3 } from './Invoice_3';
import { html4 } from './Invoice_4';
import { html5 } from './Invoice_5';
import { html6 } from './Invoice_6';
import { html7 } from './Invoice_7';
import { html8 } from './Invoice_8';
import { html9 } from './Invoice_9';
import { html10 } from './Invoice_10';
import { html11 } from './Invoice_11';

export const layoutInvoice = (t, idLayout, invoice, listProduct, company, customer, staff) => {
    if (idLayout == 1) return html1(t, invoice, listProduct, company, customer, staff);
    if (idLayout == 2) return html2(t, invoice, listProduct, company, customer, staff);
    if (idLayout == 3) return html3(t, invoice, listProduct, company, customer, staff);
    if (idLayout == 4) return html4(t, invoice, listProduct, company, customer, staff);
    if (idLayout == 5) return html5(t, invoice, listProduct, company, customer, staff);
    if (idLayout == 6) return html6(t, invoice, listProduct, company, customer, staff);
    if (idLayout == 7) return html7(t, invoice, listProduct, company, customer, staff);
    if (idLayout == 8) return html8(t, invoice, listProduct, company, customer, staff);
    if (idLayout == 9) return html9(t, invoice, listProduct, company, customer, staff);
    if (idLayout == 10) return html10(t, invoice, listProduct, company, customer, staff);
    if (idLayout == 11) return html11(t, invoice, listProduct, company, customer, staff);

    // if (idLayout === 12) return html12(t, invoice, listProduct, company, customer);
    // if (idLayout === 13) return html13(t, invoice, listProduct, company, customer);
};
