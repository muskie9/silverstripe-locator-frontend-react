import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { openMarker } from 'actions/mapActions';
import Location from 'components/map/Location';
import MapContainer from 'components/map/MapContainer';

/**
 * The MapArea component.
 * Renders the MapContainer and location list.
 */
class MapArea extends React.Component {
  /**
   * Used to create the Map.
   * needed to allow use of this keyword in handler.
   * @param props
   */
  constructor(props) {
    super(props);
    this.handleLocationClick = this.handleLocationClick.bind(this);
  }

  handleLocationClick(target) {
    this.props.dispatch(openMarker(target));
  }

  /**
   * Renders the locations
   * @returns {*}
   */
  renderLocations() {
    const { current, search, unit, template } = this.props;
    const locs = this.props.locations.edges;
    if (locs !== undefined) {
      return locs.map((location, index) =>
        (
          <Location
            key={location.node.ID}
            index={index}
            location={location.node}
            current={current}
            search={search}
            unit={unit}
            onClick={this.handleLocationClick}
            template={template}
          />
        ),
      );
    }
    return null;
  }

  /**
   * Renders the component
   * @returns {XML}
   */
  render() {
    return (
      <div className="map-area">
        <MapContainer locations={this.props.locations} />
        <div className="loc-list">
          <ul>
            {this.renderLocations()}
          </ul>
        </div>
      </div>
    );
  }
}

/**
 * Defines the prop types
 * @type {{locations: *}}
 */
MapArea.propTypes = {
  locations: PropTypes.shape({
    edges: PropTypes.array,
  }),
  current: PropTypes.string,
  search: PropTypes.string,
  unit: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

/**
 * Defines the default values of the props
 * @type {{locations: {edges: Array}}}
 */
MapArea.defaultProps = {
  locations: {
    edges: [],
  },
  current: '-1',
  search: '',
};

/**
 * Maps that state to props
 * @param state
 * @returns {{current}}
 */
function mapStateToProps(state) {
  return {
    current: state.map.current,
    search: state.search.address,
    unit: state.settings.unit,
    template: state.settings.listTemplate,
  };
}


/**
 * export the Map Component
 */
export default connect(mapStateToProps)(MapArea);
