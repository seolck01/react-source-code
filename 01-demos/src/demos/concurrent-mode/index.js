// import React, { ConcurrentMode } from 'react'
import * as React from "react";
import { flushSync } from "react-dom";

import "./index.css";
const { unstable_ConcurrentMode: ConcurrentMode } = React;
// const {unstable_ConcurrentMode} = React
class Parent extends React.Component {
  state = {
    async: true,
    num: 1,
    length: 2000,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.updateNum();
    }, 200);
  }

  componentWillUnmount() {
    // 别忘了清除interval
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  updateNum() {
    const newNum = this.state.num === 3 ? 0 : this.state.num + 1;
    if (this.state.async) {
      this.setState({
        num: newNum,
      });
    } else {
      flushSync(() => {
        this.setState({
          num: newNum,
        });
      });
    }
  }

  render() {
    const children = [];

    const { length, num, async } = this.state;

    for (let i = 0; i < length; i++) {
      children.push(
        <div className="item" key={i}>
          {num}
        </div>
      );
    }

    return (
      <div className="main">
        async:{" "}
        <input
          type="checkbox"
          checked={async}
          onChange={() => flushSync(() => this.setState({ async: !async }))}
        />
        <div className="wrapper">{children}</div>
      </div>
    );
  }
}

// class Child extends React.Component {
//   state = {
//     num: 1
//   }

//   render () {
//     return (
//       <div>

//       </div>
//     )
//   }
// }

export default () => (
  <ConcurrentMode>
    <Parent />
  </ConcurrentMode>
);
