export const Input = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};
