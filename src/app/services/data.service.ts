import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { delay, map, take } from "rxjs/operators";
import {
  Assignment,
  AssignmentRequest,
  AssignmentResponse
} from "../models/assignment.model";
import { Camera } from "../models/camera.model";
import { DataServiceOptions } from "../models/data-service-options.model";
import { Vehicle } from "../models/vehicle.model";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private mockGetEndpointMap = new Map<string, Function>([
    [
      "vehicles",
      () => {
        let vehicles: Vehicle[] = [];
        this.vehicles.forEach((v, k) => {
          let vehicle: Vehicle = JSON.parse(JSON.stringify(v));
          vehicle.id = k;
          vehicles.push(vehicle);
        });
        return vehicles;
      }
    ],
    [
      "vehicles/:id",
      (params: any): Vehicle => {
        let vehicle: Vehicle = null;
        vehicle = JSON.parse(JSON.stringify(this.vehicles.get(params.id)));
        vehicle.id = params.id;
        return vehicle;
      }
    ],
    [
      "cameras",
      () => {
        let cameras: Camera[] = [];
        this.cameras.forEach((v, k) => {
          let camera: Camera = JSON.parse(JSON.stringify(v));
          camera.id = k;
          cameras.push(camera);
        });
        return cameras;
      }
    ],
    [
      "cameras/:id",
      (params: any) => {
        let camera = null;
        camera = JSON.parse(JSON.stringify(this.cameras.get(params.id)));
        camera.id = params.id;
        return camera;
      }
    ],
    [
      "assignments",
      () => {
        let assignments: AssignmentResponse[] = [];
        this.assignments.forEach((v, k) => {
          if (!v.deleted) {
            let assignment: AssignmentResponse = JSON.parse(JSON.stringify(v));
            assignment.id = k;
            assignments.push(assignment);
          }
        });
        return assignments;
      }
    ]
  ]);

  private mockPostEndpointMap = new Map<string, Function>([
    [
      "vehicles/:id",
      (params: any, data: any) => {
        let vehicle: object = null;
        vehicle = this.vehicles.set(params.id, {
          name: data.name
        });
        return {};
      }
    ],
    [
      "cameras/:id",
      (params: any, data: any) => {
        let camera: object = null;
        camera = this.cameras.set(params.id, { deviceNo: data.name });
        return {};
      }
    ],
    [
      "assignments",
      (params: any, data: AssignmentRequest) => {
        let key = this.getLastKeyInMap(this.assignments);
        let cid = this.getUndeletedByValue(
          this.assignments,
          "cameraId",
          data.cameraId
        );
        let vid = this.getUndeletedByValue(
          this.assignments,
          "vehicleId",
          data.vehicleId
        );
        if (cid != null) {
          this.assignments.set(cid[0], { ...cid[1], ...{ deleted: true } });
        }
        if (vid != null) {
          this.assignments.set(vid[0], { ...vid[1], ...{ deleted: true } });
        }
        this.assignments.set(key + 1, {
          ...data,
          deleted: false,
          dateCreated: new Date()
        });
        return {};
      }
    ]
  ]);

  private cameras = new Map<number, Camera>([
    [0, { deviceNo: "Camera 1" }],
    [1, { deviceNo: "Camera 2" }]
  ]);

  private vehicles = new Map<number, Vehicle>([
    [0, { name: "Dump Truck 1" }],
    [1, { name: "Dump Truck 2" }]
  ]);

  private assignments = new Map<number, Assignment>([
    [0, { cameraId: 0, vehicleId: 0, dateCreated: new Date(), deleted: false }]
  ]);

  private getUndeletedByValue = <A, B>(
    m: Map<A, B>,
    searchValueName,
    searchValue: any
  ): [A, B] | undefined => {
    const l: IterableIterator<[A, B]> = m.entries();
    const a: [A, B][] = Array.from(l);
    return a.find(
      ([_k, v]) => v[searchValueName] === searchValue && v["deleted"] === false
    );
  };

  private getLastKeyInMap = map => [...map][map.size - 1][0];

  private randomDelay() {
    return Math.random() * 4000;
  }
  constructor() {}

  public get<T>(url: string, params?: any): Observable<T> {
    const options = new DataServiceOptions();
    options.method = "GET";
    options.url = url;
    options.params = params;

    return this.request(options).pipe(map(r => r.body as T));
  }

  public post<T>(url: string, params?: any, data?: any): Observable<T> {
    const options = new DataServiceOptions();
    options.method = "POST";
    options.url = url;
    options.params = params;
    options.data = data;
    return this.request(options).pipe(map(r => r.body as T));
  }

  private request(
    options: DataServiceOptions
  ): Observable<Response | HttpResponse<Object>> {
    let body = null,
      status = 404,
      statusText = "Not Found";
    try {
      if (options.method === "GET") {
        body = this.mockGetEndpointMap.get(options.url)(options.params);
        status = 200;
        statusText = "OK";
      } else if (options.method === "POST") {
        body = this.mockPostEndpointMap.get(options.url)(
          options.params,
          options.data
        );
        status = 200;
        statusText = "OK";
      } else {
        statusText = "No endpoint can be found for that request type.";
      }
    } catch (ex) {
      body = { message: "BAD REQUEST" };
      status = 400;
    }
    JSON.parse(JSON.stringify(body));
    return new BehaviorSubject(
      new HttpResponse({
        body: body,
        headers: new HttpHeaders(null),
        url: options.url,
        status: status,
        statusText: statusText
      })
    ).pipe(take(1));
  }
}
