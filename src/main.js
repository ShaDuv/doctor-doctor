import $ from 'jquery';
import { DoctorSearch } from './search.js';
import { DoctorProfile } from './doctor_profile.js';


$(document).ready(function() {
  $('#search').click(function() {
    let name = $('#name').val();
    let symptom = $('#symptom').val();
    $('#name').val("");
    $('#symptom').val("");
    $('#profile').val("");


    let doctorSearch = new DoctorSearch();
    let nameSearchResult = doctorSearch.getDoctorByName(name, symptom);
    nameSearchResult.then(function(response) {
      let body = JSON.parse(response);
      for (var i = 0; i < body.data.length; i++) {
        let profile = new DoctorProfile(body.data[i]);

        $('.showFname').text(profile.firstName);
        $('.showLname').text(profile.lastName);
      }

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
