const TechList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, index) => {
        return (
          <li
            className={`text-slate-600 ${index === 0 ? 'font-bold' : ''}`}
            key={`${item}-${index}`}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default TechList;