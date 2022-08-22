import axios from 'axios';
import config from '../config';

export async function pointsManipulation(teamID, action) {
  try {
    let result = await axios.post(`${config.apiBaseUrl}/goal?action=${action}&team=${teamID}`);

    return {
      status: result.status,
    };
  } catch (e) {
    return {
      error: e,
      status: e.response.status,
    };
  }
}
