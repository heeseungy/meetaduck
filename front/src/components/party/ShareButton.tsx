interface PropType {
  children: string;
}

function ShareButton({children}: PropType) {
  return (
    <button>{children}</button>
  )
}

export default ShareButton