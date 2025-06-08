import { UserLogin } from "../interfaces/UserLogin";

interface LoginResponse {
  token: string; // Define the expected structure of the response
}

const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
  try {
    // Make a POST request to the login route
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo), // Convert userInfo to JSON
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error('Login failed'); // Handle errors accordingly
    }

    const data: LoginResponse = await response.json(); // Parse the response JSON

    return data; // Return the response object containing the token
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Rethrow the error for further handling
  }
};

export { login };
