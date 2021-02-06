import { Component, VERSION } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AssignmentRequest, AssignmentResponse } from "./models/assignment.model";
import { Camera } from "./models/camera.model";
import { Vehicle } from "./models/vehicle.model";
import { DataService } from "./services/data.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  constructor(private data: DataService) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.data.get<Vehicle[]>("vehicles");
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.data.get<Vehicle>("vehicles/:id", { id: id });
  }

  getCameras(): Observable<Camera[]> {
    return this.data.get<Camera[]>("cameras");
  }

  getCameraById(id: number): Observable<Camera> {
    return this.data.get<Camera>("cameras/:id", { id: id });
  }

  getAssignments() {
    return this.data.get<AssignmentResponse>("assignments");
  }

  addVehicle() {
    this.data.post("vehicles/:id", { id: 3 }, { name: "car", cameraId: 1 });
  }
  
  addCamera() {
    this.data.post(
      "cameras/:id",
      { id: 1 },
      { name: "camera 3", vehicleId: 0 }
    )
  }

  assign() {
    this.data.post("assignments", {}, {cameraId: 0, vehicleId: 1}).pipe(tap(r=>console.log(r))).subscribe();
  }
}
