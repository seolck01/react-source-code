import * as React from 'react'
const  { memo } = React
export default memo(
  function TestMemo() {
    return <span>123</span>
  },
  () => false,
)
