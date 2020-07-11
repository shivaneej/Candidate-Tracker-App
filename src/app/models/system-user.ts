export class SystemUser {
    id : number;
    name: string;
    email: string;
    role: string;
    contact: number;
    isActive : number;

    constructor(id, name, email, role, contact, isActive) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.contact = contact;
        this.isActive = isActive;
    }
}