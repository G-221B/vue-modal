export function createCssText(cssObj) {
  if (typeof cssObj !== 'object' && cssObj !== null) return cssObj;
  let cssText = '';
  Object.keys(cssObj).forEach((key) => {
    const name = key.replace(/([A-Z]){1}/g, (args) => {
      return '-' + args.toLocaleLowerCase();
    });
    cssText += `${name}: ${cssObj[key]};`;
  });
  console.log(cssText);
  return cssText;
}
