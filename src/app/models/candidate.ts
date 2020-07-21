import { Skill } from './skill';

export class Candidate {
    id : number;
    name: string;
    email: string;
    status: string;
    preferredLoc : string;
    address : string;
    ectc : number;
    ctct : number;
    contact : number;
    round : number;
    skills : Array<Skill>;

    constructor(id : number, name: string, email: string, status: string, preferredLoc : string, address : string, 
        ectc : number, ctct : number, contact : number, round : number, skills : any) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.status = status.charAt(0).toUpperCase() + status.slice(1);
        this.preferredLoc = preferredLoc;
        this.address = address;
        this.ectc = ectc;
        this.ctct = ctct;
        this.contact = contact;
        this.round = round ;
        this.skills = skills.map(skill => new Skill(skill.skillId, skill.skillName));
    }
};