export class AccountController {
  private selectedAddresses: Array<string>;

  constructor() {
    this.selectedAddresses = [];
  }

  addNewAddress(address: string) {
    this.selectedAddresses.push(address);
  }

  setSelectedAddresses(addresses: Array<string>) {
    this.selectedAddresses = addresses;
  }

  getSelectedAddresses() {
    return this.selectedAddresses;
  }
}
