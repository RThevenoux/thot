class JSONLoader {
  static load(url, callback) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 200 || req.status == 0) {
          let data = JSON.parse(req.responseText);
          callback(null, data);
        } else {
          callback("Invalid status "+ req.status+" when loading '" + url+"'");
        }
      }
    };
    req.onerror = () => callback("Error when loading '" + url+"'. Maybe invalid URL");
    
    req.open("GET", url, true);
    req.overrideMimeType("application/json");
    req.send(null);
  }
}