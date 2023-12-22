require('dotenv').config();

const accessToken = process.env.ACCESS_TOKEN;
const apiKey = process.env.API_KEY;
const accept = process.env.HEADER_ACCEPT_V2;
const tenantId = process.env.TENANT_ID;

async function fetchAPI(url, token = accessToken) {
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

module.exports = {
  fetchAPI,
  fetchActivitiesAPI,
  fetchActivityAPI,
  fetchOfferAPI,
};
