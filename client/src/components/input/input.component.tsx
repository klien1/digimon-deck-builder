interface InputProps {
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, type }) => {
  return (
    <>
      <label>{label}</label>
      <input type={type} />
    </>
  );
};

export default Input;
