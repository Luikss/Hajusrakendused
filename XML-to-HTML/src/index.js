document.getElementById("app").innerHTML = `<table id="xmlTable"></table>`;

const getXml = function(fileName) {
  const xmlhttp = new XMLHttpRequest()
  xmlhttp.open("GET", fileName, false)
  xmlhttp.send()
  return xmlhttp.responseXML
}

const generateTable = function(XMLContent) {
  let tableRows = "<tr><th>Title</th><th>Price</th><th>Platform</th></tr>"
  const gameElements = XMLContent.getElementsByTagName("game")
  const platformsElements = XMLContent.getElementsByTagName("platforms")

  for (let i = 0; i < gameElements.length; i++) {
    const game = gameElements[i]
    tableRows += "<tr><td>" + 
      game.getElementsByTagName("title")[0].childNodes[0].nodeValue +
      "</td><td>" +
      game.getElementsByTagName("price")[0].childNodes[0].nodeValue +
      "</td>" +
      addPlatforms(platformsElements[i]) + 
      "</tr>"
  }
  document.getElementById("xmlTable").innerHTML = tableRows
}

function addPlatforms(platformsElements) {
  let tableRow = "<td>"
  const platformElementsLenght = platformsElements.getElementsByTagName("platform").length

  for (let i = 0; i < platformElementsLenght; i++) {
    const platform = platformsElements.getElementsByTagName("platform")[i].childNodes[0].nodeValue
    tableRow += platform + "/"
  }
  return tableRow += "</td>"
}

generateTable(getXml("src/games.xml"))
