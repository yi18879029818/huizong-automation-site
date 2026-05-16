export default function CountUpValue({
  as: Tag = "span",
  value,
  className,
  ...props
}) {
  return (
    <Tag className={className} data-countup {...props}>
      {value}
    </Tag>
  );
}
