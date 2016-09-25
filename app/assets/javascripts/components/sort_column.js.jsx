var SortColumn = React.createClass({
  handleSort: function (e) {
    e.preventDefault();
    var order = this.props.order == 'desc' ? 'asc' : 'desc';
    this.props.handleSortColumn(this.props.name, order);
  },

  render: function () {
    var active = this.props.sort == this.props.name;
    var display_name = active ? <u>{ this.props.text }</u> : this.props.text;
    var direction;

    if (active) {
      direction = this.props.order == "asc" ? <i className="fa fa-sort-asc" aria-hidden="true"></i> : <i className="fa fa-sort-desc" aria-hidden="true"></i>
    }

    return(
      <span onClick={ this.handleSort }>
        { display_name }
        { direction }
      </span>
    );
  }
});