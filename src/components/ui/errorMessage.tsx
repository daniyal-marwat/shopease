interface Props {
  errorMessage: string;
}

function ErrorMessage({ errorMessage }: Props) {
  return <p className="text-red-600 text-sm text-center">{errorMessage}</p>;
}

export { ErrorMessage };
