# SpotFinda
A web app in which users can upload and rate popular study spots on campus.

# TODO:
- [x] show all existing spots on the map
- [ ] click on a particular spot and view a description and other info about the spot
- [ ] form for submitting spot
    dropdowns for name, type, description
- [ ] form for reporting how busy the spot user is located at (user must be within 500ft of the spot)
- [ ] filter spots based on type, business, distance(?)


## The basics
- Will have a map with pinpoints describing where popular spots are. 
- Can click on the pinpoints to view more detail about the spot. 
- Also will be an add button so users can upload spots. 

## Advanced
- Users can update in real time how busy the spots are
- A filter for what type of stop you are currently viewing on the map, Study spot, statue, viewpoint etc
- A way to avoid getting doxxed or like people just spamming random spots. 


## Technologies:
- Front-end: React
- Back-end: Node.js
- Database: MongoDB

## Design the Database:
```
_id (ObjectID)
name (String)
type (String - Study spot, Statue, Viewpoint, etc.)
location (GeoJSON Point - longitude, latitude)
description (String)
busyIndex(int 1-5)
```

## API Endpoints:

### Spot Operations:

- GET /api/spots: Get a list of all spots within 1 mile radius.
- GET /api/spots/spotId: Get details of a specific spot.
- POST /api/spots: Add a new spot 

### Other:

- PUT /api/spots/:spotId: Update details of a specific spot 
- DELETE /api/spots/:spotId: Delete a spot (requires authentication and ownership).
- Spot Reviews:
- GET /api/spots/:spotId/reviews: Get reviews for a specific spot.
- POST /api/spots/:spotId/reviews: Add a review for a spot (requires authentication).
- PUT /api/spots/:spotId/reviews/:reviewId: Update a review (requires authentication and ownership).
- DELETE /api/spots/:spotId/reviews/:reviewId: Delete a review (requires authentication and ownership).
- GET /api/spots?type=study_spot: Filter spots based on type.


## Frontend:
- Map UI
- Submitting a form for a new spot
- Clicking and getting details on a specific spot
