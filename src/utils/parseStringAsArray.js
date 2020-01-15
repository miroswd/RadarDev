module.exports = function parseStringAsArray(arrayAsString){
  return arrayAsString.split(',').map(tech => tech.trim()) // Separando por vírgula e removendo espaços antes e depois da string
}