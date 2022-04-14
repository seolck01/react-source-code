import * as React from 'react'

function ChildrenDemo(props) {
  console.log(props.children)
  console.log(React.Children.map(props.children, c => [c, [c, c]])) // Children 会把多维数组变成一维数组
  return props.children
}

export default () => (
  <ChildrenDemo>
    <span>1</span>
    <span>2</span>
  </ChildrenDemo>
)
