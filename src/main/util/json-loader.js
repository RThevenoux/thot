class JSONLoader {
  static load(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.overrideMimeType("application/json");

      xhr.onload = () => {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 0) {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          let error = "Invalid status " + xhr.status + " (" + xhr.statusText + ") when loading '" + url + "'";
          reject(error);
        }
      };
      xhr.onerror = () => {
        let error = "Error (" + xhr.statusText + ") when loading '" + url + "'. Maybe invalid URL";
        reject(xhr.statusText);
      }
      xhr.send(null);
    });
  }
}