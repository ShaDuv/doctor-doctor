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
                                         .replace(/{{firstName}}/g, profile.lastName)
                                         .replace(/{{website}}/g, profile.website)
                                         .replace(/{{phone}}/g, profile.phone)

        for (var p = 0; p < profile.practice.length; p++) {
          let practice = profile.practice[p];
          $('.website').text(practice.website);

        }
        // $('.location').text(profile.lastName);
        // $('.accepting-patients').text(profile.lastName);
        // $('.phone').text(profile.lastName);
      }

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
