# writer Reloaded

## Docker Guidelines

### To Run the writer React Dashboard with Docker:

- yarn && yarn build:iso-cra

- docker build -t writer/dashboard -f ./packages/writer/Dockerfile .
- docker run -it -p 8080:80 writer/dashboard
- Open http://localhost:8080/

### To Run the writer Next Dashboard with Docker:

- docker build -t writer/dashboard-next -f ./packages/writer-next/Dockerfile .
- docker run -it -p 3000:3000 writer/dashboard-next
- Open http://localhost:3000/

## Hotel Post Grid Data: JSON Format

```
  {
    "id": INTEGER,
    "agentId": INTEGER,
    "title": "",
    "slug": "",
    "content": "",
    "status": "",
    "price": "",
    "isNegotiable": BOOLEAN,
    "propertyType": "",
    "condition": "",
    "rating": FLOAT,
    "ratingCount": INTEGER,
    "contactNumber": "",
    "termsAndCondition": "",
    "amenities": [
      {
        "id": INTEGER,
        "guestRoom": INTEGER
      },
      {
        "id": INTEGER,
        "bedRoom": INTEGER
      },
      {
        "id": INTEGER,
        "wifiAvailability": BOOLEAN
      },
      {
        "id": INTEGER,
        "parkingAvailability": BOOLEAN
      },
      {
        "id": INTEGER,
        "poolAvailability": BOOLEAN
      },
      {
        "id": INTEGER,
        "airCondition": BOOLEAN
      },
      {
        "id": INTEGER,
        "extraBedFacility": BOOLEAN
      }
    ],
    "image": {
      "id": INTEGER,
      "url": ""
    },
    "location": {
      "id": INTEGER,
      "lat": "",
      "lng": "",
      "formattedAddress": "",
      "zipcode": "",
      "city": "",
      "state_long": "",
      "state_short": "",
      "country_long": "",
      "country_short": ""
    },
    "gallery": [
      {
        "id": INTEGER,
        "url": ""
      },
      {
        "id": INTEGER,
        "url": ""
      },
      {
        "id": INTEGER,
        "url": ""
      }
    ],
    "categories": [
      {
        "id": INTEGER,
        "slug": "",
        "name": "",
        "image": {
          "id": INTEGER,
          "url": ""
        }
      },
      {
        "id": INTEGER,
        "slug": "",
        "name": "",
        "image": {
          "id": INTEGER,
          "url": ""
        }
      }
    ],
    "createdAt": "",
    "updatedAt": ""
  }
```

## Agent Data: JSON Format

```
  {
    "id": INTEGER,
    "first_name": "",
    "last_name": "",
    "username": "",
    "password": "",
    "email": "",
    "cell_number": "",
    "profile_pic": {
      "id": INTEGER,
      "url": ""
    },
    "cover_pic": {
      "id": INTEGER,
      "url": ""
    },
    "date_of_birth": "",
    "gender": "",
    "content": "",
    "agent_location": {
      "lat": "",
      "lng": "",
      "formattedAddress": "",
      "zipcode": "",
      "city": "",
      "state_long": "",
      "state_short": "",
      "country_long": "",
      "country_short": ""
    },
    "gallery": [
      {
        "id": INTEGER,
        "url": ""
      },
      {
        "id": INTEGER,
        "url": ""
      },
      {
        "id": INTEGER,
        "url": ""
      }
    ],
    "social_profile": {
      "facebook": "",
      "twitter": "",
      "linkedin": "",
      "instagram": ""
    },
    "listed_post": [],
    "favourite_post": [],
    "createdAt": "",
    "updatedAt": ""
  }

```
