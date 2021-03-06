var EventApplication = React.createClass({
  getInitialState: function () {
    return {
      events: [],
      sort: "name",
      order: "desc"
    };
  },

  componentDidMount: function () {
    this.getDataFromApi();
  },

  handleSearch: function(events) {
    this.setState({ events: events });
  },

  handleAdd: function (event) {
    var events = this.state.events;
    events.push(event);
    this.setState({ events: events });
  },

  handleDeleteRecord: function (event) {
    var events = this.state.events.slice();
    var index = events.indexOf(event);
    events.splice(index, 1);
    this.setState({ events: events })
  },

  handleUpdateRecord: function (old_event, event) {
    var events = this.state.events.slice();
    var index = events.indexOf(old_event);
    events.splice(index, 1, event);
    this.setState({ events: events });
  },

  handleSortColumn: function (name, order) {

    if (this.state.sort != name ) {
      order = 'desc';
    }
    $.ajax({
      url: '/api/events',
      data: { sort_by: name, order: order },
      method: 'GET',

      success: function (data) {
        this.setState({ events: data, sort: name, order: order });
      }.bind(this),

      error: function (xhr, status, error) {
        alert('Cannot sort events: ', error);
      }
    });
  },

  getDataFromApi: function () {
    var self = this;

    $.ajax({
      url: '/api/events',
      success: function (data) {
        self.setState({ events: data })
      },
      error: function (xhr, status, error) {
        alert('Cannot receive data from Api: ', error);
      }
    });
  },

  render: function () {
    return(
      <div className="container">
        <div className="jumbotron">
          <h1>ReactJs Sample app</h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <SearchForm handleSearch={ this.handleSearch } />
          </div>
          <div className="col-md-8">
            <NewEventForm handleAdd={ this.handleAdd } />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable events={ this.state.events }
                        sort={ this.state.sort }
                        order={ this.state.order }
                        handleDeleteRecord={ this.handleDeleteRecord }
                        handleUpdateRecord={ this.handleUpdateRecord }
                        handleSortColumn={ this.handleSortColumn } />
          </div>
        </div>
      </div>
    )
  }
});