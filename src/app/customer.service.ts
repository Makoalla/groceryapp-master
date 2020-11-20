import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class CustomerService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data 
    getCustomers() {
        return this.http.get('http://localhost:8000/customers');
    }
    // Uses http.post() to post data 
    addCustomers(firstName: string, lastName: string, cardType: string, cardNumber: string, exp: string, cvc: string) {
        this.http.post('http://localhost:8000/customers',{ firstName, lastName, cardType, cardNumber, exp, cvc})
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
        location.reload();
    }

    deleteCustomer(customerId: string) {
        this.http.delete("http://localhost:8000/customers/" + customerId)
          .subscribe(() => {
              console.log('Deleted: ' + customerId);
          });
          location.reload();
        }

    updateCustomer(customerId: string, firstName: string, lastName: string, cardType: string, cardNumber: string, exp: string, cvc: string) {
        //request path http://localhost:8000/students/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
            this.http.put("http://localhost:8000/customers/" 
                    + customerId,{ firstName, lastName, cardType, cardNumber, exp, cvc })
                .subscribe(() => {
                    console.log('Updated: ' + customerId);
                });
        }
        
    
}
