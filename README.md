# Technical challenge

This technical challenge has been designed in line with some of the work we do, so we can see how you structure an application and implement certain functionality. There is no right or wrong way to do this challenge. We are interested in the code you write, the implementation details of your application and the development process you use rather than marking your work!

If you don't enjoy building full stack applications in JavaScript/Typescript and building various visualisations for data sets, you won't enjoy the work we do. This challenge should be fun!

## How to take this test

Set yourself a time limit and try to stick to it. We know these challenges take valuable time and effort, so we don't expect perfection. If you reach your time limit but haven't finished all of the tasks that form the challenge, try to document what you would add if you had more time.

## Data

The project contains a data set describing the location and metadata of boat ramps in Australia's Gold Coast. The data set can be found under `./data/boat_ramps.geojson`.

It is a standard [GeoJSON](http://geojson.org/) file, with each feature consisting of a `geometry` and `properties`, such as owner, material that the ramp is made of, etc.

## The challenge

Your goal is to build a React and Redux-based UI to explore this data. The interface should have the following features:

1. A map to be able to visualise all the boat ramps.
2. A data visualisation (e.g. a bar chart) of your choice that displays the number or ramps per construction material.
3. A data visualisation of your choice that displays the number of ramps per size category (values of `area` in 3 different ranges: `[0, 50)`, `[50, 200)`, and `[200, 526)`).
4. Zooming in the map should filter the visualised data to include only those ramps which are currently visible in the viewport.
5. Clicking on a data point on a visualisation should filter the ramps on the map to reflect the selected data.

## Bonus points

Things that aren't necessary but would impress us:

1. Challenge built in TypeScript
2. Functional React components using hooks

## Technology choices

The use of React and Redux is required. You can choose to use [create-react-app](https://github.com/facebook/create-react-app) with or without TypeScript. If you prefer you can even bootstrap something on your own with webpack, or any other bundler for that matter.

Apart from that, you are completely free to choose libraries, frameworks and tools to best assist you in this challenge. The choice of the method of serving the data to the UI is up to you, but it should use a RESTful API approach.

## Once complete

When you've finished writing your code, please put it somewhere we can clone it, for example, as a public repo in GitHub (or a private one and add us as a collabrator) and any instructions needed to run it.

### Good luck!
# boat-ramps-maps
