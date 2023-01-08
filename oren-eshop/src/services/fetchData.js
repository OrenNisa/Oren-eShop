export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const answer = await response.json();
    return answer;
  } catch (error) {
    console.log("AMIT");
  }
};
