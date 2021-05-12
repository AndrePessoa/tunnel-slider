import Picture from "../picture";

function CanvasElemFilter({ item, far, near, position, odd, index }) {
  if (position > far || position < near) return null;

  const proportion = (position - near) / far;

  return item.type === "picture" ? (
    <Picture
      odd={odd}
      depth={proportion}
      color={item.color}
      top={item.top}
      src={item.img}
      index={index}
    />
  ) : null;
}

function Canvas({ list, proportion }) {
  const far = 5;
  const near = -3;
  const total = list.length + far;
  const position = total * proportion - far;
  return (
    <ul>
      {list.map((item, index) => (
        <CanvasElemFilter
          near={near}
          far={far}
          total={total}
          position={index - position}
          item={item}
          odd={index % 2}
          key={index}
          index={index}
        />
      ))}
    </ul>
  );
}

export default Canvas;
