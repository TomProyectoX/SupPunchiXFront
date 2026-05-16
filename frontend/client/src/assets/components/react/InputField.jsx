

// react-toastify removed — using inline errors only
function InputField(  {label,
  type = "text",
  placeholder,
  value,
  onChange,
  error}) {
return(
  <>
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange} // la razon por la cual se llama a onchange es porque el input esta dentro del hijo y es el unico que puede ejecutrar on change para cambiar el estado de email
      value={value} 
      className={`w-full p-4 rounded-lg  text-white mb-4 ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </>
);
}


export default InputField;

