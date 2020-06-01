export async function fetchData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    return new Error('Encountered with API Error');
  }
}
