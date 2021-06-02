module.exports = (ui, data) => {
  let output = ui.replaceAll(`{%PRODUCTNAME%}`, data.productName);
  output = output.replaceAll(`{%IMAGE%}`, data.image);
  output = output.replaceAll(`{%PRODUCTORIGIN%}`, data.from);
  output = output.replaceAll(`{%NUTRIENTS%}`, data.nutrients);
  output = output.replaceAll(`{%QUANTITY%}`, data.quantity);
  output = output.replaceAll(`{%PRICE%}`, data.price);
  output = output.replaceAll(`{%DESCRIPTION%}`, data.description);
  output = output.replaceAll(`{%ID%}`, data.id);
  if (!data.organic)
    output = output.replaceAll(`{%NON-ORGANIC%}`, "not-organic");

  return output;
};
