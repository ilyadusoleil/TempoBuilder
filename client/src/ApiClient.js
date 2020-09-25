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

export { updateCurrentPiece };
