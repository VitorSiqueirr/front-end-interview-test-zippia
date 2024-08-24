export const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    if (error.name === "TypeError") {
      return { error: "Network error. Please check your internet connection." };
    } else {
      return { error: error.message };
    }
  }
};
