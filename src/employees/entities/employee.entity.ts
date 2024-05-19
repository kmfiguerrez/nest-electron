export class EmployeeEntity {

  

  constructor(partial: Partial<EmployeeEntity>) {
    Object.assign(this, partial);
  } 
}



