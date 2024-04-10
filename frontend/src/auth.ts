export const isLoggedIn = () => {
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        // const decodedToken = jwt_decode(token);
        // const currentTime = Date.now() / 1000; 
        //if (decodedToken.exp > currentTime) {
        //  return true;
        //} else {
        //  return false;
        //}
        return true;
      } catch (error) {
        return true; // change to false
      }
    } else {
      return true; // change to false
    }
  };