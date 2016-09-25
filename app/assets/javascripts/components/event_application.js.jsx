var EventApplication = React.createClass({
  getInitialState: function () {
    return { events: [] };
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
            <EventTable events={ this.state.events } />
          </div>
        </div>
      </div>
    )
  }
});