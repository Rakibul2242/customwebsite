/*
This is the amp-lify JS file where all non-themed amp-lify js is stored
1. Cookie consent management

*/

//==============1.COOKIE CONSENT==================
const cookieBanner = document.getElementById('cookieBanner');
const acceptBtn = document.getElementById('acceptBtn');
const rejectBtn = document.getElementById('rejectBtn');
const customiseBtn = document.getElementById('customiseBtn');
const acceptAllBtn = document.getElementById('acceptAllBtn');
const selectedBtn = document.getElementById('selectedBtn');
const cookieOptions = document.getElementById('cookieOptions');

acceptBtn.addEventListener('click', function(){
    document.cookie = "Amp-lifyConsentCookie=all; max-age="+60*60*24*30*6 +";path=/";
    cookieBanner.classList.add('hide');
    cookieBanner.classList.remove('show');
    if(checkGAExists()){
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
        }
});

rejectBtn.addEventListener('click', function(){
    cookieBanner.classList.add('hide');
    cookieBanner.classList.remove('show');
    sessionStorage.setItem("cookieConsent","answered");

});

customiseBtn.addEventListener('click', function(){
    cookieOptions.setAttribute('style', 'display:block');
    acceptBtn.setAttribute('style', 'display:none')
});

acceptAllBtn.addEventListener('click', function(){
    document.cookie = "Amp-lifyConsentCookie=all; max-age="+60*60*24*30*6 +";path=/";
    cookieBanner.classList.add('hide');
    cookieBanner.classList.remove('show');
    if(checkGAExists()){
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
        }
});

selectedBtn.addEventListener('click', function(){
    if(document.getElementById('personalisation').checked && document.getElementById('analytics').checked){
        document.cookie = "Amp-lifyConsentCookie=all; max-age="+60*60*24*30*6 +";path=/";
        if(checkGAExists()){
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
              });
            }
    }
    else if(document.getElementById('personalisation').checked){
        document.cookie = "Amp-lifyConsentCookie=personalised; max-age="+60*60*24*30*6 +";path=/";
    } 
    else if(document.getElementById('analytics').checked){
        document.cookie = "Amp-lifyConsentCookie=analytics; max-age="+60*60*24*30*6 +";path=/";
        if(checkGAExists()){
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
              });
            }
    }
    cookieBanner.classList.add('hide');
    cookieBanner.classList.remove('show');
});

showCookieBanner = () => {
    cookieBanner.classList.add('show');
    cookieBanner.classList.remove('hide');
}

checkConsent = (key) => {
    const cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value}), {} )
    return cookies[key];
  
};

checkGAExists = () => {
    var scripts = document.getElementsByTagName('script'), 
    i = len = 0;
    var googleAnalyticsTestWasSuccessfull = false;
    for (i, len = scripts.length; i < len; i += 1) {
    if ( /www\.googletagmanager\.com\/gtag\/js/.test(scripts[i].src)) {
    googleAnalyticsTestWasSuccessfull = true;
    }
    //if (scripts[i].innerHTML.includes('UA-119684838-1')){
   // uaElementWasFound = true; add to below if to identify if specific property exists
    }
    if(googleAnalyticsTestWasSuccessfull){
    return true;
    }
    return false;
    }

window.onload = () => {
   if(!checkConsent('Amp-lifyConsentCookie') && !sessionStorage.getItem("cookieConsent")) {
    showCookieBanner();
   }
   else if(checkConsent('Amp-lifyConsentCookie') == 'all' || checkConsent('Amp-lifyConsentCookie') == 'analytics'){
    if(checkGAExists()){
    gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
   }
}

//2. Youtube video embed

(function(){
    let YouTubeContainers = document.querySelectorAll(".embed-youtube");

    // Iterate over every YouTube container you may have
    for (let i = 0; i < YouTubeContainers.length; i++) {
        let container = YouTubeContainers[i];
        let imageSource = "https://img.youtube.com/vi/"+ container.dataset.videoId +"/sddefault.jpg"; 
      
        // Load the Thumbnail Image asynchronously
        let image = new Image();
        image.src = imageSource;
        image.addEventListener("load", function() {
            container.appendChild(image);
        });

        

        // When the user clicks on the container, load the embedded YouTube video
        container.addEventListener("click", function() {
            let iframe = document.createElement( "iframe" );

            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
            // Important: add the autoplay GET parameter, otherwise the user would need to click over the YouTube video again to play it 
            iframe.setAttribute("src", "https://www.youtube.com/embed/"+ this.dataset.videoId +"?rel=0&showinfo=0&autoplay=1");
           
            // Clear Thumbnail and load the YouTube iframe
            this.innerHTML = "";
            this.appendChild( iframe );
           
           // var request = $.get('/increment_view/' + this.dataset.videoId);
            
            let outer_container = document.getElementById('video-container');
            let embed_container = document.getElementById('embed-youtube');
            outer_container.setAttribute('style', 'position:relative; padding-top:56.25%; margin-top:-56.25%');
            embed_container.setAttribute('style', 'position:absolute')
            //request.done(function(response) {
                //console.log(response);});

        });
    }
})();

// 3. FAQ toggle

function toggleFaq(index) {
	var text = document.getElementById("faq-answer-" + index);
	var faqCaretDown = document.getElementById("faqCaretDown-" + index);
	var faqCaretUp = document.getElementById("faqCaretUp-" + index);


	if (text.style.display === "none") {
		text.style.display = "block";
		faqCaretUp.style.display = "block";
		faqCaretDown.style.display = "none";
	} else {
		text.style.display = "none";
		faqCaretUp.style.display = "none";
		faqCaretDown.style.display = "block";
	}
};






