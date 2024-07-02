export const TableHeaderCell = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <th className="bg-cyan-500 saturate-50 text-lg font-semibold py-2 text-white px-4">
      {children}
    </th>
  );
};
export const TableDataCell = ({ children }: { children: React.ReactNode }) => {
  if (children === true) {
    return <td className="py-3 even:bg-gray-200">Yes</td>;
  }
  if (children === false) {
    return <td className="py-3 even:bg-gray-200">No</td>;
  }
  return <td className="py-3 px-4 even:bg-gray-200">{children}</td>;
};
