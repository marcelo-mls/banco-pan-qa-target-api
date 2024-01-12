require('dotenv').config();

const apiKey = process.env.API_KEY;
const accept = process.env.HEADER_ACCEPT_V2;
const tenantId = process.env.TENANT_ID;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const clientScope = process.env.CLIENT_SCOPE;



async function fetchAPI(url, token) {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'X-Api-Key': apiKey,
    'Accept': accept
  };

  const response = await fetch(url, { headers });
  return response.json();
}

async function fetchActivitiesAPI(token) {
  const url = `https://mc.adobe.io/${tenantId}/target/activities`;
  const response = await fetchAPI(url, token);

  return response;
}

async function fetchActivityAPI(activityId, token) {
  const url = `https://mc.adobe.io/${tenantId}/target/activities/xt/${activityId}`;
  const response = await fetchAPI(url, token);

  return response;
}

async function fetchOfferAPI(offerId, token) {
  const url = `https://mc.adobe.io/${tenantId}/target/offers/json/${offerId}`;
  const response = await fetchAPI(url, token);

  return response;
}

async function fetchGenerateTokenAPI() {
  const url = 'https://ims-na1.adobelogin.com/ims/token/v3';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': clientId,
      'client_secret': clientSecret,
      'scope': clientScope,
    }),
  };

  const response = await fetch(url, options);

  return response.json();
}

module.exports = {
  fetchAPI,
  fetchActivitiesAPI,
  fetchActivityAPI,
  fetchOfferAPI,
  fetchGenerateTokenAPI,
};
