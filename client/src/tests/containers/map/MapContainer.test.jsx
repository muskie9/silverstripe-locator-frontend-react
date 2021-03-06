import React from 'react';
import { shallow } from 'enzyme';

import { MapContainer, mapStateToProps } from '../../../js/containers/map/MapContainer';
import PropTypes from "prop-types";

const dispatch = jest.fn();

/**
 * Tests if the MapContainer component renders
 */
test('Map container component should render', () => {
  const container = shallow(
    <MapContainer
      dispatch={dispatch}
      current={-1}
      showCurrent={false}
      clusters={false}
      clusterImages={[]}
      markerImagePath=""
      center={{
        Lat: 91,
        Lng: 181,
      }}
      defaultCenter={{
        lat: 0,
        lng: 0,
      }}
    />,
  );

  expect(container.length).toEqual(1);
});

/**
 * Tests if the MapContainer component has markers
 */
test('Map container component should have markers', () => {
  const container = shallow(
    <MapContainer
      dispatch={dispatch}
      current={-1}
      showCurrent={false}
      clusters={false}
      clusterImages={[]}
      markerImagePath=""
      locations={[
        {
          ID: 1,
          Lat: 45.5163147,
          Lng: 25.3684474,
        },
        {
          ID: 2,
          Lat: -33.955016,
          Lng: 18.424874,
        },
      ]}
      center={{
        Lat: 91,
        Lng: 181,
      }}
      defaultCenter={{
        lat: 0,
        lng: 0,
      }}
    />,
  );

  const markers = container.instance().getMarkers();
  expect(markers.length).toEqual(2);
  expect(markers[0].position).toEqual({
    lat: 45.5163147,
    lng: 25.3684474,
  });
});

/**
 * Tests if the MapContainer component handles marker clicks
 */
test('Map container component should handle marker clicks', () => {
  const container = shallow(
    <MapContainer
      dispatch={dispatch}
      current={-1}
      showCurrent={false}
      clusters={false}
      clusterImages={[]}
      markerImagePath=""
      center={{
        Lat: 91,
        Lng: 181,
      }}
      defaultCenter={{
        lat: 0,
        lng: 0,
      }}
    />,
  );

  dispatch.mockClear();
  expect(dispatch.mock.calls.length).toEqual(0);
  container.instance().handleMarkerClick(1);
  // because dispatch is called twice
  expect(dispatch.mock.calls.length).toEqual(2);
  dispatch.mockClear();
});

/**
 * Tests if the MapContainer component handles marker closings
 */
test('Map container component should handle marker closings', () => {
  const container = shallow(
    <MapContainer
      dispatch={dispatch}
      current={-1}
      showCurrent={false}
      clusters={false}
      clusterImages={[]}
      markerImagePath=""
      center={{
        Lat: 91,
        Lng: 181,
      }}
      defaultCenter={{
        lat: 0,
        lng: 0,
      }}
    />,
  );

  dispatch.mockClear();
  expect(dispatch.mock.calls.length).toEqual(0);
  container.instance().handleMarkerClose();
  expect(dispatch.mock.calls.length).toEqual(1);
  dispatch.mockClear();
});

/**
 * tests the map state to props method.
 * Only requires that an object is returned, doesn't matter what is in it.
 */
test('Map state to props', () => {
  const state = {
    locator: {
      search: {},
      map: {},
      settings: {},
      locations: {},
    },
  };
  // expects mapStateToProps to be an Object
  expect(mapStateToProps(state)).toEqual(expect.any(Object));
});
