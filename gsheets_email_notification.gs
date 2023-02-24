function getGIF() {

	// Giphy API defaults
	const giphy = {
		baseURL: "https://api.giphy.com/v1/gifs/",
		key: "[YOUR_API_KEY]",
		tag: "[TAG_TO_FILTER_GIFS_BY]",
		type: "random",
	};  

  // Giphy API URL
  var giphyURL = giphy.baseURL +giphy.type+"?api_key="+giphy.key+"&tag="+giphy.tag;
  var response = UrlFetchApp.fetch(giphyURL);
  var jsonresponse = response.getContentText();
  var jsondata = JSON.parse(jsonresponse);
  var gifURL = jsondata.data.images.original.url;
  Logger.log(gifURL);
  return gifURL

}


function send_reminder_email() {

  // Create message text
  var message = '<h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-size: 22px;">It\'s time to check in with your PDP!</h1>\
<div style="line-height: 140%; text-align: left; word-wrap: break-word;">\
    <br>\
    <p style="font-size: 16px; line-height: 140%; text-align: center;">Hey! The week is drawing to a close - it\'s time to 
    <a href="[LINK_TO_DOCUMENT]">check in with yourself and your goals</a>\
    and see what change this week has brought. </p>\
    <br>\
    <p style="font-size: 16px; line-height: 140%; text-align: center;">Has anyone given you feedback?</p>\
    <p style="font-size: 16px; line-height: 140%; text-align: center;">Have you achieved something cool?</p>\
    <p style="font-size: 16px; line-height: 140%; text-align: center;">What about those goals you set? Any updates?</p>\
    <p style="font-size: 16px; line-height: 140%; text-align: center;">Here is a motivational gif to inspire you 😊</p>\
    <br>\
    <img src="' + getGIF() + '"style="display: block; margin-left: auto; margin-right: auto; width: 50%"></div>' 

    // Create the email dictionary with needed information
    var email = {
      to: "[YOUR_EMAIL]",
      subject: "It's PDP o'clock!",
      htmlBody: message
    }

    // send email
    MailApp.sendEmail(email)
    // Logger.log(message) //optional - used for testing

}
