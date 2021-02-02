export class AssignmentRequest {
  cameraId?: number; // – int – Id of the assigned camera entity
  vehicleId?: number; // – int – Id of the assigned vehicle entity
}

export class Assignment extends AssignmentRequest {
  dateCreated?: Date; // – DateTime – date and time of the assignment creation
  deleted: boolean; // – bool – Flag indicating if the assignment is active or deleted.
}
export class AssignmentResponse extends Assignment {
  id: number;
}
