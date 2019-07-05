import "bootstrap";
import "./styles.css";
import $ from 'jquery';
import { DoctorSearch } from './search.js';
import { DoctorProfile } from './doctor_profile.js';


$(document).ready(function() {
  $('#search').click(function() {
    let name = $('#name').val();
    let symptom = $('#symptom').val();
    $('#name').val("");
    $('#symptom').val("");

    const profileTemplate = document.getElementById("profileTemplate").innerHTML;
    const practiceTemplate = document.getElementById("practiceTemplate").innerHTML;
    const phoneTemplate = document.getElementById("phoneTemplate").innerHTML;

    let profileDisplay = '';

    let doctorSearch = new DoctorSearch();
    let nameSearchResult = doctorSearch.getDoctorByName(name, symptom);
    nameSearchResult.then(function(response) {
      let body = JSON.parse(response);
      if (body.meta.total == 0) {
        $('#profile').hide();
        $('#no-results').show();
      };
      for (var i = 0; i < body.data.length; i++) {
        let profile = new DoctorProfile(body.data[i]);
        profileDisplay += profileTemplate.replace(/{{firstName}}/g, profile.firstName)
                                        .replace(/{{lastName}}/g, profile.lastName);
        for (var p = 0; p < profile.practice.length; p++) {
          let practice = profile.practice[p];
          profileDisplay += practiceTemplate.replace(/{{street}}/g, practice.visit_address.street)
                                            .replace(/{{city}}/g, practice.visit_address.city)
                                            .replace(/{{state}}/g, practice.visit_address.state)
                                            .replace(/{{zip}}/g, practice.visit_address.zip)
                                            .replace(/{{website}}/g, practice.website)
                                            .replace(/{{accepting}}/g, practice.accepts_new_patients);
          for (var ph = 0; ph < practice.phones.length; ph++) {
            let phone = practice.phones[ph];
            profileDisplay += phoneTemplate.replace(/{{PhoneType}}/g, phone.type)
                                            .replace(/{{phone}}/g, phone.number);
          };

        };
      };
      document.getElementById("displayName").innerHTML = profileDisplay;
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
