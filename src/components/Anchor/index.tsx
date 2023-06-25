const Anchor = (props) => {
  const { label } = props;
  return (
    <a
      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
      {...props}
    >
      {label}
    </a>
  );
};
export default Anchor;
