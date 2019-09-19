class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: ['Thing One', 'Thing Two', 'Thing Four']
    }
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options)
        this.setState(() => ({ options }));
    }
    catch(e) {
      //Do nothing at all
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount() {

  }

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }))
  }

  handleAction() {
    const options = this.state.options;
    const randomNum = Math.floor(Math.random() * options.length);
    alert(options[randomNum]);
  }

  handleAddOption(option) {
    this.setState((prevState) => ({
      options: prevState.options.concat(option)})
    );
  }

  handleRemoveAll () {
    this.setState(() => ({ options: [] }));
  }

  render() {
    const title = 'Indecision';
    const subtitle = 'Put your data in the hands of a computer.';

    return (
      <div>
        <Header title={title} sub={subtitle} />
        <Action 
          hasOptions = {this.state.options.length > 0}
          handleAction={this.handleAction} 
        />
        <Options 
          options={this.state.options}
          handleRemoveAll = {this.handleRemoveAll}
          handleDeleteOption = {this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    )
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.sub}</h2>
    </div>
  )
};

const Action = (props) => {
  return (
    <div>
      <button 
        onClick={props.handleAction}
        disabled={!props.hasOptions}
      >What should I do?</button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleRemoveAll}>Remove All</button>
      {props.options.map(option => {
        return (
          <Option 
            key={option} 
            optionText={option} 
            handleDeleteOption = {props.handleDeleteOption}
          />
        )
      })}
    </div>
  )
};

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button 
        onClick={(e) => {
          props.handleDeleteOption(props.optionText);
        }}
      >
      Remove
      </button>    
    </div>
  )
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));
    if (!error) e.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" /><button>Add Option</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));