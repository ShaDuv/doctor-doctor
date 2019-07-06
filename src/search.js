export class DoctorSearch {
  getDoctorByName(name, symptom) {
    return new Promise(function(resolve, reject) {
      const apiKey = process.env.apiKey;
      let request = new XMLHttpRequest()
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=OR&user_key=${apiKey}`;
      if (typeof name !== 'undefined') {
        url += `&name=${name}`;
      };
      if (typeof symptom !== 'undefined') {
        url += `&query=${symptom}`;
      };
      console.log(url)
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
