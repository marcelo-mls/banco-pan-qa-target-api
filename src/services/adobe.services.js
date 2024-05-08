require('dotenv').config();

const {
  API_KEY,
  ACCEPT_V2,
  ACCEPT_V3,
  TENANT_ID,
  CLIENT_ID,
  CLIENT_SECRET,
  API_SCOPE
} = process.env;

async function fetchAdobeAPI(endpointName, token, id=null, version='v2') {
  // https://developer.adobe.com/target/administer/admin-api/

  const headers = {
    'Authorization': `Bearer ${token}`,
    'X-Api-Key': API_KEY,
    'Accept': version === 'v3' ? ACCEPT_V3 : ACCEPT_V2
  };

  const endpoints = {
    activity: `/target/activities/xt/${id}`,
    activities: '/target/activities',
    offer: `/target/offers/json/${id}`,
    audience: `/target/audiences/${id}`,
    audiences: '/target/audiences',
  };

  const url = `https://mc.adobe.io/${TENANT_ID}${endpoints[endpointName]}`;

  const response = await fetch(url, { headers });
  return response.json();
}

async function generateTokenAPI() {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET,
      'scope': API_SCOPE,
    }),
  };

  const url = 'https://ims-na1.adobelogin.com/ims/token/v3';
  const response = await fetch(url, options);
  const tokenData = await response.json();
  const token = tokenData.access_token;
  
  return token;
}

module.exports = {
  fetchAdobeAPI,
  generateTokenAPI,
};
