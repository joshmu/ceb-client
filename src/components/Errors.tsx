// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/

type PropsType = {
  errors: Error[]
}

export const Errors = ({ errors }: PropsType): JSX.Element => {
  return (
    <>
      <h1>ERROR!</h1>
      {errors.map((error, idx) => (
        <pre key={idx}>{JSON.stringify(error, null, 2)}</pre>
      ))}
    </>
  )
}
