const REQUEST_TYPES = [
  'auth',
  'lock',
  'unlock',
  'stream',
];

const RESPONSE_TYPES = [
  'response'
];

const STATUS_TYPES = [
  'success',
  'error'
];


function validateRequest(req) {
  if (req && req.type && REQUEST_TYPES.indexOf(req.type) !== -1 &&
      req.uid) {
    if (req.type == 'auth') {
      return true;
    }

    // all other requests needs device_id
    return !!req.device_id;
  }

  console.log('invalid request');
  return false;
}


 function validateResponse(res) {
  if (res && res.type && RESPONSE_TYPES.indexOf(res.type) &&
      res.cmd && res.cmd in REQUEST_TYPES &&
      res.status && res.status in STATUS_TYPES &&
      res.uid) {
    if (res.cmd === 'lock') {
      return !!res.timestamp;
    }

    if (res.cmd === 'unlock') {
      return !!res.info;
    }
  }

  return false;
}

function error(req) {
  return {
    type: 'response',
    cmd: req.type,
    status: 'error',
    uid: req.uid
  }
}

function success(req) {
  return {
    type: 'response',
    cmd: req.type,
    status: 'success',
    uid: req.uid
  }
}

module.exports = {
  validateRequest: validateRequest,
  validateResponse: validateResponse,
  error: error,
  success: success,
}
