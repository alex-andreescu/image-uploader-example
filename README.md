# Image Uploader Example

*All commands are for Terminal on Mac*

## Frontend

To run the frontend expo application, please make sure expo-cli is installed with `npm install -g expo-cli`

Steps to run the frontend app:
1. Change directory to frontend - `cd frontend`
2. Run `npm install` to install any missing packages
3. Run `npm start` to spin up the expo app

There are a few comments in the project to indicate various debug locations as well and minor comments to explain some functionality

## Backend

To run the backend express/nodejs application, follow these steps (preferably open a second Terminal tab to run this):
1. Change directory to backend - `cd backend`
2. Run `npm install` to install any missing packages
3. Run `npm start` to spin up the localhost on port 3000

## Things to add in the future

Due to me not having used Typescript prior, decided against adding it in since learning it within a timed setting seemed out of scope

Unit tests added with Jest: would mainly add it snapshots for the components and UI while adding in tests simulating the press of the various buttons to test that the image functions fire correctly

Update redux to maintain a few of the most rececntly selected images so if an image upload fails it can easily be reselected without opening up camera roll

NOTE: Didn't implement a list for the image display since I only added in the ability to select one image at a time, but adding a list would consist of rendering the images in a `FlatList` or `VirtualizedList` and moving the `image` component render to a `renderItem` prop