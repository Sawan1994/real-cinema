import styles from "./styles/index.module.scss";

function Input({ type, value, placeholder, onChange }) {
  return (
    <input
      className={styles[`input__${type}`]}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
