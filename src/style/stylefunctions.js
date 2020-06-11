import defaultStyle from './stylefunctions/default';
import treasureStyle from './stylefunctions/treasureStyle';


const customStyles = {
  default: defaultStyle,
  treasure: treasureStyle
};

export default function styleFunctions(customStyle, params) {
  if (customStyle in customStyles) {
    return customStyles[customStyle](params);
  }
  return customStyles.default(params);
}
