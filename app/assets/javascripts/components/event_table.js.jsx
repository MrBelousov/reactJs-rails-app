var EventTable = React.createClass({
  handleDeleteRecord: function (event) {
    this.props.handleDeleteRecord(event);
  },

  handleUpdateRecord: function (old_event, event) {
    this.props.handleUpdateRecord(old_event, event);
  },

  render: function () {
    var events = [];

    this.props.events.forEach(function (event) {
      events.push(<Event event={ event }
                         key={ 'event' + event.id }
                         handleDeleteRecord={ this.handleDeleteRecord }
                         handleUpdateRecord={ this.handleUpdateRecord } />)
    }.bind(this));

      return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Place</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          { events }
        </tbody>
      </table>
    )
  }
});