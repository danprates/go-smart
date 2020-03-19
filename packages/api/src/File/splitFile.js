module.exports = file => {
  const _file = file.toString('base64')
  
  const pieces = []

  let value = ''
  for (let index = 0; index < _file.length; index++) {
    
    const element = _file[index];
  
    if (value.length == 256) {
      pieces.push(value)
      value = ''
    } else {
      value += element
    }

  }
  
  return pieces
}