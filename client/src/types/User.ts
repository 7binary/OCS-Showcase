export interface User {
  id: number;
  status: string;
  statusEn: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  birthday: string;
  isEmailActivated: boolean;
  address: string | null;
  addressExtended: string | null;
  rfc: string | null;
  marriage: string | null;
  crops: number[];
  dealers: number[];
}
