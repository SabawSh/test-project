export interface UserInterface {
    address: UserAddressInterface;
    company: UserCompanyInterface;
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
} 


export interface UserAddressInterface {
    city: string;
    geo: {lat: number, lng: number};
    street:  string;
    suite:  string;
    zipcode:  string;
}
export interface UserCompanyInterface { 
    bs: string;
    catchPhrase: string;
    name: string;
}