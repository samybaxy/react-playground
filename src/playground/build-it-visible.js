//JSX - Javascript XML
let visibility = false;
const toggle = (e) => {
  visibility = !visibility;
  render();
};

const appRoot = document.getElementById('app');
const render = () => {
	const jsx = (
		<div>
			<h1>Visibility Toggle</h1>
      <button onClick={toggle}>
        {visibility ? 'Hide details' : 'Show details'}
      </button>
      {visibility && (
        <p>Hey. These are some details you can see</p>
      )}
		</div>
	)
	ReactDOM.render(jsx, appRoot);
}

render();