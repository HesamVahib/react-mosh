import Button from "./Button/Button";

interface AlertProps {
  message: string;
}

const Alert = ({ message }: AlertProps) => {
  return (
    <>
      <div className="alert alert-primary" role="alert">
        {message}
      </div>
    </>
  );
};

export default Alert;
