import { Role } from '../models/role';

export function getRoleParent(allRoles : Role[], role : Role) : Role {
    var ancestors = allRoles.filter(r => {
      return  r.hierarchy < role.hierarchy
    });
    return ancestors.reduce((prev, current) => {
      return (prev.hierarchy > current.hierarchy) ? prev : current
    });
}