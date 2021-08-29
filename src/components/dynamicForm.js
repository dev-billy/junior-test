import * as styles from "../pages/AddProduct/addProduct.module.scss";
function DynamicForm(props) {
  const { type, onChange, properties, disabled } = props;

  if (type === "DVD") {
    return (
      <div className={styles.inputGroup}>
        <label>Size(MB)</label>
        <input
          type="number"
          name="size"
          disabled={disabled}
          id="size"
          required
          value={properties.size}
          onChange={onChange}
        />
        <br />
        <strong>Please provide disk size in MB</strong>
        <br />
      </div>
    );
  }
  if (type === "Book") {
    return (
      <div className={styles.inputGroup}>
        <label>Weight(KG)</label>
        <input
          type="number"
          name="weight"
          id="weight"
          disabled={disabled}
          required
          value={properties.weight}
          onChange={onChange}
        />
        <br />
        <strong>Please provide book weight in KG</strong>
        <br />
      </div>
    );
  }
  if (type === "Furniture") {
    return (
      <>
        <div className={styles.inputGroup}>
          <label>Height(CM)</label>
          <input
            type="number"
            name="height"
            id="height"
            disabled={disabled}
            required
            value={properties.dimensions.height}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Width(CM)</label>
          <input
            type="number"
            name="width"
            id="width"
            disabled={disabled}
            required
            value={properties.dimensions.width}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Length(CM)</label>
          <input
            type="number"
            name="length"
            id="length"
            disabled={disabled}
            required
            value={properties.dimensions.length}
            onChange={onChange}
          />
        </div>
        <br />
        <strong>
          Please provide furniture dimensions Height x Width x Length in CM
        </strong>
        <br />
      </>
    );
  }
}

export default DynamicForm;
