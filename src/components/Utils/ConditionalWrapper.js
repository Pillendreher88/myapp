
export default ({ condition, children, wrap }) =>
  condition ? wrap(children) : children;