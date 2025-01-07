const { Client } = require('fb-messenger-api');
const moment = require('moment-timezone');

// Directly include fbstate cookies within the bot
const fbstate = {
  "cookies": [
    {
      "name": "c_user",
      "value": "USER_ID", // Replace with your Facebook user ID
      "domain": ".facebook.com",
      "path": "/",
      "httpOnly": true,
      "secure": true
    },
    {
      "name": "xs",
      "value": "COOKIE_VALUE", // Replace with your valid cookie value
      "domain": ".facebook.com",
      "path": "/",
      "httpOnly": true,
      "secure": true
    }
    // Add any other necessary cookies here
  ]
};

// Initialize the Messenger Client
const client = new Client({ fbstate });

const messengerBot = {
  sendAzan: async () => {
    const azanTimes = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    // Determine the current azan time based on timezone
    const currentTime = moment().tz('Asia/Karachi');
    const currentHour = currentTime.hour();

    if (currentHour >= 5 && currentHour <= 23) {
      const nextAzanIndex = Math.floor((currentHour - 5) / 3);
      const nextAzanTime = azanTimes[nextAzanIndex];

      const audioUrl = `https://your-azan-audio-api.com/${nextAzanTime}.mp3`;

      // Send the azan audio message using fbstate cookies
      try {
        const recipientId = 'RECIPIENT_ID'; // Replace with the recipient's actual ID
        await client.sendAudio(recipientId, audioUrl);
        console.log(`Azan for ${nextAzanTime} sent successfully!`);
      } catch (error) {
        console.error('Error sending azan:', error);
      }
    } else {
      console.log('No azan scheduled for this time.');
    }
  }
};

// Run the azan notification
messengerBot.sendAzan();
