import  { jwtDecode } from "jwt-decode";


const TOKEN = "my token";

export const setTokenInLocalStorage = (encryptedToken) => {
    localStorage.setItem(TOKEN, encryptedToken);
};

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getToken = () => localStorage.getItem(TOKEN);

export const getUser = () => {
    try {
        const myToken = getToken();
        return jwtDecode(myToken);
    } catch (error) {
        return null;
    }
};

export const getUserId = () => {
   

    try {
      const token = getToken();
      const decoded = jwtDecode(token);
  
      return {
        userId: parseInt(decoded.UserId), 
        isBusiness: decoded.IsBusiness === "True", 
      };
    } catch (error) {
      console.error("❌ Failed to decode token:", error);
      return null;
    }
  };

// מתודות לשמירת תמונה בלוקאל סטורג' שלי
  export const saveAvatarSelection = (avatarName) => {
    localStorage.setItem("selectedAvatar", avatarName);
  };
  
  export const getSavedAvatar = () => {
    return localStorage.getItem("selectedAvatar") || "avatar1.png";
  };
  
  export const removeSavedAvatar = () => {
    localStorage.removeItem("selectedAvatar");
  };
  