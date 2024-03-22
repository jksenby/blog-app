function AuthentificationService() {
  async function register(data) {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch("http://localhost:5000/register", options);

      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    } catch (err) {
      return { error: "Something in server went wrong" };
    }
  }

  async function login(data) {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch("http://localhost:5000/login", options);

      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    } catch (err) {
      return { error: "Something in server went wrong" };
    }
  }

  return { register, login };
}

export default AuthentificationService;
