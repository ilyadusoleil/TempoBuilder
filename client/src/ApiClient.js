const BASE_URL = 'http://localhost:3000';

function updateCurrentPiece(newCurrentPieceIdx) {
  const sending = { currentPiece: newCurrentPieceIdx };
  console.log('sending', sending);
  fetchRequest('/piece/currentPiece', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(sending),
  });
}

function updateCurrentDay(pieceId, newCurrentDay) {
  const sending = { id: pieceId, currentDay: newCurrentDay };
  console.log('sending (day)', sending);
  fetchRequest('/piece/currentDay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(sending),
  });
}

function updateCurrentSession(pieceId, newCurrentSession) {
  const sending = { id: pieceId, currentSession: newCurrentSession };
  console.log('sending (session)', sending);
  fetchRequest('/piece/currentSession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(sending),
  });
}

function deletePiece(pieceId) {
  fetchRequest('/piece', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ id: pieceId }),
  });
}

/**
 * Helper function for the fetch request
 *
 * @param path - extension to the URL to send the query to
 * @param options - options for the fetch request. If empty will do a GET request
 */
function fetchRequest(path, options) {
  return fetch(BASE_URL + path, options)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => (res.status != 204 ? res.json() : res))
    .catch((err) =>
      // eslint-disable-next-line no-console
      console.error(
        `Error fetching ${options ? options.method : 'GET'} ${path}`,
        err
      )
    );
}

export {
  updateCurrentPiece,
  updateCurrentDay,
  updateCurrentSession,
  deletePiece,
};
