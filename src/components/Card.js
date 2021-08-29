import * as cardStyles from "./component-styles/card.module.scss";

function Card(props) {
  const { SKU, name, price, properties, onChange, items } = props;
  const propertiesObj = properties && JSON.parse(properties);
  console.log(propertiesObj);
  function checkIfItemIsSelected(name) {
    let filteredForItem = items.filter((item) => item.SKU === name);
    if (filteredForItem.length === 0) {
      return false;
    }
    return true;
  }
  return (
    <div className={cardStyles.card}>
      <form>
        <input
          type="checkbox"
          name={SKU}
          id="delete"
          onChange={onChange}
          checked={checkIfItemIsSelected(SKU)}
        />
      </form>
      <div className={cardStyles.textContent}>
        <h4>{SKU}</h4>
        <h4>{name}</h4>
        <h4>Price: {price} $</h4>

        {propertiesObj && propertiesObj.dimensions !== undefined && (
          <h4>
            {"Dimensions: " +
              propertiesObj.dimensions.height +
              "cm" +
              "x" +
              propertiesObj.dimensions.width +
              "cm" +
              "x" +
              propertiesObj.dimensions.length +
              "cm"}
          </h4>
        )}

        {propertiesObj && propertiesObj.size !== undefined && (
          <h4>{"Size: " + propertiesObj.size + " Mb"} </h4>
        )}

        {propertiesObj && propertiesObj.weight !== undefined && (
          <h4>{"Weight: " + propertiesObj.weight + " Kg"}</h4>
        )}
      </div>
    </div>
  );
}

export default Card;
