const BASE_URL = 'http://localhost:3000';

 function newPiece(newPiece) {
  fetchRequest('piece', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(newPiece),
  });
}

/**
 * Gets pieces from server and adds them to context
 * 
 * @param ctx - 'global' context object
 */
function getPieces(ctx) {
  fetchRequest('/piece', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => {
      res.forEach((piece) => {
        // Check currentDay
        if (piece.currentDay >= piece.plan.length) {
          piece.currentDay = piece.plan.length - 1;
        }

        ctx.dispatch({ type: 'addNewPiece', payload: piece });
      });
    });
}

function updateCurrentPiece(newCurrentPieceIdx) {
  const sending = { currentPiece: newCurrentPieceIdx };
  fetchRequest('/piece/currentPiece', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(sending),
  });
}

function updateCurrentDay(pieceId, newCurrentDay) {
  const sending = { id: pieceId, currentDay: newCurrentDay };
  // eslint-disable-next-line no-console
  console.log('sending (day)', sending); //TODO remove this once bug with updating day with newly created piece is fixed
  fetchRequest('/piece/currentDay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(sending),
  });
}

function updateCurrentSession(pieceId, newCurrentSession) {
  const sending = { id: pieceId, currentSession: newCurrentSession };
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

// const file = fileInput.current.files[0];
function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  return fetchRequest('/api/images', {
    method: 'POST',
    body: formData,
  });
}

function updatePiece(newPiece) {
  fetchRequest('/piece', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(newPiece),
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
  newPiece,
  getPieces,
  updateCurrentPiece,
  updateCurrentDay,
  updateCurrentSession,
  deletePiece,
  uploadImage,
  updatePiece
};
