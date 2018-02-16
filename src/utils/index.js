// const req = require.context('./components', true, /^(?!.*styles).*\/(?!.*stories).*\.js$/)
export const addModule = (__req, mapComp) => {
  const mc = mapComp;
  __req
    .keys()
    .forEach((filename) => {
      const objects = __req(filename);
      Object.getOwnPropertyNames(objects)
        .filter((name) => {
          if (name === '__esModule' || name === 'default') return false;
          return true;
        })
        .forEach((name) => {
          mc[name] = objects[name];
        });
    },
    );
};

export const getColor = (props) => {
  // let cor1 = props.color ? props.color : "#000";
  const cor = props.themeColor ? props.themeColor : '#000000';
  return cor;
};
