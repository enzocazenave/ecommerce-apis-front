export const Input = ({ 
  label, 
  type, 
  placeholder, 
  value, 
  onChange, 
  name, 
  disabled = false 
}) => {
  return (
    <div>
      <label
        className="block text-xs font-medium text-gray-700 ps-"
      >
        {label}
      </label>

      <input
        autoComplete="off"
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`mt-1 px-2 py-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm ${disabled ? "bg-gray-200 text-gray-500" : ""}`}
      />
    </div>
  );
};