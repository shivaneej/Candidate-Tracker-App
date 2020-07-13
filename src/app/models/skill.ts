export class Skill {
    id : number;
    name : string;

    constructor(id : number, name : string) {
        this.id = id;
        this.name = name;
    }

    mapFields() {
        return {
            skillId : this.id,
            skillName : this.name
        };
    }
}