import * as React from "react";
import PropTypes from "prop-types";

const MyContext = React.createContext();

const { Provider, Consumer } = MyContext;

class Parent extends React.Component {
  state = {
    childContext: "123",
    newContext: "456",
    aaa: "chaoqun",
  };

  getChildContext() {
    // 相当于在provider中声明注入
    return { value: this.state.childContext, a: "aaaaa", aaa: this.state.aaa };
  }

  render() {
    return (
      <>
        <div>
          <label>childContext:</label>
          <input
            type="text"
            value={this.state.childContext}
            onChange={(e) => this.setState({ childContext: e.target.value })}
          />
        </div>
        <div>
          <label>newContext:</label>
          <input
            type="text"
            value={this.state.newContext}
            onChange={(e) => this.setState({ newContext: e.target.value })}
          />
        </div>
        {this.props.children}
        {/* <Provider value={this.state.newContext}>{this.props.children}</Provider> */}
      </>
    );
  }
}

class Parent2 extends React.Component {
  // { value: this.state.childContext, a: 'bbbbb' }
  // getChildContext() {
  //   return { a: "bbbbb" };
  // }

  render() {
    return (
      <>
        {" "}
        <span>Parent2 Content : {this.context.a} </span> {this.props.children}
      </>
    );
  }
}

const Grandson = (props) => {
  return <>Grandson</>;
};

function Child1(props, context) {
  return <Consumer>{(value) => <p>Child1 newContext: {value}</p>}</Consumer>;
}

Child1.contextTypes = {
  value: PropTypes.string,
};

class Child2 extends React.Component {
  render() {
    return (
      <p>
        Child2 childContext: {this.context.value} {this.context.a}
        {this.props.children}
      </p>
    );
  }
}

// Child2.contextType = Consumer

Child2.contextTypes = {
  value: PropTypes.string,
  a: PropTypes.string,
};

Parent.childContextTypes = {
  value: PropTypes.string,
  a: PropTypes.string,
  aaa: PropTypes.string,
};

Parent2.contextTypes = {
  value: PropTypes.string,
  a: PropTypes.string,
};
// Parent2.childContextTypes = {
//   a: PropTypes.string,
// };

export default () => (
  <Parent>
    <Parent2>
      <Child1></Child1>
      <Child2>

        <Grandson></Grandson>
      </Child2>
    </Parent2>
  </Parent>
);
