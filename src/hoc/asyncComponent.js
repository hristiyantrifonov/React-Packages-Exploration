import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component{
        state = {
            component: null
        }

       // We will load the actual component we want to use and store
       // it in the component variable
        componentDidMount() {
            importComponent()
                .then(comp => {
                    this.setState({component: comp.default});
                });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;