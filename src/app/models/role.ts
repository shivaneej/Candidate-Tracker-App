export class Role {
    id : string;
    name: string;
    hierarchy : number;

    constructor(id, name, hierarchy) {
        this.id = id;
        this.name = name;
        this.hierarchy = hierarchy;
    }

    mapFields() {
        return {
            role : this.id,
            roleString : this.name,
            heirarchyLevel : this.hierarchy
        };
    }
};
