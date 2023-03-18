export default async function useFetch(url) {
  let data, err;

  try {
    let result = await fetch(url);
    if (!result.ok) {
      result = await result.json();
      throw new Error(result.message);
    }
    result = await result.json();
    data = result;
  } catch (error) {
    err = error.message;
  }

  return { data, err };
}
