export const fetchData = async (urlParameter) => {
  const response = await fetch(`${import.meta.env.VITE_FETCH_URL}${urlParameter}`);
  const data = await response.json();
  return data;
};

export const manipulateData = async (
  urlParameter,
  method,
  data,
  setErrorMessage,
  isJson = false
) => {
  let headerContent = {
    'Delete-Me': 'delete',
    // 'Add-Me': 'add',
    // 'Edit-Me': 'edit',
  };

  if (isJson) {
    headerContent = {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  const response = await fetch(`${import.meta.env.VITE_FETCH_URL}${urlParameter}`, {
    method: method,
    mode: 'cors',
    headers: headerContent,
    body: data,
  });

  if (response.ok) {
    const resData = await response.json();

    return resData;
  }

  const { message } = await response.json();

  setErrorMessage(message);
  return null;
};

export const getDataLength = async (cb) => {
  const data = await cb;

  return data.length;
};
