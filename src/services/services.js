require('dotenv').config();

const apiKey = process.env.API_KEY;
const acceptV2 = process.env.HEADER_ACCEPT_V2;
const acceptV3 = process.env.HEADER_ACCEPT_V3;
const tenantId = process.env.TENANT_ID;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const clientScope = process.env.CLIENT_SCOPE;

async function fetchAPI(url, token, version='v2') {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'X-Api-Key': apiKey,
    'Accept': version === 'v3' ? acceptV3 : acceptV2
  };

  const response = await fetch(url, { headers });
  return response.json();
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

// ATIVIDADES
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

// OFERTAS
async function fetchOfferAPI(offerId, token) {
  const url = `https://mc.adobe.io/${tenantId}/target/offers/json/${offerId}`;
  const response = await fetchAPI(url, token);

  return response;
}

// AUDIÊNCIAS
async function fetchAudiencesAPI(token) {
  const url = `https://mc.adobe.io/${tenantId}/target/audiences`;
  const response = await fetchAPI(url, token, 'v3');

  return response;
}

async function fetchAudienceAPI(audienceId, token) {
  const url = `https://mc.adobe.io/${tenantId}/target/audiences/${audienceId}`;
  const response = await fetchAPI(url, token, 'v3');

  return response;
}

module.exports = {
  fetchAPI,
  fetchGenerateTokenAPI,
  fetchActivitiesAPI,
  fetchActivityAPI,
  fetchOfferAPI,
  fetchAudiencesAPI,
  fetchAudienceAPI,
};
