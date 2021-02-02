# is-code-test

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/is-code-test)

#Software Requirements Specification

##Purpose

The purpose of this document is to build a customer-facing on-board camera management page to allow assignments of the cameras to specific vehicles. 

##Project Scope

The on-board camera management page will be used by users to easily manage current assignments and create new assignments that pair individual cameras with vehicles. This page should list all current assignments and allow users to search, edit or remove them. Also provide users with an intuitive way of creating new Camera-Vehicle pairs (assignments). 

##Product Perspective

The Camera Manager page will work with three entities: 

- Camera - Entity representing an individual on-board camera device, stored in a database with the following properties: 
  - Id – int – Uniquely identifies a Camera entity 
  - DeviceNo – string – Manufacturer-assigned unique identifier. 

- Vehicle – Entity representing an individual vehicle stored in a database with the following properties: 
  - Id – int – Uniquely identifies a Vehicle entity 
  - Name – string – User-assignable friendly name of the vehicle 

- Assignment – A record in the database that represents an instance of an on-board camera pairing with a vehicle. There can only be one active CameraAssignment per vehicle and per camera. This entity must have the following properties: 
  - Id – int – Uniquely identifies the assignment record 
  - CameraId – int – Id of the assigned camera entity 
  - VehicleId – int – Id of the assigned vehicle entity 
  - DateCreated – DateTime – date and time of the assignment creation 
  - Deleted – bool – Flag indicating if the assignment is active or deleted. 

Users must be able to review currently active assignments, search them either by camera’s DeviceNo or vehicle’s Name properties. The page should then allow users to delete individual existing assignments and create new ones. During creation of a new assignment, the page should check if the selected camera or vehicle have existing assignments and prompt the user accordingly. The page should not allow creation of an assignment for a camera or a vehicle that have active assignments. 


