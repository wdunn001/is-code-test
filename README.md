# is-code-test

[StackBlitz ⚡️](https://stackblitz.com/edit/is-code-test)

## Software Requirements Specification

### Purpose

This exercice is intended to assess your Angular skills.

You will build a customer-facing on-board camera management page to enable assignments of the cameras to specific vehicles. 

### Project Scope

The on-board camera management page will be used by users to easily manage current assignments and create new assignments that pair individual cameras with vehicles. This page should list all current assignments and allow users to search, edit or remove them. Also provide users with an intuitive way of creating new Camera-Vehicle pairs (assignments). 

### Product Details

The Camera Manager page will work with three entities: 

- **Cameras** - Entity representing an individual on-board camera device, with the following properties: 
  - `id` – int – Uniquely identifies a Camera entity 
  - `deviceNo` – string – Manufacturer-assigned unique identifier. 

- **Vehicles** – Entity representing an individual vehicle stored in a database with the following properties: 
  - `id` – int – Uniquely identifies a Vehicle entity 
  - `name` – string – User-assignable friendly name of the vehicle 

- **Assignment** – A record in the database that represents an instance of an on-board camera pairing with a vehicle. There can only be one active CameraAssignment per vehicle and per camera. This entity must have the following properties: 
  - `id` – int – Uniquely identifies the assignment record 
  - `cameraId` – int – Id of the assigned camera entity 
  - `vehicleId` – int – Id of the assigned vehicle entity 
  - `dateCreated` – DateTime – date and time of the assignment creation 
  - `deleted` – bool – Flag indicating if the assignment is active or deleted. 

Users must be able to review currently active assignments, search them either by camera's `deviceNo` or vehicle's `name` properties. The page should allow users to delete individual existing assignments and create new ones. During creation of a new assignment, the page should check if the selected camera or vehicle have existing assignments and prompt the user accordingly. The page should not allow creation of an assignment for a camera or a vehicle that have an active assignment. In other words, there is only one camera assignment per vehicle, and reassignments must occur by first deleting an assignment, and then assigning the camera to the new vehicle. 


