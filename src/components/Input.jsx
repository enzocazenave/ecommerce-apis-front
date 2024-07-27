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
        className="block text-xs font-medium text-gray-700 ps-2"
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
        className={`px-2 py-1 mt-1.5 w-full rounded-lg border border-gray-100 text-gray-700 sm:text-sm shadow-sm ${disabled ? "bg-gray-200 text-gray-500" : ""}`}
      />
    </div>
  );
};