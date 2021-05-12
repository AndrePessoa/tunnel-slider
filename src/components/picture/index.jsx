const cacheImgs = {};

function cacheImg(url) {
  if (cacheImgs[url]) return;

  const img = document.createElement("img");
  img.src = url;
  cacheImgs[url] = img;
}

function Picture({ depth = 1, odd = true, color, top, src, index }) {
  cacheImg(src);
  const rangeProp = depth > 1.2 ? 1 - (depth % 1.2) * 1.5 : depth;
  const blur = Math.max(0, (1 - rangeProp) * 15);
  const left = odd ? 100 : -100;
  const style = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "200px",
    height: "200px",
    transform: `scale(${depth * depth}) translate(${left}%, ${top}%)`,
    opacity: rangeProp,
    background: color,
    filter: `blur(${blur}px)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${src})`,
  };

  return (
    <div style={style}>
      <div>{index}</div>
    </div>
  );
}

export default Picture;
