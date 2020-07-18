import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private service: EmployeeService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>
  ) { }

  ngOnInit() {
    this.service.getEmployee();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if (!this.service.form.get('$key').value){
        this.service.insertEmployee(this.service.form.value);
      }
      else {
        this.service.updateEmployee(this.service.form.value);
      }
      
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
