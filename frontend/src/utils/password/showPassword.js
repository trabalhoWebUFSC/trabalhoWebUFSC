const toggleShow = (inputRef, setEyeState) => {
  if (inputRef.current) { // verificacao de seguranca
    if (inputRef.current.type === 'password') {
      setEyeState(true)
      inputRef.current.type = 'text';
    } else {
      setEyeState(false)
      inputRef.current.type = 'password';
    }
  }
};

export { toggleShow };
